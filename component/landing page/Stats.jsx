import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  // Animation variants
  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "center" ? 50 : 0,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "Active Creators", value: "10K+", direction: "left" },
    { label: "Brand Partners", value: "500+", direction: "center" },
    { label: "Deals Facilitated", value: "10K+", direction: "right" },
  ];

  return (
    <section className="w-full bg-black border-t border-gray-800 border-b py-12 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            custom={stat.direction}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center text-center space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500">
              {stat.value}
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
