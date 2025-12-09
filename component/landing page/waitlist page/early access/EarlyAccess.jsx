import { Briefcase, Clock, Gift, Star, Users, Zap } from "lucide-react";
import React from "react";
import MotionSection from "../MotionSection/MotionSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const EarlyAccess = ({ openForm }) => {
  return (
    <MotionSection
      id="benefits"
      className="py-16 md:py-28 bg-white border-b border-yellow-500/30 relative overflow-hidden"
    >
      {/* soft yellow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/60 via-white to-white pointer-events-none" />

      <div className="relative z-10 px-4 md:px-10 max-w-6xl mx-auto">
        {/* Title */}
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-10 md:mb-14 leading-tight text-black">
          <span className="text-yellow-500">Exclusive Benefits</span> for
          Waitlist Members
        </h3>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Zap,
              title: "Early Access",
              desc: "Be the first to use our advanced creator & brand matchmaking features.",
            },
            {
              icon: Star,
              title: "Priority Verification",
              desc: "Receive a priority verification badge for your profile, boosting credibility.",
            },
            {
              icon: Users,
              title: "Beta Mentorship",
              desc: "Exclusive invites to private beta mentorship sessions with industry leaders.",
            },
            {
              icon: Briefcase,
              title: "Private Community",
              desc: "Gain private access to our early-member community to network before launch.",
            },
            {
              icon: Gift,
              title: "Launch Rewards",
              desc: "Unlock special launch rewards and surprise collaboration opportunities.",
            },
            {
              icon: Clock,
              title: "Discovery Boost",
              desc: "Get feature priority in the initial discovery algorithm for maximum visibility.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 md:p-7 rounded-xl md:rounded-2xl bg-amber-100 hover:bg-amber-200 hover:shadow-xl border border-yellow-300/40 transition-all cursor-default"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              <item.icon className="w-8 h-8 md:w-9 md:h-9 text-yellow-500 mb-4" />{" "}
              {/* Icon size scales */}
              <h4 className="text-lg md:text-xl font-bold text-black mb-2">
                {item.title}
              </h4>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>{" "}
              {/* Text size scales */}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-14">
          <Button
            onClick={openForm}
            className="w-full sm:w-auto bg-white hover:bg-yellow-500 border border-yellow-400 text-yellow-500 hover:text-white font-extrabold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            Join the Waitlist & Unlock Benefits
          </Button>
        </div>
      </div>
    </MotionSection>
  );
};

export default EarlyAccess;
