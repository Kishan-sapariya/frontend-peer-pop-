"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

// Import Lucide icons
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
} from "lucide-react";

const companies = [
  { name: "Spotify", icon: Music },
  { name: "Adobe", icon: Brush },
  { name: "YouTube", icon: Youtube },
  { name: "Instagram", icon: Instagram },
  { name: "TikTok", icon: Video },
  { name: "Canva", icon: Palette },
  { name: "Netflix", icon: Clapperboard },
  { name: "Peerpop", icon: Sparkles }, // optional — your own platform
];

const CompanyLogo = ({ name, Icon }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center w-32 sm:w-40 h-20 sm:h-24 rounded-2xl border border-white/10",
      "bg-white/5 hover:bg-white/10 transition-all duration-300 text-white"
    )}
  >
    <Icon className="w-10 h-10 sm:w-12 sm:h-12 opacity-80 hover:opacity-100 transition-opacity" />
    <span className="text-xs sm:text-sm mt-2 opacity-70">{name}</span>
  </div>
);

export default function CompanyMarquee() {
  return (
    <section className="w-full py-16 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
          Trusted by Top Creators & Brands
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          We partner with leading companies empowering creators worldwide.
        </p>
      </div>

      {/* Marquee Row */}
      <Marquee pauseOnHover className="[--duration:25s]">
        {companies.concat(companies).map((company, index) => {
          const Icon = company.icon;
          return <CompanyLogo key={index} name={company.name} Icon={Icon} />;
        })}
      </Marquee>

      {/* Subtle gradient fade left & right */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black"></div>
    </section>
  );
}
