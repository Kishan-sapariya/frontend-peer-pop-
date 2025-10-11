"use client";

import React from "react";
import {
  Briefcase,
  Handshake,
  BarChart3,
  Rocket,
  DollarSign,
} from "lucide-react";

import { motion } from "framer-motion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Portfolio-First Design",
    description:
      "Showcase your work beautifully with our portfolio-focused platform designed specifically for creatives. Your profile is your new creative hub.",
    icon: Briefcase,
    accentColor: "bg-blue-600 border-blue-600",
    className: "lg:col-span-2",
    align: "left",
  },
  {
    title: "Quality Connections",
    description:
      "Connect with serious creatives actively looking to collaborate, not passive scrollers.",
    icon: Handshake,
    accentColor: "bg-green-600 border-green-600",
    className: "",
    align: "center",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your YouTube & Instagram performance with comprehensive analytics all in one dashboard.",
    icon: BarChart3,
    accentColor: "bg-purple-600 border-purple-600",
    className: "",
    align: "center",
  },
  {
    title: "Real Opportunities",
    description:
      "Access genuine collaboration opportunities and brand partnerships that match your skills.",
    icon: Rocket,
    accentColor: "bg-orange-600 border-orange-600",
    className: "",
    align: "center",
  },
  {
    title: "100% Creator Earnings",
    description:
      "Keep every penny from collaborations. No commissions, no fees - your talent, your earnings.",
    icon: DollarSign,
    accentColor: "bg-pink-600 border-pink-600",
    className: "",
    align: "center",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const MotionCard = motion(Card);

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-[black] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 backdrop-blur-sm"></div>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          {/* Text is now White/Yellow for high contrast */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why Creators Choose Us
          </h2>
          <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
            Everything you need to showcase, connect, and grow your creative
            career.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <MotionCard
              key={index}
              variants={itemVariants}
              className={`
                p-8 rounded-3xl transition-all duration-300 bg-white/10
                backdrop-blur-md text-white border border-white/20 
                hover:scale-105 hover:bg-white/15 hover:shadow-2xl 
                ${feature.className} flex flex-col group
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-16 h-16 ${feature.accentColor} 
                  rounded-2xl mb-6 flex items-center justify-center 
                  text-white shadow-xl shrink-0 transition-transform duration-300
                  ${feature.align === "center" ? "mx-auto" : "mr-auto"}
                  group-hover:scale-110
                `}
              >
                <feature.icon size={32} />
              </div>

              {/* Text Content */}
              <div
                className={`flex flex-col ${
                  feature.align === "left" ? "text-left" : "text-center"
                }`}
              >
                <CardTitle className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base text-gray-300">
                  {feature.description}
                </CardDescription>
              </div>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
