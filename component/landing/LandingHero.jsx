"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Star } from "lucide-react";
import AnimatedCount from "@/component/landing page/AnimatedCount";

const HERO_IMAGE = "/hero.webp";
const AVATARS = [12, 32, 45, 5];
const EDGE = "38% 0 0 38% / 50% 0 0 50%";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function LandingHero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EC] via-[#FFFDF8] to-white">
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />

      {/* Desktop: full-height photo, bleeding to the right edge */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, x: 30 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 hidden w-[46%] lg:block"
      >
        <div className="relative h-full w-full">
          <div
            className="absolute inset-0 overflow-hidden shadow-2xl"
            style={{ borderRadius: EDGE }}
          >
            <Image
              src={HERO_IMAGE}
              alt="Podcaster wearing headphones laughing at a microphone"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8EC]/40 via-transparent to-transparent" />
          </div>
          {/* Floating community pill (gentle float) */}
          <motion.div
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-3 flex items-center gap-3 rounded-2xl bg-yellow-400 p-4 shadow-xl ring-1 ring-black/10"
          >
            <div className="flex -space-x-2">
              {AVATARS.slice(0, 3).map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={n}
                  src={`https://i.pravatar.cc/80?img=${n + 1}`}
                  alt="Community member avatar"
                  loading="lazy"
                  className="h-8 w-8 rounded-full border-2 border-yellow-400 object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-black">Built for Creators</p>
              <p className="text-xs text-black/70">Driven by Community</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:min-h-screen lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="pt-28 pb-12 lg:py-0"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-3 py-1 text-xs font-semibold text-yellow-700 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400" /> Now in early access
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Where Creators Meet{" "}
              <span className="text-yellow-500">Opportunity.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-5 max-w-md text-lg text-gray-600">
              The professional network for creators to connect, collaborate, and
              grow together.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3.5 font-semibold text-black shadow-sm transition-transform hover:scale-[1.03] hover:bg-yellow-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2"
              >
                I&apos;m a Creator <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login/business"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-800 transition-transform hover:scale-[1.03] hover:border-gray-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                <Briefcase className="h-4 w-4" /> I&apos;m a Business
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((n) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/80?img=${n}`}
                    alt="Creator avatar"
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">Join a growing creator community</p>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-gray-200/80 pt-6"
            >
              <div>
                <AnimatedCount
                  to={10}
                  suffix="K+"
                  duration={2200}
                  className="block text-2xl font-bold text-gray-900"
                />
                <p className="text-sm text-gray-500">Creators</p>
              </div>
              <div>
                <AnimatedCount
                  to={2}
                  suffix="K+"
                  duration={2200}
                  className="block text-2xl font-bold text-gray-900"
                />
                <p className="text-sm text-gray-500">Brands</p>
              </div>
              <div>
                <AnimatedCount
                  to={25}
                  suffix="K+"
                  duration={2200}
                  className="block text-2xl font-bold text-gray-900"
                />
                <p className="text-sm text-gray-500">Collaborations</p>
              </div>
            </motion.div>

            {/* Mobile image */}
            <motion.div variants={item} className="mt-10 lg:hidden">
              <div
                className="relative h-[360px] w-full overflow-hidden shadow-xl"
                style={{ borderRadius: "58% 42% 47% 53% / 52% 48% 52% 48%" }}
              >
                <Image
                  src={HERO_IMAGE}
                  alt="Podcaster wearing headphones laughing at a microphone"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
