"use client";

import React from "react";
import {
  Target,
  Heart,
  Users,
  Handshake,
  Aperture,
  Zap,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/component/landing page/Footer";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We're constantly evolving to meet the changing needs of the creative community.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description:
      "We operate with transparency and always put our community first.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "We welcome creators from all backgrounds and celebrate diverse perspectives.",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description:
      "We strive for the highest quality in everything we build and every interaction we have.",
  },
];

const ValueCard = ({ value }) => {
  const Icon = value.icon;
  return (
    <motion.div
      variants={item}
      className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col items-center text-center h-full transition-all duration-300 hover:border-yellow-400 hover:shadow-lg"
    >
      <div className="p-3 rounded-full bg-yellow-50 border border-yellow-400 mb-4">
        <Icon className="w-6 h-6 text-yellow-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
      <p className="text-gray-600 text-sm">{value.description}</p>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FFF8EC] via-white to-gray-50 text-gray-900 font-sans px-4 sm:px-8 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.header
            className="text-center mb-16 mt-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm"
              variants={item}
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400" /> About PeerPop
            </motion.span>
            <motion.h1
              className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900"
              variants={item}
            >
              Building the future of{" "}
              <span className="text-yellow-500">creative collaboration</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto"
              variants={item}
            >
              PeerPop was founded on the belief that authentic connections drive
              the best creative work. We're here to make those connections
              happen.
            </motion.p>
          </motion.header>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Our Mission */}
            <motion.div
              variants={item}
              className="p-8 bg-white rounded-xl shadow-md border border-gray-100 lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:border-yellow-400"
            >
              <div className="p-3 rounded-full bg-yellow-50 border border-yellow-400 w-fit mb-4">
                <Target className="w-6 h-6 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To empower creators, mentors, and brands to build meaningful
                relationships that drive authentic collaboration and sustainable
                creative careers.
              </p>
            </motion.div>

            {/* Core Beliefs */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                variants={item}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-yellow-400"
              >
                <h3 className="flex items-center text-xl font-bold text-yellow-500 mb-2">
                  <Heart className="w-5 h-5 mr-2" /> Authenticity First
                </h3>
                <p className="text-gray-600">
                  We believe the best partnerships are built on genuine
                  connections, not just transactions. Every feature we build
                  prioritizes real relationships.
                </p>
              </motion.div>
              <motion.div
                variants={item}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-yellow-400"
              >
                <h3 className="flex items-center text-xl font-bold text-yellow-500 mb-2">
                  <Aperture className="w-5 h-5 mr-2" /> Community Driven
                </h3>
                <p className="text-gray-600">
                  Our platform is shaped by feedback from creators, mentors, and
                  brands. We're building this together with the people who use
                  it every day.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.section
            className="my-20 p-8 md:p-12 bg-white rounded-xl shadow-md border border-gray-100 w-full transition-all duration-300 hover:shadow-lg"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-yellow-500 mb-4"
              variants={item}
            >
              Our Story
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
              <motion.div variants={item}>
                <p className="mb-4">
                  PeerPop started in 2025 when our founders, both former
                  creators themselves, recognized a gap in the market. While
                  there were plenty of platforms for finding brand deals or
                  networking, none truly focused on building the authentic
                  relationships that lead to the best creative work.
                </p>
                <p>
                  They experienced firsthand how transformative the right mentor
                  or peer collaboration could be. They also saw how brands
                  struggled to find creators who genuinely aligned with their
                  values, not just their follower counts.
                </p>
              </motion.div>
              <motion.div variants={item}>
                <p className="mb-4">
                  So they built PeerPop—a platform designed from the ground up
                  to prioritize quality connections over quantity. A place where
                  creators could find mentors who've walked their path,
                  collaborate with peers who share their vision, and partner
                  with brands that truly get them.
                </p>
                <p className="font-semibold text-gray-900">
                  Today, PeerPop serves thousands of creators, mentors, and
                  brands across every creative niche. We're proud to have
                  facilitated millions in brand deals and countless mentorship
                  relationships that have changed careers.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="mt-20 mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={item} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Our <span className="text-yellow-500">Values</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                The principles that guide everything we do.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
            >
              {values.map((value) => (
                <ValueCard key={value.title} value={value} />
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
