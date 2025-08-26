"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current
          .play()
          .catch((e) => console.error("Video play error:", e));
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevents the video's play/pause from toggling
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Initial check for mute state
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      className="relative w-full h-auto max-h-96 aspect-video rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlayPause}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        className="w-full h-full object-cover transition-filter duration-300"
        preload="metadata"
        loop
      >
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className={`w-12 h-12 rounded-full bg-black/50 text-white transition-opacity duration-300 ${
            isPlaying && !isHovering ? "opacity-0" : "opacity-100"
          } pointer-events-auto`}
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current" />
          )}
        </Button>
      </div>

      {/* Mute/Unmute Button (positioned bottom-right) */}
      <Button
        size="icon"
        className={`absolute bottom-2 right-2 text-white rounded-full p-1 z-10 transition-opacity duration-300 ${
          isHovering || !isMuted ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleMute}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
