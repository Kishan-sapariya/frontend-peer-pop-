import React from "react";
import { motion } from "framer-motion";
import MotionSection from "../MotionSection/MotionSection";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const BenefitCard = ({ label, text, i }) => (
  <motion.div
    custom={i}
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    className="rounded-xl bg-amber-100 border border-yellow-300/60 px-5 py-3 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
  >
    <span className="font-bold text-black">{label}:</span>{" "}
    <span className="text-zinc-700">{text}</span>
  </motion.div>
);

const StepCard = ({ label, text, i }) => (
  <motion.div
    custom={i}
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    className="rounded-xl bg-amber-100 border border-yellow-300/60 px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-left"
  >
    <span className="font-bold text-black">{label}:</span>{" "}
    <span className="text-zinc-700">{text}</span>
  </motion.div>
);

const HowItWorks = () => {
  return (
    <MotionSection className="py-24 bg-white relative overflow-visible">
      {/* FIRST BLOCK — brand benefits */}
      <div className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-yellow-500 text-center mb-12"
        >
          Connecting Your{" "}
          <span className="text-neutral-900">
            Brand with the Right Influencers
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT — Benefit cards */}
          <div className="flex flex-col gap-4 max-w-md mx-auto md:mx-0">
            <BenefitCard
              label="Easy Signup"
              text="Register your brand on the platform in minutes."
              i={0}
            />
            <BenefitCard
              label="Wide Reach"
              text="Access a diverse network of influencers across industries."
              i={1}
            />
            <BenefitCard
              label="Direct Communication"
              text="Connect instantly with influencers who align with your brand."
              i={2}
            />
            <BenefitCard
              label="Growth Focused"
              text="Build lasting relationships that expand brand reach."
              i={3}
            />
          </div>

          {/* RIGHT — Brand image card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-[280px] sm:w-[320px] md:w-[360px] hover:scale-105 transition-all duration-200 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912635/brand_zcfrai.png"
                alt="Brand workflow preview"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECOND BLOCK — Steps to get started */}
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-yellow-500 mb-12"
        >
          Simple Steps{" "}
          <span className="text-neutral-900">to Get Started on Peerpop</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT — Influencer image card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <div className="w-[280px] sm:w-[320px] md:w-[360px] hover:scale-105 transition-all duration-200l overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912634/influencer_ui_img_du1fe5.png"
                alt="Influencer profile preview"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT — Steps */}
          <div className="flex flex-col gap-4 text-left">
            <StepCard
              label="Create Your Profile"
              text="Add info, niche, and audience details."
              i={0}
            />
            <StepCard
              label="Set Preferences"
              text="Choose brands and campaigns that match you."
              i={1}
            />
            <StepCard
              label="Browse Opportunities"
              text="Find brands looking for collaborations."
              i={2}
            />
            <StepCard
              label="Start Collaborating"
              text="Apply, connect, and build partnerships."
              i={3}
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default HowItWorks;
