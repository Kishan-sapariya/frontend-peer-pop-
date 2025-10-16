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

const ImagePlaceholder = ({ imageQuery, accentColor }) => (
  <div
    className={`
      w-full h-80 md:h-96 flex items-center justify-center 
      rounded-2xl overflow-hidden
      bg-gray-900/40 backdrop-blur-sm
    `}
  >
    <img
      src={imageQuery}
      alt="Feature"
      className="w-full h-full object-cover"
    />
  </div>
);

// --- UPDATED FEATURES DATA ---
const features = [
  {
    title: "Portfolio-First Design",
    description:
      "Showcase your work beautifully with our portfolio-focused platform designed specifically for creatives. Your profile is your new creative hub.",
    icon: Briefcase,
    accentColor: "bg-blue-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760603171/Portfolio-First_Design_xjar1c.png",
  },
  {
    title: "Quality Connections",
    description:
      "Connect with serious creatives actively looking to collaborate, not passive scrollers.",
    icon: Handshake,
    accentColor: "bg-green-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760603171/Quality_Connections_s0fcq3.png",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your YouTube & Instagram performance with comprehensive analytics all in one dashboard.",
    icon: BarChart3,
    accentColor: "bg-purple-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760603171/Real-Time_Analytics_qlzxry.png",
  },
  {
    title: "Real Opportunities",
    description:
      "Access genuine collaboration opportunities and brand partnerships that match your skills.",
    icon: Rocket,
    accentColor: "bg-orange-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760603172/Real_Opportunities_mjgpgu.png",
  },
  {
    title: "100% Creator Earnings",
    description:
      "Keep every penny from collaborations. No commissions, no fees - your talent, your earnings.",
    icon: DollarSign,
    accentColor: "bg-pink-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760603171/100_Creator_Earnings_pilhmg.png",
  },
];

// --- WHY CHOOSE US COMPONENT ---
const WhyChooseUs = () => {
  const contentVariants = (isLeft) => ({
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  });

  const imageVariants = (isLeft) => ({
    hidden: { opacity: 0, x: isLeft ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      },
    },
  });

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Creators Choose Us
          </motion.h2>
          <motion.p
            className="text-xl text-yellow-400 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to showcase, connect, and grow your creative
            career.
          </motion.p>
        </div>

        {/* Staggered Features Grid */}
        <div className="flex flex-col gap-20 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            // Determine if content should be on left (even indices) or right (odd indices)
            const isContentLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`
                  grid grid-cols-1 lg:grid-cols-2 gap-12 
                  items-center
                  ${isContentLeft ? "" : "lg:[direction:rtl]"}
                `}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Content Card */}
                <motion.div
                  variants={contentVariants(isContentLeft)}
                  className="lg:[direction:ltr]"
                >
                  <Card
                    className={`
                      p-8 md:p-10 rounded-2xl transition-all duration-300 
                      bg-white/[0.05] 
                      backdrop-blur-sm text-white border border-white/10
                      shadow-sm
                      hover:bg-white/[0.08] hover:border-white/20
                      flex flex-col group 
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-14 h-14 md:w-16 md:h-16 ${feature.accentColor} 
                        rounded-lg mb-6 flex items-center justify-center 
                        text-white transition-transform duration-300
                        group-hover:scale-105
                      `}
                    >
                      <feature.icon size={32} />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <CardTitle className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg text-gray-400 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </Card>
                </motion.div>

                {/* Image Block */}
                <motion.div
                  variants={imageVariants(isContentLeft)}
                  className="lg:[direction:ltr]"
                >
                  <ImagePlaceholder
                    imageQuery={feature.imageQuery}
                    accentColor={feature.accentColor}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
