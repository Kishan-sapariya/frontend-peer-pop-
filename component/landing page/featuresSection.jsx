"use client";

import React, { useState, useEffect, useRef } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const creativeFields = [
  {
    id: 1,
    title: "YouTubers",
    description:
      "Video creators, streamers, and content creators building audiences online.",
    icon: Play,
    accentColor: "from-red-500 to-pink-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/youtuber_video_tk7gxk.mp4",
  },
  {
    id: 2,
    title: "Comedians",
    description: "Professional comedians and entertainment performers.",
    icon: Laugh,
    accentColor: "from-yellow-400 to-orange-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1761726546/Untitled_video_-_Made_with_Clipchamp_1_ycmwiv.mp4",
  },
  {
    id: 3,
    title: "Influencers",
    description: "Instagram and multi-platform content creators.",
    icon: Instagram,
    accentColor: "from-pink-500 to-purple-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/self_video_recording_dbjwix.mp4",
  },
  {
    id: 4,
    title: "Musicians",
    description:
      "Artists, songwriters, and producers sharing music with the world.",
    icon: Music,
    accentColor: "from-teal-400 to-green-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/guitar_video_fl0w76.mp4",
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
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/dance_video_ao5otz.mp4",
    comingSoon: true,
  },
  {
    id: 6,
    title: "Photographers",
    description: "Visual storytellers capturing moments through photography.",
    icon: Camera,
    accentColor: "from-sky-400 to-indigo-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/camera_video_fisiak.mp4",
    comingSoon: true,
  },
  {
    id: 7,
    title: "Podcasters",
    description:
      "Audio creators and hosts building communities through conversations.",
    icon: Mic,
    accentColor: "from-cyan-400 to-blue-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/podcaster_video_wclrgx.mp4",
    comingSoon: true,
  },
  {
    id: 8,
    title: "Actors",
    description: "Actors, performers, and dramatists for stage and screen.",
    icon: Users,
    accentColor: "from-purple-400 to-pink-500",
    videoUrl:
      "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/actor_video_2_v297vu.mp4",
    comingSoon: true,
  },
];

const CreativeFieldsSection = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const videoRefs = useRef({});

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
        damping: 15,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    creativeFields.forEach((field) => {
      const video = document.createElement("video");
      video.src = field.videoUrl;
      video.preload = "auto";
      video.style.display = "none";
      document.body.appendChild(video);
    });
  }, []);

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((id) => {
      const video = videoRefs.current[id];
      if (video && parseInt(id) !== hoveredCardId) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const currentVideo = videoRefs.current[hoveredCardId];
    if (currentVideo) {
      currentVideo.play().catch(() => {});
    }
  }, [hoveredCardId]);

  return (
    <section className="py-20 px-4 bg-black overflow-hidden relative">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Every Creative Field{" "}
            <span className="text-yellow-500">Represented</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From YouTubers to Actors, find your creative community and
            collaborate.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {creativeFields.map((field) => (
            <motion.div
              key={field.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCardId(field.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <Card
                className={`
                  relative text-white border-white/10
                  text-center flex flex-col justify-between items-center 
                  rounded-3xl overflow-hidden shadow-xl shadow-black/50
                  backdrop-blur-lg bg-white/5
                  px-2 py-3 h-full
                  transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]
                `}
              >
                <CardHeader className="p-0 w-full">
                  <div className="relative w-full h-32 mb-4 flex items-center justify-center overflow-hidden rounded-t-3xl">
                    <video
                      ref={(el) => (videoRefs.current[field.id] = el)}
                      src={field.videoUrl}
                      className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
                        hoveredCardId === field.id ? "opacity-100" : "opacity-0"
                      }`}
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />

                    <div
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center 
                        text-white bg-gradient-to-br ${
                          field.accentColor
                        } shadow-xl transition-opacity duration-300 ${
                        hoveredCardId === field.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <field.icon size={32} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center p-6 pt-0 w-full">
                  <CardTitle className="text-white text-lg md:text-xl">
                    {field.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {field.description}
                  </CardDescription>
                </CardContent>

                {field.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="outline"
                      className="bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeFieldsSection;
