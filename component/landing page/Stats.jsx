import React from "react";
import { motion } from "framer-motion";
import AnimatedCount from "./waitlist page/AnimatedCount";

const Stats = () => {
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
        damping: 20,
        stiffness: 120,
      },
    },
  };

  const stats = [
    { label: "Active Creators", value: "10K+", direction: "left" },
    { label: "Brand Partners", value: "500+", direction: "center" },
    { label: "Deals Facilitated", value: "10K+", direction: "right" },
  ];

  return (
    <section className="w-full bg-white pb-12 py-8 md:pb-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 px-6"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative z-10 grid grid-cols-3 gap-10 max-w-2xl mx-auto"
        >
          {/* STAT 1 */}
          <div className="flex flex-col items-center">
            <AnimatedCount to={10000} duration={1500} suffix="+" />
            <p className="text-zinc-800 mt-2">Active Creators</p>
          </div>

          {/* STAT 2 */}
          <div className="flex flex-col items-center">
            <AnimatedCount to={500} duration={1500} suffix="+" />
            <p className="text-zinc-800 mt-2">Brand Partners</p>
          </div>

          {/* STAT 3 */}
          <div className="flex flex-col items-center">
            <AnimatedCount to={8000} duration={1500} suffix="+" />
            <p className="text-zinc-800 mt-2">Deals Activated</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;
