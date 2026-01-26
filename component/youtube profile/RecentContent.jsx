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

// Shadcn UI components for Popover
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils/formatDate";
import { useYoutubeStore } from "@/store/useYoutubeStore";
import { VideoPlayer } from "../feeds/VideoPlayer";
import { ImageCarousel } from "../feeds/ImageCarousel";

export default function RecentContent({ contents = [], isOwnProfile }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { deleteRecentContentById } = useYoutubeStore();

  const handleAddContent = () => {
    if (user.username && user.creatorType) {
      router.push(
        `/profile/${
          user.username
        }/${user.creatorType.toLowerCase()}/upload-recent-content`
      );
    }
  };

  const handleDelete = (contentId) => {
    if (contentId) {
      deleteRecentContentById(contentId);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Recent Content
        </h2>
        {isOwnProfile && (
          <Button
            onClick={handleAddContent}
            className="bg-black text-white shadow-md "
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Content
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contents.length > 0 ? (
          contents.map((content) => (
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
                  <VideoPlayer
                    src={content.mediaUrls[0]}
                    duration={content.duration}
                  />
                )}

                {content.contentType === "SINGLE_IMAGE" &&
                  content.mediaUrls[0] && (
                    <img
                      src={content.mediaUrls[0]}
                      alt={content.title || "Content image"}
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
                        <Trash2 />
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
          <div className="sm:col-span-2 w-full text-center text-gray-500 p-10 border border-dashed border-gray-300 rounded-md">
            <p className="text-lg font-medium mb-2">No Recent Content yet</p>
            <p className="text-sm">
              Add your Recent Content to showcase your creative work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


