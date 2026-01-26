"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cloud, Gem, Star, ArrowRight } from "lucide-react";

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
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Main Headings */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-2">
          Ready to Connect?
        </h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-16">
          Join Peerpop Today
        </h3>

        {/* Benefits Header */}
        <p className="text-2xl font-bold text-yellow-500 mb-12">
          Exclusive Early Access Benefits
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-center max-w-5xl mx-auto mb-16">
          <Benefit
            icon={
              <div className="relative">
                <Cloud className="w-12 h-12 text-yellow-500" />
                <div className="absolute -bottom-1 -right-1 bg-white p-0.5">
                  <div className="w-4 h-4 border-2 border-yellow-500 rounded-sm" />
                </div>
              </div>
            }
            title="Platform Access"
            showBorder={true}
          />
          <Benefit
            icon={<Gem className="w-12 h-12 text-yellow-500" />}
            title="Premium Features"
            showBorder={true}
          />
          <Benefit
            icon={
              <div className="relative">
                <Star className="w-12 h-12 text-yellow-500" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-6 h-3 border-t-2 border-yellow-500 rounded-full" />
                </div>
              </div>
            }
            title="Shape New Features"
            showBorder={false}
          />
        </div>

        {/* Action Button */}
        <motion.div variants={fadeUp}>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-[#EAB308] hover:bg-yellow-600 text-black font-bold px-10 py-7 text-lg rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Start Creating Now <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

const Benefit = ({ icon, title, showBorder }) => (
  <div
    className={`flex flex-col items-center px-8 py-4 ${
      showBorder ? "md:border-r-2 border-yellow-200" : ""
    }`}
  >
    <div className="mb-4 h-16 flex items-center justify-center">{icon}</div>
    <span className="text-xl font-bold text-black">{title}</span>
  </div>
);
