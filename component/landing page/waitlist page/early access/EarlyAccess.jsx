import { Briefcase, Clock, Gift, Star, Users, Zap } from "lucide-react";
import React from "react";
import MotionSection from "../MotionSection/MotionSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const EarlyAccess = ({openForm}) => {
  return (
    <MotionSection
      id="benefits"
      className="py-16 md:py-24 border-b border-yellow-500/20"
    >
      <div className="px-4 md:px-10 max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
          <span className="text-yellow-500">Exclusive Benefits</span> for
          Waitlist Members
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="p-6 bg-zinc-900 rounded-lg shadow-xl hover:bg-zinc-800 transition-colors border border-zinc-700"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
              }}
            >
              <item.icon className="w-8 h-8 text-yellow-500 mb-3" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={openForm}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-10 py-6"
          >
            Join the Waitlist & Unlock Benefits
          </Button>
        </div>
      </div>
    </MotionSection>
  );
};

export default EarlyAccess;
