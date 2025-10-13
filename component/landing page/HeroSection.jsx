"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Building2, Telescope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const HeroSection = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set state after mount to reduce initial render blocking
    setHasMounted(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-[92vh] px-4 py-16 md:py-0 overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        {/* For better performance, consider using Next.js <Image> component */}
        <img
          src="https://res.cloudinary.com/dvzqfb2z3/image/upload/w_1920,f_auto,q_auto/v1760167314/2_p2juhp.png"
          alt="Abstract geometric background (Large)"
          className="hidden sm:block w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        <img
          src="https://res.cloudinary.com/dvzqfb2z3/image/upload/w_720,f_auto,q_auto/v1760166030/1_onw1fq.png"
          alt="Abstract geometric background (Small)"
          className="sm:hidden w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto p-4"
        variants={containerVariants}
        initial="hidden"
        // Use hasMounted to only animate once the component is ready
        animate={hasMounted ? "visible" : "hidden"}
        // Alternative: Use 'whileInView' to delay animation until it enters the viewport
        // whileInView="visible"
        // viewport={{ once: true, amount: 0.8 }}
      >
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
          className="text-lg md:text-xl font-medium text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Join the premier network for creative professionals.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-[#F0AF1B] bg-[#F0AF1B] text-black transition-all duration-200 min-w-[200px] hover:opacity-90"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Together
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/login/business"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-[#F0AF1B] bg-[#F0AF1B] text-black transition-all duration-200 min-w-[200px] hover:opacity-90"
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
          className="flex flex-wrap justify-center items-center gap-4 text-black font-semibold text-sm mt-8"
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
              <Badge className="bg-white text-black border border-white/40 shadow-sm">
                {item.text}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
