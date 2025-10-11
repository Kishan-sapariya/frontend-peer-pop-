"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Laugh,
  Instagram,
  Music,
  Camera,
  Mic,
  Theater,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Reusable Components ---
const CardTitle = ({ className, children }) => (
  <h3 className={`text-xl font-bold mb-2 ${className}`}>{children}</h3>
);

const CardDescription = ({ className, children }) => (
  <p className={`text-sm text-gray-300 ${className}`}>{children}</p>
);

const Badge = ({ children, className }) => (
  <span
    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${className}`}
  >
    {children}
  </span>
);

// --- Creative Fields Data ---
const creativeFields = [
  {
    id: 1,
    title: "YouTubers",
    description:
      "Video creators, streamers, and content creators building audiences online.",
    icon: Play,
    accentColor: "from-red-500 to-pink-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/youtuber_video_tk7gxk.mp4",
    comingSoon: false,
  },
  {
    id: 2,
    title: "Comedians",
    description: "Professional comedians and entertainment performers.",
    icon: Laugh,
    accentColor: "from-yellow-400 to-orange-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/comedian_video_ytkn8e.mp4",
    comingSoon: false,
  },
  {
    id: 3,
    title: "Influencers",
    description: "Instagram and multi-platform content creators.",
    icon: Instagram,
    accentColor: "from-pink-500 to-purple-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/self_video_recording_dbjwix.mp4",
    comingSoon: false,
  },
  {
    id: 4,
    title: "Musicians",
    description:
      "Artists, songwriters, and producers sharing music with the world.",
    icon: Music,
    accentColor: "from-teal-400 to-green-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/guitar_video_fl0w76.mp4",
    comingSoon: true,
  },
  {
    id: 5,
    title: "Dancers",
    description:
      "Professional dancers, choreographers, and performance artists.",
    icon: Theater,
    accentColor: "from-indigo-400 to-purple-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/dance_video_ao5otz.mp4",
    comingSoon: true,
  },
  {
    id: 6,
    title: "Photographers",
    description: "Visual storytellers capturing moments through photography.",
    icon: Camera,
    accentColor: "from-sky-400 to-indigo-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/camera_video_fisiak.mp4",
    comingSoon: true,
  },
  {
    id: 7,
    title: "Podcasters",
    description:
      "Audio creators and hosts building communities through engaging conversations.",
    icon: Mic,
    accentColor: "from-cyan-400 to-blue-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/podcaster_video_wclrgx.mp4",
    comingSoon: true,
  },
  {
    id: 8,
    title: "Actors",
    description: "Actors, performers, and dramatists for stage and screen.",
    icon: Users,
    accentColor: "from-purple-400 to-pink-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/q_auto:good,w_480/actor_video_2_v297vu.mp4",
    comingSoon: true,
  },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const CreativeFieldsSection = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const videoRef = useRef(null);
  let hoverTimeout;

  return (
    <section className="py-20 px-4 bg-black overflow-hidden relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Every Creative Field Represented
          </h2>
          <p className="text-xl text-yellow-400 max-w-2xl mx-auto">
            From YouTubers to Actors, find your creative community and
            collaborate.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-6xl mx-auto"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {creativeFields.map((field) => (
            <motion.div
              key={field.id}
              variants={cardVariants}
              onMouseEnter={() => {
                hoverTimeout = setTimeout(() => {
                  setHoveredCardId(field.id);
                  videoRef.current?.play();
                }, 150);
              }}
              onMouseLeave={() => {
                clearTimeout(hoverTimeout);
                setHoveredCardId(null);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
              }}
              className={`
                relative backdrop-blur-xl bg-white/10 text-white
                text-center p-6 flex flex-col justify-between items-center 
                rounded-3xl overflow-hidden border border-white/20 
                transition-all duration-500 cursor-pointer
                hover:bg-white/15 hover:scale-[1.05]
              `}
            >
              {/* Video or Icon */}
              <div className="relative z-10 w-full h-32 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-2xl">
                {hoveredCardId === field.id && (
                  <motion.video
                    ref={videoRef}
                    src={field.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    autoPlay
                  />
                )}

                <motion.div
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center 
                      text-white bg-gradient-to-br ${field.accentColor} shadow-xl z-20`}
                  animate={{
                    opacity: hoveredCardId === field.id ? 0 : 1,
                    scale: hoveredCardId === field.id ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <field.icon size={32} />
                </motion.div>
              </div>

              <CardTitle className="text-white">{field.title}</CardTitle>
              <CardDescription>{field.description}</CardDescription>

              {field.comingSoon && (
                <div className="absolute top-5 right-5 z-20">
                  <Badge className="bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                    Coming Soon
                  </Badge>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
};

export default CreativeFieldsSection;
