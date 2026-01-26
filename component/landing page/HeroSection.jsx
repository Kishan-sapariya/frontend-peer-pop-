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
} from "lucide-react";

const mockProfileData = {
  name: "Sarah Johnson",
  handle: "@sarahjohnson",
  profilePic:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

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

const Rings = () => (
  <div className="absolute top-[-550px] left-1/2 -translate-x-1/2 z-0 pointer-events-none overflow-visible hidden sm:flex items-center justify-center">
    <svg
      viewBox="0 0 2000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[1200px] lg:w-[1800px] h-auto opacity-60 overflow-visible"
    >
      {[650, 750, 850, 950].map((radius, i) => (
        <circle
          key={i}
          cx="1000"
          cy="1000"
          r={radius}
          stroke="#fadb2a"
          strokeWidth="1.5"
          strokeDasharray="15 16"
        />
      ))}
    </svg>
  </div>
);

const TopHero = () => (
  <section className="relative pt-20 pb-0 overflow-hidden">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={container}
      viewport={{ once: true }}
      className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-14"
    >
      {/* Left Text */}
      <motion.div
        variants={fadeUp}
        className="lg:w-1/2 lg:pl-10 text-center lg:text-left"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
          <span className="whitespace-nowrap">Where Creators, Mentors</span>

          <span className="text-yellow-500 block">&amp; Brands Connect.</span>
        </h1>

        <p className="text-lg text-gray-600 mt-6 max-w-xl mx-auto lg:mx-0">
          Thousands of creators, mentors, and brands have already joined
          PeerPop's Elite Network. Be next in line to unlock premium
          collaborations and growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
          <a
            href="/signup"
            className="px-8 py-4 rounded-xl bg-yellow-500 shadow-lg text-gray-900 text-lg font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" /> Get Started for Free
          </a>

          <a
            href="/login/business"
            className="px-8 py-4 rounded-xl border-2 border-yellow-500 bg-white text-gray-900 text-lg font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
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
              <div className="px-3 py-1 rounded-full text-sm border shadow-sm">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Card */}
      <motion.div variants={fadeUp} className="lg:w-1/2 flex justify-center hover:scale-103 transition-all duration-300">
        <div className="bg-[#F6E6A8] rounded-3xl p-6 shadow-xl w-full max-w-[360px]">
          <div className="flex gap-4 items-center">
            <img
              src={mockProfileData.profilePic}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm text-gray-700">Hi Sarah,</p>
              <h3 className="text-xl font-bold text-gray-900">Welcome Back!</h3>
            </div>
          </div>

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
  <section className="relative pb-10  hidden md:block">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative z-10 mt-20 w-full max-w-5xl mx-auto px-6"
    >
      <img
        className="w-full h-auto rounded-3xl shadow-xl object-cover"
        src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912675/Frame_48_rsh292.png"
        alt="Dashboard Preview"
      />
    </motion.div>
  </section>
);

const HeroSection = () => (
  // overflow-hidden here prevents the giant rings from causing a horizontal scroll
  <div className="relative w-full overflow-hidden bg-white">
    <Rings />
    <div className="relative z-10">
      <TopHero />
      <DashboardPreview />
    </div>
  </div>
);

export default HeroSection;
