"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";


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
const allVideos = columns.flat();

const VideoCard = ({ src, className }) => (
  <div
    className={cn(
      "relative w-full aspect-auto sm:aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl",
      className
    )}
  >
    <video
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
    />
  </div>
);

const MobileSnapFeed = () => (
  <div
    className="h-full w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth no-scrollbar"
  >
    {allVideos.map((url, index) => (
      <div
        key={index}
        className="h-screen w-full flex-shrink-0 snap-center flex items-center justify-center p-0"
      >
        <VideoCard
          src={url}
          className="max-w-full h-full aspect-auto rounded-none" 
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold opacity-0 hover:opacity-100 transition-opacity">
          #{index + 1}
        </div>
      </div>
    ))}
  </div>
);

const DesktopMarqueeGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl p-4">
    {columns.map((videos, index) => (
      <Marquee
        key={index}
        vertical
        reverse={index % 2 !== 0}
        pauseOnHover
        className="[--duration:20s]"
      >
        {videos.concat(videos).map((url, i) => (
          <VideoCard key={i} src={url} />
        ))}
      </Marquee>
    ))}
  </div>
);

export default function VideoMarqueeGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {isMobile ? <MobileSnapFeed /> : <DesktopMarqueeGrid />}

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h2 className="text-yellow-500 text-3xl md:text-6xl font-extrabold text-center drop-shadow-lg p-4">
          Create. Collaborate. Connect.
        </h2>
      </div>
    </div>
  );
}
