"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* ------------------------------
  Soft Background Rings
--------------------------------*/
const Rings = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[600, 900, 1300].map((size, i) => (
      <div
        key={i}
        className="absolute border border-yellow-400/40 rounded-full opacity-40"
        style={{
          width: size,
          height: size,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderStyle: "dashed",
        }}
      />
    ))}
  </div>
);

/* ------------------------------
  Animation
--------------------------------*/
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 bg-[#F6E8A5] overflow-hidden">
      <Rings />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Ready to Connect?
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-10">
          Join the Beta Today
        </h3>

        {/* CTA Card */}
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-3xl p-10 shadow-xl border border-yellow-300/50 mx-auto max-w-3xl"
        >
          {/* Beta Icon */}
          <div className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow">
            <span className="text-gray-900 text-4xl font-black">β</span>
          </div>

          <h4 className="text-2xl font-semibold mb-6 text-yellow-700">
            Exclusive Early Access Benefits
          </h4>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
            <Benefit icon="🔥" title="Beta Platform Access" />
            <Benefit icon="💎" title="Lifetime Premium Features" />
            <Benefit icon="🛠️" title="Shape New Features" />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeUp} className="mt-12">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-xl shadow-md hover:scale-105 transition-all"
            >
              Start Creating Now <span className="ml-2 text-2xl">🚀</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

const Benefit = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center space-y-2">
    <span className="text-yellow-600 text-3xl">{icon}</span>
    <span className="font-semibold">{title}</span>
  </div>
);
