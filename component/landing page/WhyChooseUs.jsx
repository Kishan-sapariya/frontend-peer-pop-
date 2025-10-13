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

const WhyChooseUs = () => {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
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

        {/* Feature Grid - Animated Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animation triggers when 30% of the container is visible
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              // Use a standard div for motion, wrap the content in Card
              className={feature.className}
            >
              <Card
                className={`
                  p-8 rounded-3xl transition-all duration-500 bg-white/5 
                  backdrop-blur-xl text-white border border-white/10 
                  shadow-2xl shadow-black/50 h-full
                  hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 
                  flex flex-col group
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-16 h-16 ${feature.accentColor} 
                    rounded-2xl mb-6 flex items-center justify-center 
                    text-white shadow-xl shrink-0 transition-transform duration-300
                    ${feature.align === "center" ? "mx-auto" : "mr-auto"}
                    group-hover:rotate-6
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
                  <CardTitle className="text-2xl font-bold mb-3 text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-300">
                    {feature.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
