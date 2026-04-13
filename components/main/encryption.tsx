"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";

const resumeHighlights = [
  "Freelance Full Stack Developer with 5 years of hands-on project experience.",
  "Focused on AI-powered products, Python, Django, Next.js, and Flutter development.",
  "Based in Mumbai, India and available for remote freelance collaborations.",
  "Completed Master of Computer Applications (MCA).",
  "Completed the AI Full Stack Developer course from upGrad.",
];

export const Resume = () => {
  return (
    <section
      id="resume"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(112,66,248,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_30%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-start">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_0_40px_rgba(112,66,248,0.18)] backdrop-blur-sm">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
            <Image
              src="/projects/profile_pic.jpeg"
              alt="Shubham Goyal"
              width={520}
              height={520}
              className="h-auto w-full rounded-[24px] object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-2xl"
        >
          <div className="Welcome-box mb-6 inline-flex items-center gap-2 border border-[#7042F88B] px-[15px] py-[6px] opacity-[0.9]">
            <h1 className="Welcome-text text-[12px]">Resume</h1>
          </div>

          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Building full stack and AI-driven products with real-world focus.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            I&apos;m Shubham Goyal, a freelance Full Stack Developer living in
            Mumbai, India. I work across modern web and app stacks with a strong
            focus on scalable products, clean user experiences, and practical AI
            integration for businesses and startups.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {resumeHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-gray-200 backdrop-blur-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-[#0b0a20]/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Experience
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">5 Years</p>
            </div>
            <div className="rounded-2xl border border-fuchsia-400/20 bg-[#0b0a20]/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">
                Location
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">Mumbai</p>
            </div>
            <div className="rounded-2xl border border-violet-400/20 bg-[#0b0a20]/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                Education
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">MCA</p>
            </div>
          </div>

          <p className="mt-8 text-base leading-7 text-gray-400">
            Core technologies include Python, Django, Next.js, Flutter,
            JavaScript, TypeScript, AI integrations, REST APIs, and modern full
            stack application development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
