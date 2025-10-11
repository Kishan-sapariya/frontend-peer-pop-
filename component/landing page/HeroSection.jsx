"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Building2, Telescope } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Constants ---
const BG_COLOR = "#041049";
const ACCENT_COLOR = "#F0AF1B";

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay },
  }),
  hover: { scale: 1.05, transition: { duration: 0.05 } },
  tap: { scale: 0.97 },
};
const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex items-center justify-center h-[92vh] px-4">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <img
          src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760167314/2_p2juhp.png"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 " />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          custom={0.2}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0,0,0)",
          }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Where Creators
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ">
            Connect & Collaborate
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          custom={0.4}
          style={{ willChange: "transform, opacity" }}
          className="text-lg md:text-xl font-bold text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Join the premier network for creative professionals.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 mb-12"
          variants={fadeInUp}
          custom={0.6}
        >
          <motion.a
            href="/signup"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border-2 transition-all duration-300 shadow-lg"
            style={{
              backgroundColor: ACCENT_COLOR,
              borderColor: ACCENT_COLOR,
              color: BG_COLOR,
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Creating Together
            <motion.div
              animate={!prefersReducedMotion ? { x: [0, 3, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="ml-2"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>

          <motion.a
            href="/login/business"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border-2 transition-all duration-300 shadow-lg"
            style={{
              backgroundColor: ACCENT_COLOR,
              borderColor: ACCENT_COLOR,
              color: BG_COLOR,
            }}
          >
            <Building2 className="w-4 h-4 mr-2" />
            I'm a Business
          </motion.a>

          <motion.a
            href="/feed"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border-2 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <Telescope className="w-4 h-4 mr-2" />
            Explore Community
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          custom={0.8}
          className="flex flex-wrap justify-center items-center gap-6 text-black font-bold text-sm mt-8"
        >
          {[
            { color: "bg-green-400", text: "Free to join" },
            { color: "bg-blue-400", text: "Verified creators" },
            { color: "bg-purple-400", text: "Global community" },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-2 h-2 ${item.color} rounded-full mr-2`} />
              <Badge className="bg-white text-black">{item.text}</Badge>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
