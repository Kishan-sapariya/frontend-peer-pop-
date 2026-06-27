"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Home,
  ArrowLeft,
  Users,
  Briefcase,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Global 404 — shown for any route that doesn't exist.

// Quick destinations so a lost user always has somewhere to go next.
const QUICK_LINKS = [
  { href: "/feed", label: "Feed", icon: Compass },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/search", label: "Search", icon: Search },
];

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

export default function NotFound() {
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
          {/* Contained glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow-300/40 blur-3xl" />
          {/* Decorative rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-52 w-52 rounded-full border border-yellow-300/50" />
            <div className="absolute h-72 w-72 rounded-full border border-yellow-300/30" />
          </div>

          <motion.div variants={item} className="relative text-center">
            <p className="text-6xl font-bold leading-none tracking-tight text-gray-900 sm:text-7xl">
              4<span className="text-yellow-500">0</span>4
            </p>
            <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-yellow-200/60 ring-1 ring-yellow-200">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Compass className="h-8 w-8 text-yellow-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right — content panel */}
        <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:text-left">
          <motion.h1
            variants={item}
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Looks like you wandered off
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-[15px] leading-relaxed text-gray-600"
          >
            The page you&apos;re looking for doesn&apos;t exist, may have moved,
            or the link is broken. Let&apos;s get you back on track.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <Link href="/home">
              <Button
                variant="outline"
                className="w-full rounded-full border-gray-300 bg-white sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
            </Link>
            <Link href="/feed">
              <Button className="w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feed
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 border-t border-gray-100 pt-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Or jump to
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-yellow-300 hover:bg-yellow-50 hover:text-gray-900"
                >
                  <Icon className="h-3.5 w-3.5 text-gray-400 transition-colors group-hover:text-yellow-600" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
