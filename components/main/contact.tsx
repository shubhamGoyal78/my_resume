"use client";

import { FormEvent, useState } from "react";

import { CONTACT_DETAILS } from "@/constants";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your enquiry right now.");
      }

      setStatus({
        type: "success",
        message: "Your enquiry has been sent successfully.",
      });
      setForm(initialState);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your enquiry.";

      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="relative flex w-full items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_right,rgba(168,85,247,0.18),transparent_30%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-white/10 bg-[#070b1a]/80 p-8 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-sm">
          <div className="Welcome-box inline-flex items-center gap-2 border border-cyan-400/30 px-[15px] py-[6px] opacity-[0.9]">
            <h2 className="Welcome-text text-[12px]">Enquiry</h2>
          </div>

          <h3 className="mt-6 text-4xl font-semibold text-white">
            Let&apos;s build something meaningful together.
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            {CONTACT_DETAILS.availability}
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={CONTACT_DETAILS.phoneLink}
              className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-white/5 px-5 py-4 text-gray-100 transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Call
              </span>
              <span className="text-lg font-medium">{CONTACT_DETAILS.phoneLabel}</span>
            </a>

            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="flex items-center justify-between rounded-2xl border border-fuchsia-400/20 bg-white/5 px-5 py-4 text-gray-100 transition hover:border-fuchsia-300/50 hover:bg-white/10"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">
                Email
              </span>
              <span className="text-lg font-medium">{CONTACT_DETAILS.email}</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_45px_rgba(112,66,248,0.18)] backdrop-blur-sm"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Name
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b0a20]/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="Your full name"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b0a20]/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Phone
              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b0a20]/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="+91 98765 43210"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Subject
              <input
                type="text"
                required
                value={form.subject}
                onChange={(event) =>
                  setForm((current) => ({ ...current, subject: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b0a20]/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="Website, app, AI, automation..."
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-2 text-sm text-gray-300">
            Project details
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              className="rounded-2xl border border-white/10 bg-[#0b0a20]/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
              placeholder="Share your requirements, timeline, budget, and goals."
            />
          </label>

          {status.message ? (
            <p
              className={`mt-5 text-sm ${
                status.type === "success" ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="button-primary mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
};
