"use client";

import React from "react";
import { motion } from "framer-motion";

const SeeAction = () => {
  const content = [
    {
      tag: "Discover",
      title: "Find your perfect match",
      desc: "Browse through thousands of verified creators, mentors, and brands. Our smart filters and AI-powered recommendations help you discover exactly who you're looking for based on niche, location, experience, and goals.",
      points:
        "Advanced search with 20+ filters,AI-powered match suggestions,Save and organize favorites",
      img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888140/find_your_perfect_match_a8mxvg.png",
    },
    {
      tag: "Profiles",
      title: "Showcase your work beautifully",
      desc: "Create a stunning profile that highlights your best work, achievements, and creative vision. Add your portfolio, social links, and let your personality shine through with rich media and custom layouts.",
      points:
        "Portfolio gallery with rich media,Verified badges and credentials,Real-time analytics and insights",
      img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888137/Showcase_your_work_beautifully_y1ux6m.png",
    },
    {
      tag: "Communication",
      title: "Connect in real-time",
      desc: "Built-in messaging makes it easy to start conversations, share ideas, and build relationships. Send files, schedule meetings, and keep all your communications organized in one place.",
      points:
        "Real-time chat with file sharing,Integrated video call scheduling,Smart notifications and reminders",
      img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888135/Connect_in_real_time_gstg12.png",
    },
    {
      tag: "Opportunities",
      title: "Discover brand deals effortlessly",
      desc: "Access a curated feed of brand partnerships and campaigns tailored to your niche. Apply with one click, track your applications, and manage all your collaborations from a single dashboard.",
      points:
        "Personalized opportunity feed,One-click application process,Application tracking and analytics",
      img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/v1765888134/connecting_your_brand_with_the_right_influencers_p4n3pu.png",
    },
  ];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 16 },
    },
  };

  const renderMedia = (item) => {
    return (
      <div className="overflow-hidden p-2 w-full max-w-[520px] hover:scale-105 transition-all duration-300">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-auto object-cover rounded-[32px]"
        />
      </div>
    );
  };

  return (
    <section className="py-20 sm:py-24 px-6 md:px-16 w-full bg-white">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-24 max-w-3xl mx-auto"
      >
        <motion.h1
          variants={fadeUp}
          className="text-gray-900 font-bold tracking-tight text-3xl sm:text-4xl"
        >
          See Peer Pop in <span className="text-yellow-500">Action</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-800 mt-4 text-lg md:text-xl"
        >
          A powerful platform designed to make networking effortless and
          authentic.
        </motion.p>
      </motion.div>
      {/* Content Rows */}
      <div className="space-y-32 max-w-7xl mx-auto">
        {content.map((c, index) => {
          const reversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                reversed ? "md:flex-row-reverse" : ""
              } items-center justify-between gap-16`}
            >
              {/* Text Section */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full md:w-1/2 px-2 md:px-6"
              >
                <motion.div
                  variants={fadeUp}
                  className="uppercase bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs tracking-wide font-semibold inline-block"
                >
                  {c.tag}
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-extrabold text-yellow-500 mt-3"
                >
                  {c.title}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="text-gray-900 mt-4 text-lg leading-relaxed"
                >
                  {c.desc}
                </motion.p>

                <motion.ul
                  variants={fadeUp}
                  className="text-gray-900 mt-4 space-y-2 list-disc pl-6"
                >
                  {c.points.split(",").map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Mockup Section */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full md:w-1/2 flex justify-center"
              >
                {renderMedia(c)}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SeeAction;
