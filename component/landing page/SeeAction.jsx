"use client";

import React from "react";
import { motion } from "framer-motion";
import { DiscoveryFeedMockup } from "./see actions/DiscoveryFeedMockup";
import { ProfileShowcaseMockup } from "./see actions/ProfileShowCaseMockup";
import { MessagingMockup } from "./see actions/MessagingMockup";
import { OpportunitiesMockup } from "./see actions/OpportunintesMockup";

const SeeAction = () => {
  const content = [
    {
      tag: "Discover",
      title: "Find your perfect match",
      desc: "Browse through thousands of verified creators, mentors, and brands. Our smart filters and AI-powered recommendations help you discover exactly who you're looking for based on niche, location, experience, and goals.",
      points:
        "Advanced search with 20+ filters,AI-powered match suggestions,Save and organize favorites",
      component: DiscoveryFeedMockup,
    },
    {
      tag: "Profiles",
      title: "Showcase your work beautifully",
      desc: "Create a stunning profile that highlights your best work, achievements, and creative vision. Add your portfolio, social links, and let your personality shine through with rich media and custom layouts.",
      points:
        "Portfolio gallery with rich media,Verified badges and credentials,Real-time analytics and insights",
      component: ProfileShowcaseMockup,
    },
    {
      tag: "Communication",
      title: "Connect in real-time",
      desc: "Built-in messaging makes it easy to start conversations, share ideas, and build relationships. Send files, schedule meetings, and keep all your communications organized in one place.",
      points:
        "Real-time chat with file sharing,Integrated video call scheduling,Smart notifications and reminders",
      component: MessagingMockup,
    },
    {
      tag: "Opportunities",
      title: "Discover brand deals effortlessly",
      desc: "Access a curated feed of brand partnerships and campaigns tailored to your niche. Apply with one click, track your applications, and manage all your collaborations from a single dashboard.",
      points:
        "Personalized opportunity feed,One-click application process,Application tracking and analytics",
      component: OpportunitiesMockup,
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const renderMedia = (item) => {
    if (item.component) {
      const MockupComponent = item.component;
      return <MockupComponent />;
    }
    return (
      <img
        src={item.imageUrl}
        alt={item.title}
        className="rounded-3xl shadow-2xl w-full max-w-[500px] object-cover aspect-video hover:scale-105 transition-transform duration-500"
      />
    );
  };

  return (
    <div className="py-20 px-6 md:px-16 bg-black w-full flex flex-col justify-center items-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3 text-center max-w-3xl mb-16"
      >
        <motion.h1
          variants={fadeUp}
          className="text-white font-extrabold text-4xl md:text-5xl"
        >
          See Peer Pop in <span className="text-yellow-500">Action</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg md:text-xl"
        >
          A powerful platform designed to make networking effortless and
          authentic.
        </motion.p>
      </motion.div>

      <div className="space-y-24 w-full max-w-7xl">
        {content.map((c, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              } items-center justify-between gap-12`}
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full md:w-1/2 space-y-4 text-center md:text-left px-4 md:px-8"
              >
                <motion.div
                  variants={fadeUp}
                  className="uppercase tracking-wide bg-yellow-500 text-black inline-block px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {c.tag}
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold text-yellow-500"
                >
                  {c.title}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-gray-300 leading-relaxed"
                >
                  {c.desc}
                </motion.p>
                <motion.ul
                  variants={fadeUp}
                  className="text-gray-400 list-disc pl-5 space-y-2"
                >
                  {c.points.split(",").map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </motion.ul>
              </motion.div>

              <div className="w-full md:w-1/2 flex justify-center">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  className="w-full max-w-[500px]"
                >
                  {renderMedia(c)}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeeAction;
