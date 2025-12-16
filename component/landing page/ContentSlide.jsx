"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
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

export default function BrandConnectionSection() {
  return (
    <section className="relative w-full py-20 px-6 md:px-16 overflow-hidden">
      {/* SECTION 1: Connecting With Influencers */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-center text-3xl md:text-4xl font-extrabold text-black mb-12"
      >
        Connecting Your Brand with the{" "}
        <span className="text-yellow-500">Right Influencers</span>
      </motion.h2>

      {/* Reduced max-w to 5xl for a more compact feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-4 text-gray-900"
        >
          <Feature
            icon={<UserPlus className="w-5 h-5" />}
            title="Easy Signup"
            desc="Register your brand on the platform in minutes."
          />
          <Feature
            icon={<Users className="w-5 h-5" />}
            title="Wide Reach"
            desc="Access a diverse network of influencers across industries."
          />
          <Feature
            icon={<MessageCircle className="w-5 h-5" />}
            title="Direct Communication"
            desc="Connect instantly with influencers who align with you."
          />
          <Feature
            icon={<TrendingUp className="w-5 h-5" />}
            title="Growth Focused"
            desc="Build lasting relationships to expand visibility."
          />
        </motion.div>

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
        className="text-center text-3xl md:text-4xl font-extrabold text-black mt-24 mb-12"
      >
        Simple Steps to Get Started on{" "}
        <span className="text-yellow-500">Peerpop</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <PortfolioMockup />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-4 text-gray-900 order-1 md:order-2"
        >
          <Step
            icon={<UserCircle className="w-5 h-5" />}
            title="Create Your Profile"
            desc="Sign up by adding your personal info and niche."
          />
          <Step
            icon={<Users className="w-5 h-5" />}
            title="Set Preferences"
            desc="Select the brands that match your interests."
          />
          <Step
            icon={<Search className="w-5 h-5" />}
            title="Browse Opportunities"
            desc="Find brands looking for influencers like you."
          />
          <Step
            icon={<Sparkles className="w-5 h-5" />}
            title="Start Collaborating"
            desc="Apply, connect, and build partnerships."
          />
        </motion.div>
      </div>
    </section>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100/50 transition-colors hover:bg-amber-100/80">
    <div className="text-yellow-600 mt-1">{icon}</div>
    <div>
      <p className="font-bold text-sm md:text-base">{title}</p>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  </div>
);

const Step = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100/50 transition-colors hover:bg-amber-100/80">
    <div className="text-gray-900 mt-1">{icon}</div>
    <div>
      <p className="font-bold text-sm md:text-base">{title}</p>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  </div>
);

const BrandCollabMockup = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring" }}
    className="w-[260px] sm:w-[300px] md:w-[340px] cursor-pointer"
  >
    <img
      src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888134/connecting_your_brand_with_the_right_influencers_p4n3pu.png"
      alt="Brand workflow"
      className="w-full h-auto drop-shadow-2xl"
    />
  </motion.div>
);

const PortfolioMockup = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring" }}
    className="w-full flex justify-center cursor-pointer"
  >
    <div className="w-[260px] sm:w-[300px] md:w-[340px]">
      <img
        src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888137/Simple_Steps_to_Get_Started_on_Peerpop_ntllgx.png"
        alt="Influencer profile"
        className="w-full h-auto drop-shadow-2xl"
      />
    </div>
  </motion.div>
);
