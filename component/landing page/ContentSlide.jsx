"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Target,
  MessageCircle,
  TrendingUp,
  UserCircle,
  Users,
  Search,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const Rings = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[500, 900, 1300].map((size, i) => (
      <div
        key={i}
        className="absolute border border-yellow-300 rounded-full opacity-40"
        style={{
          width: size,
          height: size,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderStyle: "dashed",
        }}
      ></div>
    ))}
  </div>
);

export default function BrandConnectionSection() {
  return (
    <section className="relative w-full bg-white py-28 px-6 md:px-16 overflow-hidden">
      <Rings />

      {/* SECTION 1: Connecting With Influencers */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold text-black mb-16"
      >
        Connecting Your Brand with the{" "}
        <span className="text-yellow-500">Right Influencers</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* LEFT COLUMN – FEATURES */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-6 text-gray-900"
        >
          <Feature
            icon={<UserPlus className="w-5 h-5" />}
            title="Easy Signup"
            desc="Register your brand on the platform in minutes."
          />
          <Feature
            icon={<Users className="w-5 h-5" />}
            title="Wide Reach"
            desc="Access a diverse network of influencers and brands across various industries."
          />
          <Feature
            icon={<MessageCircle className="w-5 h-5" />}
            title="Direct Communication"
            desc="Connect instantly with influencers who align with your brand values."
          />
          <Feature
            icon={<TrendingUp className="w-5 h-5" />}
            title="Growth Focused"
            desc="Build lasting relationships to expand your brand’s visibility."
          />
        </motion.div>

        {/* RIGHT COLUMN – BRAND COLLAB CARD */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <BrandCollabMockup />
        </motion.div>
      </div>

      {/* SECTION 2 – Simple Steps */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold text-black mt-28 mb-16"
      >
        Simple Steps to Get Started on{" "}
        <span className="text-yellow-500">Peerpop</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* LEFT – Portfolio Mockup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <PortfolioMockup />
        </motion.div>

        {/* RIGHT – Steps List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-8 text-gray-900"
        >
          <Step
            icon={<UserCircle className="w-5 h-5" />}
            title="Create Your Profile"
            desc="Sign up by adding your personal info, niche, and audience details."
          />
          <Step
            icon={<Users className="w-5 h-5" />}
            title="Set Preferences"
            desc="Select the brands and campaigns that match your interests."
          />
          <Step
            icon={<Search className="w-5 h-5" />}
            title="Browse Opportunities"
            desc="Find brands looking for influencers like you."
          />
          <Step
            icon={<Sparkles className="w-5 h-5" />}
            title="Start Collaborating"
            desc="Apply, connect, and build partnerships with brands."
          />
        </motion.div>
      </div>
    </section>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="text-yellow-600 mt-1">{icon}</div>
    <div>
      <p className="font-bold">{title}:</p>
      <p className="text-gray-700">{desc}</p>
    </div>
  </div>
);

const Step = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="text-gray-900">{icon}</div>
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-gray-700">{desc}</p>
    </div>
  </div>
);

const BrandCollabMockup = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7 }}
    className="flex justify-center md:justify-end"
  >
    <div className="w-[280px] sm:w-[320px] md:w-[360px] rounded-3xl bg-amber-50 border border-yellow-300/70 shadow-xl overflow-hidden">
      <img
        src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912635/brand_zcfrai.png"
        alt="Brand workflow preview"
        className="w-full h-full object-cover"
      />
    </div>
  </motion.div>
);

const PortfolioMockup = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center"
    >
      <div className="w-[280px] sm:w-[320px] md:w-[360px] rounded-3xl bg-amber-50 border border-yellow-300/70 shadow-xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912634/influencer_ui_img_du1fe5.png"
          alt="Influencer profile preview"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  </div>
);
