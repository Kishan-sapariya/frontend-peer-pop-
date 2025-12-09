import React from "react";
import MotionSection from "../MotionSection/MotionSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Cta = ({ openForm }) => {
  return (
    <MotionSection className="relative py-24 md:py-32 text-center bg-white overflow-hidden">
      {/* Soft yellow glow background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 w-[90vw] h-[90vw] max-w-[900px] 
                        -translate-x-1/2 -translate-y-1/2 rounded-full 
                        bg-yellow-400/20 blur-[120px] opacity-30"
        ></div>
      </div>

      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        {/* Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-6 leading-tight"
        >
          <span className="text-yellow-500">Limited Spots</span> for Early
          Access — Don’t Miss Out!
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto mb-10"
        >
          Be one of the first 1,000 verified creators and brands shaping the
          future of meaningful collaborations.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Button
            onClick={openForm}
            className="bg-white hover:bg-yellow-500 border border-yellow-400 text-yellow-500 hover:text-white font-extrabold text-lg px-10 py-6 rounded-md cursor-pointer"
          >
            Join the Waitlist →
          </Button>
        </motion.div>

        {/* Small footer text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 text-zinc-500 text-sm"
        >
          🔥 7,842 members already on the list
        </motion.p>
      </div>
    </MotionSection>
  );
};

export default Cta;
