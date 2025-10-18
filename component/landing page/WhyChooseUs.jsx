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

const ImagePlaceholder = ({ imageQuery }) => (
  <div
    className={`
      w-full h-96 lg:h-[28rem] xl:h-[32rem] flex items-center justify-center overflow-hidden
    `}
  >
    <img
      src={imageQuery}
      alt="Feature"
      className="w-full h-[250%] object-contain transition-transform duration-500 hover:scale-[1.05] mb-30"
    />
  </div>
);

const features = [
  {
    title: "Portfolio-First Design",
    description:
      "Showcase your work beautifully with our portfolio-focused platform designed specifically for creatives. Your profile is your new creative hub.",
    icon: Briefcase,
    accentColor: "bg-blue-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760692645/Portfolio-First_Design_wizmnf.png",
  },
  {
    title: "Quality Connections",
    description:
      "Connect with serious creatives actively looking to collaborate, not passive scrollers.",
    icon: Handshake,
    accentColor: "bg-green-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760692645/Quality_Connections_g8gfay.png",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your YouTube & Instagram performance with comprehensive analytics all in one dashboard.",
    icon: BarChart3,
    accentColor: "bg-purple-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760692645/Real-Time_Analytics_fuqkj8.png",
  },
  {
    title: "Real Opportunities",
    description:
      "Access genuine collaboration opportunities and brand partnerships that match your skills.",
    icon: Rocket,
    accentColor: "bg-orange-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760692720/Real_Opportunities_j0ncb3.png",
  },
  {
    title: "100% Creator Earnings",
    description:
      "Keep every penny from collaborations. No commissions, no fees - your talent, your earnings.",
    icon: DollarSign,
    accentColor: "bg-pink-600",
    imageQuery:
      "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1760692644/100_Creator_Earnings_hfilmp.png",
  },
];

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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

      <div className="container mx-auto relative z-10">
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

        <div className="flex flex-col gap-28 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const isContentLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`
                  grid grid-cols-1 lg:grid-cols-2 gap-16 
                  // This class ensures vertical alignment of content and image
                  items-center
                  ${isContentLeft ? "" : "lg:[direction:rtl]"}
                `}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  variants={contentVariants(isContentLeft)}
                  className="lg:[direction:ltr]"
                >
                  <Card
                    className={`
                      p-8 md:p-12 rounded-3xl transition-all duration-500 
                      bg-white/[0.05] 
                      backdrop-blur-md text-white border border-white/10
                      shadow-2xl shadow-gray-900/50
                      hover:bg-white/[0.08] hover:border-yellow-400/30
                      flex flex-col group 
                    `}
                  >
                    <div
                      className={`
                        w-16 h-16 md:w-20 md:h-20 ${feature.accentColor} 
                        rounded-xl mb-8 flex items-center justify-center 
                        text-white transition-all duration-300
                        group-hover:scale-[1.05] group-hover:shadow-2xl
                      `}
                    >
                      <feature.icon size={36} />
                    </div>

                    <div className="flex-1">
                      <CardTitle className="text-3xl md:text-4xl font-extrabold mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  variants={imageVariants(isContentLeft)}
                  className="lg:[direction:ltr]"
                >
                  <ImagePlaceholder imageQuery={feature.imageQuery} />
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
