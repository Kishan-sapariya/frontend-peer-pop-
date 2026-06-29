"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Plus,
  MoreVertical,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils/formatDate";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { Film } from "lucide-react";
import EmptyState from "@/component/profile/EmptyState";

export default function RecentContent({ isOwnProfile }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { profile, deleteRecentContent } = useInfluencerStore();

  const handleDelete = (contentId) => {
    if (contentId) {
      deleteRecentContent(contentId);
    }
  };

  const recentContents = profile?.data?.recentContent || [];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recentContents.length > 0 ? (
          recentContents.map((content) => (
            <Card
              key={content.id}
              className="overflow-hidden pt-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white"
            >
              <CardContent className="p-0 relative">
                {content.category && (
                  <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-br-lg z-10">
                    {content.category}
                  </div>
                )}

                {content.contentType === "VIDEO" && content.mediaUrls[0] && (
                  <VideoPlayer src={content.mediaUrls[0]} />
                )}

                {content.contentType === "SINGLE_IMAGE" &&
                  content.mediaUrls[0] && (
                    <img
                      src={content.mediaUrls[0]}
                      alt={content.title || "Content image"}
                      loading="lazy"
                      className="w-full h-56 object-contain bg-gray-200 rounded-t-lg"
                    />
                  )}

                {content.contentType === "MULTIPLE_IMAGES" &&
                  content.mediaUrls &&
                  content.mediaUrls.length > 0 && (
                    <ImageCarousel
                      images={content.mediaUrls}
                      altPrefix={content.title || "Content image"}
                    />
                  )}

                {isOwnProfile && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full p-1 shadow-sm"
                        aria-label="Content options"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-700" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-30 px-2 py-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                        onClick={() => handleDelete(content.id)}
                      >
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                )}
              </CardContent>

              <div className="px-4 py-2 space-y-2">
                <h3 className="flex justify-between items-center font-semibold text-xl text-gray-900 leading-tight">
                  {content.title}
                  {content.createdAt && (
                    <span className="text-sm text-gray-500">
                      {formatDate(content.createdAt)}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {content.description || "No description available."}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState
            icon={Film}
            title="No recent content yet"
            description="Share your latest posts to showcase your work here."
            className="sm:col-span-2 w-full"
          />
        )}
      </div>
    </div>
  );
}

function VideoPlayer({ src, duration }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (!showVideo) {
        setShowVideo(true);
        setTimeout(() => {
          videoRef.current
            .play()
            .catch((e) => console.error("Video play error:", e));
        }, 50);
        setIsPlaying(true);
      } else if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .catch((e) => console.error("Video play error:", e));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
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
    const handleEnded = () => {
      setIsPlaying(false);
      setShowVideo(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="relative w-full h-56 rounded-t-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        className="w-full h-full object-cover"
        preload="metadata"
        onClick={togglePlayPause}
      >
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 z-5 transition-opacity duration-300"
          onClick={togglePlayPause}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
            aria-label="Play video"
          >
            <Play className="w-10 h-10 fill-current" />
          </Button>
        </div>
      )}

      {/* Duration Overlay (positioned bottom-right) */}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded z-10">
          {duration}
        </div>
      )}

      {/* Mute/Unmute Button (positioned bottom-left) */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-2 left-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 z-10"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
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

function ImageCarousel({ images, altPrefix }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showPrevButton = images.length > 1 && currentIndex > 0;
  const showNextButton = images.length > 1 && currentIndex < images.length - 1;

  return (
    <div className="relative w-full h-56 rounded-t-lg overflow-hidden flex items-center justify-center">
      <img
        src={images[currentIndex]}
        alt={`${altPrefix} - Image ${currentIndex + 1}`}
        loading="lazy"
        className="w-full h-full object-contain bg-gray-200 transition-opacity duration-300"
      />

      {/* Left Navigation Button */}
      {showPrevButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {/* Right Navigation Button */}
      {showNextButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 z-10"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      {/* Image Counter (Optional, but useful for carousels) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
