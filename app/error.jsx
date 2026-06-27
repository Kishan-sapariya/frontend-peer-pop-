"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// Route-level error boundary — catches render/runtime errors in the app
// and renders inside the root layout (navbar etc. stay intact).
// Mirrors the 404 / "profile not set up" card system.

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Error({ error, reset }) {
  useEffect(() => {
    // Surface the error to the console / any monitoring in place.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12 sm:py-16">
      {/* Subtle dotted grid so the surrounding space reads as intentional */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_55%,transparent_100%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60 md:grid-cols-2"
      >
        {/* Left — visual panel */}
        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 p-10 md:p-12">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow-300/40 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-52 w-52 rounded-full border border-yellow-300/50" />
            <div className="absolute h-72 w-72 rounded-full border border-yellow-300/30" />
          </div>

          <motion.div
            variants={item}
            className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg shadow-yellow-200/60 ring-1 ring-yellow-200"
          >
            <AlertTriangle className="h-9 w-9 text-yellow-600" />
          </motion.div>
        </div>

        {/* Right — content panel */}
        <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:text-left">
          <motion.span
            variants={item}
            className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 md:mx-0"
          >
            Something broke
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Well, this is awkward
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-[15px] leading-relaxed text-gray-600"
          >
            Something went wrong on our end. You can try again, or head back home
            while we sort it out.
          </motion.p>

          {error?.digest ? (
            <motion.p
              variants={item}
              className="mt-2 font-mono text-xs text-gray-400"
            >
              Reference: {error.digest}
            </motion.p>
          ) : null}

          <motion.div
            variants={item}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <Button
              onClick={() => reset()}
              className="w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Try again
            </Button>
            <Link href="/home">
              <Button
                variant="outline"
                className="w-full rounded-full border-gray-300 bg-white sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" /> Go Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
