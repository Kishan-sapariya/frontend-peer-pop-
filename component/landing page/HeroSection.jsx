"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Building2,
  Instagram,
  Youtube,
  Linkedin,
  UserPlus,
} from "lucide-react";

// Mock Data
const mockProfileData = {
  name: "Sarah Johnson",
  handle: "@sarahjohnson",
  profilePic:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

// Animations
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 20,
    },
  },
};

// Ring Generator
const Rings = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none">
    {[260, 420, 600].map((size, i) => (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 border border-yellow-300/40 rounded-full"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          borderStyle: "dashed",
          borderWidth: 2,
          opacity: 0.5 - i * 0.12,
        }}
      ></div>
    ))}
  </div>
);

const TopHero = () => (
  <section className="relative pt-20 pb-0 bg-white overflow-hidden">
    <Rings />

    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={container}
      viewport={{ once: true }}
      className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-14"
    >
      {/* Left Text */}
      <motion.div
        variants={fadeUp}
        className="lg:w-1/2 pl-10 text-center lg:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Where Creators, Mentors
          <br />
          <span className="text-yellow-500">&amp; Brands Connect.</span>
        </h1>

        <p className="text-lg text-gray-600 mt-6 max-w-xl">
          Thousands of creators, mentors, and brands have already joined
          PeerPop's Elite Network. Be next in line to unlock premium
          collaborations and growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="/signup"
            className="px-8 py-4 rounded-xl bg-yellow-500 shadow-lg text-gray-900 text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> Get Started for Free
          </a>

          <a
            href="/login/business"
            className="px-8 py-4 rounded-xl border-2 border-yellow-500 bg-white text-gray-900 text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Building2 className="w-5 h-5" /> I'm a Business
          </a>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
          {[
            { color: "bg-green-400", label: "Free to join" },
            { color: "bg-blue-400", label: "Verified creators" },
            { color: "bg-purple-400", label: "Global community" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${t.color}`} />
              <div className="px-3 py-1 rounded-full text-sm bg-white border shadow-sm">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Card (Small Profile Preview) */}
      <motion.div variants={fadeUp} className="lg:w-1/2 flex justify-center">
        <div className="bg-[#F6E6A8] rounded-3xl p-6 shadow-xl w-[360px]">
          <div className="flex gap-4 items-center">
            <img
              src={mockProfileData.profilePic}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-700">Hi Sarah,</p>
              <h3 className="text-xl font-bold text-gray-900">Welcome Back!</h3>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4 mt-4 text-xs font-semibold text-gray-900">
            <div className="flex items-center gap-1">
              <Instagram className="w-4 text-pink-500" /> 2.4M
            </div>
            <div className="flex items-center gap-1">
              <Youtube className="w-4 text-red-500" /> 145K
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 text-blue-600" /> 48K
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              { label: "Response Rate", value: "45.2%" },
              { label: "Engagement", value: "20%" },
              { label: "Growth Rate", value: "10%" },
              { label: "Avg Audience", value: "5000" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow text-gray-900"
              >
                <p className="text-xs text-gray-600">{s.label}</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const DashboardPreview = () => (
  <section className="relative pb-10 bg-white">
    <Rings />

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative z-10 mt-20 w-full max-w-5xl mx-auto"
    >
      <img
        className="w-full h-full bg-[#f5d88a] rounded-3xl shadow-xl border border-yellow-300/40 flex items-center justify-center text-xl text-yellow-800 font-semibold object-cover"
        src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912675/Frame_48_rsh292.png"
      />
    </motion.div>
  </section>
);

// -----------------------------------------------------------------------------
//  EXPORT PAGE
// -----------------------------------------------------------------------------
const HeroSection = () => (
  <>
    <TopHero />
    <DashboardPreview />
  </>
);

export default HeroSection;
