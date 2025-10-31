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
  Camera,
  Palette,
  Clapperboard,
  Sparkles,
  Award,
  Users,
  Film,
  Globe,
} from "lucide-react";

const allCompanies = [
  { name: "YouTube", icon: Youtube, color: "text-red-500" },
  { name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { name: "Spotify", icon: Music, color: "text-green-500" },
  { name: "Adobe", icon: Brush, color: "text-red-400" },
  { name: "TikTok", icon: Video, color: "text-white" },
  { name: "Canva", icon: Palette, color: "text-blue-400" },
  { name: "Netflix", icon: Clapperboard, color: "text-red-600" },
  { name: "Peerpop", icon: Sparkles, color: "text-yellow-400" },
  { name: "Twitch", icon: Film, color: "text-purple-500" },
  { name: "Vimeo", icon: Video, color: "text-blue-500" },
  { name: "Producers", icon: Users, color: "text-orange-400" },
  { name: "Global Brands", icon: Globe, color: "text-cyan-400" },
];

const row1 = allCompanies.slice(0, 5).concat(allCompanies.slice(0, 3));
const row2 = allCompanies
  .slice(4, 9)
  .concat(allCompanies.slice(9, 12))
  .concat(allCompanies.slice(0, 1));
const row3 = allCompanies.slice(8, 12).concat(allCompanies.slice(0, 4));

const CompanyLogo = ({ name, Icon, color }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center w-36 sm:w-48 h-24 sm:h-28 rounded-2xl border border-white/10 p-4 mx-4", // Added mx-4 for spacing between logos
      "bg-white/5 hover:bg-white/10 transition-all duration-300",
      "shadow-md shadow-gray-900/50"
    )}
  >
    <Icon
      className={cn(
        "w-10 h-10 sm:w-12 sm:h-12 opacity-80 transition-all group-hover:opacity-100",
        color
      )}
    />
    <span className="text-sm sm:text-base mt-2 font-medium text-white opacity-90">
      {name}
    </span>
  </div>
);

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
};

export default function CompanyMarquee() {
  return (
    <section className="w-full py-20 bg-black overflow-hidden relative">
      {/* Centered Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10"
      >
        <motion.h2
          variants={fadeUp}
          className="text-white font-extrabold text-4xl md:text-5xl mb-3"
        >
          Trusted by Top Creators{" "}
          <span className="text-yellow-500">& Brands</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg md:text-xl mx-auto"
        >
          We partner with leading companies empowering creators worldwide.
        </motion.p>
      </motion.div>

      {/* Marquee Rows Container */}
      <div className="space-y-6">
        <Marquee pauseOnHover className="[--duration:40s]">
          {row1.map((company, index) => {
            const Icon = company.icon;
            return (
              <CompanyLogo
                key={index}
                name={company.name}
                Icon={Icon}
                color={company.color}
              />
            );
          })}
        </Marquee>

        <Marquee pauseOnHover reverse className="[--duration:40s] [--gap:1rem]">
          {row2.map((company, index) => {
            const Icon = company.icon;
            return (
              <CompanyLogo
                key={index}
                name={company.name}
                Icon={Icon}
                color={company.color}
              />
            );
          })}
        </Marquee>

        <Marquee pauseOnHover className="[--duration:40s]">
          {row3.map((company, index) => {
            const Icon = company.icon;
            return (
              <CompanyLogo
                key={index}
                name={company.name}
                Icon={Icon}
                color={company.color}
              />
            );
          })}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black via-black/0"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black via-black/0"></div>
    </section>
  );
}
