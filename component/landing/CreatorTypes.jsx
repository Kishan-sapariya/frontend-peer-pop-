"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const MotionLink = motion(Link);

// First 3 are live; last 3 are coming soon.
const TYPES = [
  { label: "YouTuber", href: "/signup", img: "/creator-images/youtuber.webp" },
  { label: "Comedian", href: "/signup", img: "/creator-images/comedian.webp" },
  { label: "Influencer", href: "/signup", img: "/creator-images/influencer.webp" },
  { label: "Musician", img: "/creator-images/musician.webp", comingSoon: true },
  { label: "Dancer", img: "/creator-images/dancer.webp", comingSoon: true },
  { label: "Filmmaker", img: "/creator-images/filmmaker.webp", comingSoon: true },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function CardInner({ t }) {
  return (
    <>
      <Image
        src={t.img}
        alt={`${t.label} creator`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className={`object-cover transition-transform duration-500 ${
          t.comingSoon ? "opacity-60 grayscale-[35%]" : "group-hover:scale-105"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      {t.comingSoon && (
        <span className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black shadow">
          Coming Soon
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
          {t.label}
        </div>
      </div>
    </>
  );
}

export default function CreatorTypes() {
  const reduce = useReducedMotion();
  // Fade-only stagger (no vertical movement) so cards never appear mis-aligned.
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };
  const base =
    "group relative aspect-[2/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10";

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Whatever You Create,{" "}
            <span className="text-yellow-500">You Belong Here.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Connect with your community and discover endless opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {TYPES.map((t) =>
            t.comingSoon ? (
              <motion.div key={t.label} variants={item} className={`${base} cursor-default`}>
                <CardInner t={t} />
              </motion.div>
            ) : (
              <MotionLink
                key={t.label}
                href={t.href}
                variants={item}
                whileHover={reduce ? undefined : { y: -6 }}
                className={base}
              >
                <CardInner t={t} />
              </MotionLink>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
