"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const creatorVideos = [
  // Column 1
  {
    id: 1,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759931254/cta_2_hy2m8m.mp4",
    position: "left-10 top-1",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759932185/cta_7_cgzgr5.mp4",
    position: "left-10 top-[310px] md:top-[430px]",
  },

  // Column 2
  {
    id: 3,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759931685/cta_4_vuc6ov.mp4",
    position: "left-[390px] bottom-1",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759931250/cta_video_otv681.mp4",
    position: "left-[390px] bottom-[310px] md:bottom-[410px]",
  },

  // Column 3
  {
    id: 5,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759932121/cta_6_smu7ze.mp4",
    position: "right-[390px] top-1",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759932120/cta_5_glkuaf.mp4",
    position: "right-[390px] top-[430px]",
  },

  // Column 4
  {
    id: 7,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759837199/guitar_video_fl0w76.mp4",
    position: "right-10 bottom-1",
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/dvzqfb2z3/video/upload/v1759931249/cta_3_t6zslz.mp4",
    position: "right-10 bottom-[410px]",
  },
];

const ANIMATION_DURATION_MS = 1500;

export default function VideoAnimations() {
  const [activeSet, setActiveSet] = useState(0);
  const videoRefs = useRef([]);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSet((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    creatorVideos.forEach((_, index) => {
      const ref = videoRefs.current[index];
      if (!ref) return;

      const isTopVideo = index % 2 === 0;
      const isActive =
        (activeSet === 0 && isTopVideo) || (activeSet === 1 && !isTopVideo);

      if (isActive) {
        ref.play().catch(() => {});
      } else {
        const pauseTimeout = setTimeout(() => {
          ref.pause();
        }, ANIMATION_DURATION_MS);
        timeoutRefs.current.push(pauseTimeout);
      }
    });

    return () => timeoutRefs.current.forEach(clearTimeout);
  }, [activeSet]);

  return (
    <div className="relative h-[90vh] w-full bg-black overflow-hidden p-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {creatorVideos.map((video, index) => {
          const isTopVideo = index % 2 === 0;
          const isActive =
            (activeSet === 0 && isTopVideo) || (activeSet === 1 && !isTopVideo);

          return (
            <motion.div
              key={video.id}
              className={`absolute ${video.position} h-[300px] w-[250px] md:h-[390px] md:w-[280px] rounded-3xl overflow-hidden shadow-2xl border border-white/10`}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.05 : 0.98,
              }}
              transition={{
                duration: ANIMATION_DURATION_MS / 1000,
                ease: "easeInOut",
              }}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
            </motion.div>
          );
        })}
      </div>

      {/* Central overlay text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 text-yellow-500 text-4xl md:text-6xl font-bold text-center pointer-events-none">
        Create. Collaborate. Connect.
      </div>
    </div>
  );
}
