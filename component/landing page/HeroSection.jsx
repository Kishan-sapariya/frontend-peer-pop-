"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Building2,
  Telescope,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const RightPanelUI = () => (
  <motion.div
    className="relative w-full lg:w-[550px] h-[550px] md:h-[600px] flex items-center justify-center p-4 lg:p-0"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
  >
    <div className="absolute" />

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[250px] h-[350px] md:w-[450px] md:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-white/20">
      <img
        src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760372007/recent-content/images/hbmankpw5uwsnlippy8h.jpg"
        alt="Creator profile visual"
        className="w-full h-full object-cover"
      />
      {/* Footer/Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-md flex items-center justify-around text-white text-sm">
        <span>❤️ 4.2K</span>
        <span>💬 120</span>
        <span>🔗 Profile</span>
      </div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-[92vh] px-4 py-16 md:py-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto w-full gap-12 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={hasMounted ? "visible" : "hidden"}
      >
        {/* Left Content Area - Text and Buttons */}
        <div className="lg:w-1/2 text-center lg:text-left px-4 pt-10 lg:pt-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Where Creators
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Connect & Collaborate
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-medium text-white/90 mb-10 max-w-2xl lg:max-w-none mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Join the premier network for creative professionals.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap lg:justify-start justify-center gap-4 mb-12"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black transition-all duration-200 min-w-[200px] hover:shadow-lg hover:shadow-[#F9D423]/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Together
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/login/business"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-[#F0AF1B] bg-transparent text-[#F0AF1B] transition-all duration-200 min-w-[200px] hover:bg-[#F0AF1B] hover:text-black"
              >
                <Building2 className="w-5 h-5 mr-2" />
                I'm a Business
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/feed"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 min-w-[200px]"
              >
                <Telescope className="w-5 h-5 mr-2" />
                Explore Community
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap lg:justify-start justify-center items-center gap-4 text-black font-semibold text-sm mt-8"
            variants={containerVariants}
          >
            {[
              { color: "bg-green-400", text: "Free to join" },
              { color: "bg-blue-400", text: "Verified creators" },
              { color: "bg-purple-400", text: "Global community" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center"
                variants={itemVariants}
              >
                <div className={`w-2 h-2 ${item.color} rounded-full mr-2`} />
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black border border-white/40 shadow-sm">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Image/UI Panel */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end px-4 mt-12 lg:mt-0">
          <RightPanelUI />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
