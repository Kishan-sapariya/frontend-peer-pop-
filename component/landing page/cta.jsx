// CTASection.jsx (Simplified to only show Parallax Background Stars)
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BackgroundStar = React.memo(
  ({ initialX, initialY, size, duration, delay }) => {
    return (
      <motion.div
        className="absolute bg-white rounded-full pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${initialX}%`,
          top: `${initialY}%`,
          opacity: size * 0.2 + 0.1,
        }}
        animate={{
          x: [0, 5],
          y: [0, 5],
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    );
  }
);
BackgroundStar.displayName = "BackgroundStar";

const TOTAL_BG_STARS = 500;

export default function CTASection() {
  const [bgStars] = useState(() => {
    return Array.from({ length: TOTAL_BG_STARS }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 20,
    }));
  });

  return (
    <section className="relative py-20 px-4 bg-black text-white overflow-hidden flex items-center justify-center min-h-[700px]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgStars.map((star) => (
          <BackgroundStar
            key={star.id}
            initialX={star.initialX}
            initialY={star.initialY}
            size={star.size}
            duration={star.duration}
            delay={star.delay}
          />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-400">
            Ready to Connect?
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Beta Today
          </h2>

          <div className="bg-white/5 rounded-3xl p-8 mb-10 border border-yellow-500/30 shadow-2xl backdrop-blur-sm">
            <div className="w-24 h-24 bg-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-105">
              <span className="text-gray-900 text-4xl font-black">β</span>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">
              Exclusive Early Access Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base text-white">
              <div className="flex flex-col items-center justify-center p-3 border-b-2 border-yellow-500/50 md:border-b-0 md:border-r-2">
                <span className="text-yellow-500 text-2xl mb-1">✅</span>
                <span className="font-semibold">Beta Platform Access</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-b-2 border-yellow-500/50 md:border-b-0 md:border-r-2">
                <span className="text-yellow-500 text-2xl mb-1">💎</span>
                <span className="font-semibold">Lifetime Premium Features</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-yellow-500 text-2xl mb-1">🛠️</span>
                <span className="font-semibold">Shape New Features</span>
              </div>
            </div>
          </div>

          <Link href="/signup" passHref>
            <Button
              size="lg"
              className="bg-yellow-500 hover:scale-105 hover:bg-yellow-600 text-black inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border border-yellow-400 cursor-pointer transition-all duration-300 shadow-sm"
            >
              Start Creating Now <span className="ml-2 text-2xl">🚀</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
