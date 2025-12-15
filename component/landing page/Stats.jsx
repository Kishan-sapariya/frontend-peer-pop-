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
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex flex-col items-center text-center space-y-2"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-yellow-500"
            >
              <AnimatedCount to={stat.value} duration={1500} />
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-base md:text-lg font-medium"
            >
              {stat.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
