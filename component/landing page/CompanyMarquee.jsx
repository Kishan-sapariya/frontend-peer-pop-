"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import {
  Youtube,
  Instagram,
  Music,
  Brush,
  Video,
  Palette,
  Clapperboard,
  Sparkles,
  Users,
  Film,
  Globe,
} from "lucide-react";

const allCompanies = [
  { name: "YouTube", icon: Youtube, color: "text-red-500" },
  { name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { name: "Spotify", icon: Music, color: "text-green-500" },
  { name: "Adobe", icon: Brush, color: "text-red-400" },
  { name: "TikTok", icon: Video, color: "text-black" },
  { name: "Canva", icon: Palette, color: "text-blue-400" },
  { name: "Netflix", icon: Clapperboard, color: "text-red-600" },
  { name: "Peerpop", icon: Sparkles, color: "text-yellow-500" },
  { name: "Twitch", icon: Film, color: "text-purple-500" },
  { name: "Vimeo", icon: Video, color: "text-blue-500" },
  { name: "Producers", icon: Users, color: "text-orange-500" },
  { name: "Global Brands", icon: Globe, color: "text-cyan-500" },
];

// Split marquee rows for variation
const row1 = allCompanies.slice(0, 5).concat(allCompanies.slice(0, 3));
const row2 = allCompanies.slice(4, 9).concat(allCompanies.slice(9, 12));
const row3 = allCompanies.slice(8, 12).concat(allCompanies.slice(0, 4));

const CompanyLogo = ({ name, Icon, color }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center w-36 sm:w-44 h-24 sm:h-28 rounded-2xl",
      "bg-white border border-yellow-300 shadow-md",
      "hover:shadow-lg hover:border-yellow-400 transition-all duration-300 mx-4"
    )}
  >
    <Icon className={cn("w-10 h-10 sm:w-12 sm:h-12", color)} />
    <span className="text-sm font-semibold text-gray-800 mt-2">{name}</span>
  </div>
);

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

export default function CompanyMarquee() {
  return (
    <section className="w-full py-20 sm:py-24 bg-white overflow-hidden relative">
      {/* Section Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center mb-12"
      >
        <motion.h2
          variants={fadeUp}
          className="text-gray-900 font-bold tracking-tight text-3xl sm:text-4xl mb-3"
        >
          Trusted by Top Creators{" "}
          <span className="text-yellow-500">& Brands</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          We partner with leading platforms and global brands empowering
          creators worldwide.
        </motion.p>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-6">
        <Marquee pauseOnHover className="[--duration:40s]">
          {row1.map((c, i) => (
            <CompanyLogo key={i} name={c.name} Icon={c.icon} color={c.color} />
          ))}
        </Marquee>

        <Marquee pauseOnHover reverse className="[--duration:40s] [--gap:2rem]">
          {row2.map((c, i) => (
            <CompanyLogo key={i} name={c.name} Icon={c.icon} color={c.color} />
          ))}
        </Marquee>

        <Marquee pauseOnHover className="[--duration:40s]">
          {row3.map((c, i) => (
            <CompanyLogo key={i} name={c.name} Icon={c.icon} color={c.color} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
