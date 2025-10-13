"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const columns = [
  [
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759931254/cta_2_hy2m8m.mp4",
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759932185/cta_7_cgzgr5.mp4",
  ],
  [
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759931685/cta_4_vuc6ov.mp4",
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759931250/cta_video_otv681.mp4",
  ],
  [
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759932121/cta_6_smu7ze.mp4",
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759932120/cta_5_glkuaf.mp4",
  ],
  [
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759837199/guitar_video_fl0w76.mp4",
    "https://res.cloudinary.com/dvzqfb2z3/video/upload/f_webm,q_auto:best,w_720/v1759931249/cta_3_t6zslz.mp4",
  ],
];

const ANIMATION_DURATION_MS = 1500;

export default function VideoAnimations() {
  const [activeSet, setActiveSet] = useState(0);
  const videoRefs = useRef({});

  const textVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSet((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeouts = [];

    columns.forEach((videos, colIndex) => {
      videos.forEach((_, vidIndex) => {
        const videoKey = `${colIndex}-${vidIndex}`;
        const video = videoRefs.current[videoKey];

        if (!video) return;

        const isVisibleTarget =
          (colIndex % 2 === 0 && vidIndex === activeSet) ||
          (colIndex % 2 !== 0 && vidIndex !== activeSet);

        if (isVisibleTarget) {
          const playTimeout = setTimeout(() => {
            video.play().catch(() => {});
          }, 100);
          timeouts.push(playTimeout);
        } else {
          const pauseTimeout = setTimeout(() => {
            video.pause();
            video.currentTime = 0;
          }, ANIMATION_DURATION_MS);
          timeouts.push(pauseTimeout);
        }
      });
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [activeSet]);

  return (
    <div className="relative h-[90vh] w-full bg-black overflow-hidden flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl p-4 z-0 pointer-events-none">
        {columns.map((videos, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {videos.map((url, vidIndex) => {
              const isVisible =
                (colIndex % 2 === 0 && vidIndex === activeSet) ||
                (colIndex % 2 !== 0 && vidIndex !== activeSet);

              return (
                <motion.div
                  key={vidIndex}
                  className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.95,
                  }}
                  transition={{
                    duration: ANIMATION_DURATION_MS / 1000,
                    ease: "easeInOut",
                  }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[`${colIndex}-${vidIndex}`] = el;
                    }}
                    src={url}
                    preload="auto"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-yellow-500 text-3xl md:text-6xl font-extrabold text-center"
        >
          Create. Collaborate. Connect.
        </motion.div>
      </div>
    </div>
  );
}
