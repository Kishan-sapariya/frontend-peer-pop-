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
      {/* --- Section Header --- */}
      <div className="space-y-3 text-center max-w-3xl mb-16">
        <h1 className="text-yellow-500 font-extrabold text-4xl md:text-5xl">
          See Peer Pop in Action
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          A powerful platform designed to make networking effortless and
          authentic.
        </p>
      </div>

      {/* --- Content Blocks --- */}
      <div className="space-y-24 w-full max-w-7xl">
        {content.map((c, index) => {
          const isReversed = index % 2 === 1;
          const textDirection = isReversed ? 100 : -100;
          const imageDirection = isReversed ? -100 : 100;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              } items-center justify-between gap-12`}
            >
              {/* Text Section */}
              <motion.div
                initial={{ x: textDirection, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full md:w-1/2 space-y-4 text-center md:text-left px-4 md:px-8"
              >
                {/* Replaced 'Badge' with a styled div for general compatibility, assuming Badge isn't custom */}
                <div className="uppercase tracking-wide bg-yellow-500 text-black inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {c.tag}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
                  {c.title}
                </h2>
                <p className="text-gray-300 leading-relaxed">{c.desc}</p>
                <ul className="text-gray-400 list-disc pl-5 space-y-2">
                  {c.points.split(",").map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Image/Mockup Section */}
              <motion.div
                initial={{ x: imageDirection, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full md:w-1/2 flex justify-center"
              >
                {/* Render the component or the image based on content */}
                <div className="w-full max-w-[500px]">{renderMedia(c)}</div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeeAction;
