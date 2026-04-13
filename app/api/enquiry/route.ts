import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_TO_EMAIL",
] as const;

export async function POST(request: Request) {
  const payload = (await request.json()) as EnquiryPayload;
  const missingFields = ["name", "email", "subject", "message"].filter(
    (field) => !payload[field as keyof EnquiryPayload]?.trim(),
  );

  if (missingFields.length > 0) {
    return NextResponse.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  const missingEnv = requiredEnv.filter((key) => !process.env[key]?.trim());

  if (missingEnv.length > 0) {
    return NextResponse.json(
      { message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const safeName = escapeHtml(payload.name!.trim());
  const safeEmail = escapeHtml(payload.email!.trim());
  const safePhone = escapeHtml(payload.phone?.trim() || "Not provided");
  const safeSubject = escapeHtml(payload.subject!.trim());
  const safeMessage = escapeHtml(payload.message!.trim()).replace(/\n/g, "<br />");

  const enquiryHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>New portfolio enquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio Enquiry" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: payload.email!.trim(),
      subject: `New enquiry: ${payload.subject!.trim()}`,
      html: enquiryHtml,
      text: [
        "New portfolio enquiry",
        `Name: ${payload.name!.trim()}`,
        `Email: ${payload.email!.trim()}`,
        `Phone: ${payload.phone?.trim() || "Not provided"}`,
        `Subject: ${payload.subject!.trim()}`,
        "",
        "Message:",
        payload.message!.trim(),
      ].join("\n"),
    });

    return NextResponse.json({ message: "Enquiry sent successfully." });
  } catch (error) {
    console.error("Failed to send enquiry email", error);

    return NextResponse.json(
      { message: "Unable to send enquiry right now. Please try again later." },
      { status: 500 },
    );
  }
}
