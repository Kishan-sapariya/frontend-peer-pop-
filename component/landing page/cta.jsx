"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Check } from "lucide-react";

const TRUST = ["Free to join", "No credit card", "Early access"];

export default function CTASection() {
  const reduce = useReducedMotion();
  const float = (delay) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
        };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Decorative accents */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-yellow-500/20" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2"
      >
        {/* Left — copy + actions */}
        <div>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Be Part of Something{" "}
            <span className="text-yellow-400">Extraordinary.</span>
          </h2>
          <p className="mt-4 max-w-md text-gray-400">
            Join thousands of creators and brands building the future of
            collaboration. Get access to exclusive opportunities and early
            features.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03] hover:bg-yellow-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login/business"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <Briefcase className="h-4 w-4" /> I&apos;m a Business
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-yellow-400" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — tilted profile-card cluster (gentle float) */}
        <div className="relative hidden h-72 lg:block">
          <motion.div
            {...float(0)}
            className="absolute left-2 top-10 h-44 w-32 -rotate-6 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/10"
          >
            <Image src="/creator-images/youtuber.webp" alt="YouTuber creator" fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            {...float(1.2)}
            className="absolute right-4 top-8 h-44 w-32 rotate-6 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/10"
          >
            <Image src="/creator-images/influencer.webp" alt="Influencer creator" fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            {...float(0.6)}
            className="absolute left-1/2 top-2 z-10 h-52 w-36 -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/15"
          >
            <Image src="/creator-images/comedian.webp" alt="Comedian creator" fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 ring-1 ring-white/10">
              <Image src="/logo.png" alt="PeerPop" width={20} height={20} className="h-5 w-5 object-contain" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
