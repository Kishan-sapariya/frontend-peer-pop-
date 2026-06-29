"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Clock, Search, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

// Shown when a user exists but hasn't completed their profile/onboarding
// (no creator/business/founder profile). When the viewer IS that user
// (isOwner), it becomes a "create your profile" prompt instead of a dead end.

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

export default function ProfileNotSetUp({ username, isOwner = false }) {
  const router = useRouter();
  const name = username ? decodeURIComponent(username) : "This user";
  const initial = name.charAt(0).toUpperCase() || "?";

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

          <motion.div variants={item} className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white text-5xl font-bold text-yellow-600 shadow-lg shadow-yellow-200/60 ring-1 ring-yellow-200">
              {initial}
            </div>
            <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-900">
              {isOwner ? (
                <Rocket className="h-4 w-4 text-yellow-400" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-400" />
              )}
            </span>
          </motion.div>
        </div>

        {/* Right — content panel */}
        <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:text-left">
          <motion.span
            variants={item}
            className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-700 md:mx-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isOwner ? "Finish setup" : "Profile pending"}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {isOwner
              ? "Set up your profile"
              : "Profile not set up yet"}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-[15px] leading-relaxed text-gray-600"
          >
            {isOwner ? (
              "You haven't created your profile yet. Set it up so other creators can discover, connect, and collaborate with you."
            ) : (
              <>
                <span className="font-semibold text-gray-900">{name}</span>{" "}
                hasn&apos;t finished creating their profile. Check back once
                they&apos;ve set things up.
              </>
            )}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            {isOwner ? (
              <>
                <Link href="/onboarding">
                  <Button className="w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
                    <Rocket className="mr-2 h-4 w-4" /> Create your profile
                  </Button>
                </Link>
                <Button
                  onClick={() => router.push("/feed")}
                  variant="outline"
                  className="rounded-full border-gray-300 bg-white"
                >
                  Maybe later
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="rounded-full border-gray-300 bg-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
                <Link href="/feed">
                  <Button className="w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
                    <Compass className="mr-2 h-4 w-4" /> Back to Feed
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {!isOwner && (
            <motion.div
              variants={item}
              className="mt-7 border-t border-gray-100 pt-5"
            >
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-yellow-600"
              >
                <Search className="h-4 w-4" />
                Discover other creators instead
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
