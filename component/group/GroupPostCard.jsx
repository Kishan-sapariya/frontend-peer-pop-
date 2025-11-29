"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Heart,
  MessageCircle,
  Clock,
  Trash2,
  MoreVertical,
} from "lucide-react";

import { ImageCarousel } from "../feeds/ImageCarousel";
import { VideoPlayer } from "../feeds/VideoPlayer";

import { formatTimeAgo } from "@/utils/formatDate";
import { useAuthStore } from "@/store/useAuthStore";
import { useGroupStore } from "@/store/useGroupStore";
import Link from "next/link";
import GroupCommentSection from "./GroupCommentSection";
import { Badge } from "@/components/ui/badge"; 

const cleanDescription = (txt) => txt?.replace(/#\w+/g, "").trim();

const isVideo = (url) =>
  [".mp4", ".webm", ".ogg", ".mov", ".avi"].some((ext) =>
    url?.toLowerCase().includes(ext)
  );

const GroupPostCard = ({ post, groupId }) => {
  const { user: currentUser } = useAuthStore();
  const { toggleGroupPostLike, deleteGroupPost } =
    useGroupStore();

  const [openComments, setOpenComments] = useState(false);

  const hasLiked = post.likedByMe || false;
  const likesCount = post.likesCount ?? post.likes?.length ?? 0;
  const commentsCount = post.commentsCount ?? post.comments?.length ?? 0;

  const toggleComments = () => setOpenComments((v) => !v);

  const handleLike = () => {
    toggleGroupPostLike(groupId, post.id);
  };

  return (
    <Card className="rounded-2xl shadow-md bg-white/90 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <CardContent className="py-3 px-4 md:px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/profile/${post.user?.username}`}
            passHref
            className="flex items-center space-x-3 md:space-x-4 cursor-pointer"
          >
            <Avatar className="w-12 h-12 md:w-14 md:h-14 p-0.5">
              <AvatarImage
                src={post.user?.image}
                alt={post.user?.username}
                className="object-cover rounded-full"
              />
              <AvatarFallback className="bg-green-600 text-white font-semibold text-xl">
                {post.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-900">
                {post.user?.username || "Unknown User"}
              </h3>
              <div className="flex items-center space-x-1 text-xs text-gray-500 font-medium mt-1">
                <Clock className="w-3 h-3 text-blue-800" />
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </Link>

          {currentUser?.id === post.user?.id && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-40 p-1 rounded-xl">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => deleteGroupPost(groupId, post.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Post
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {post.description && (
          <p className="text-sm lg:text-base text-gray-800 leading-relaxed mb-4">
            {cleanDescription(post.description)}
          </p>
        )}

        {post.mediaUrls?.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
            {post.mediaUrls.length > 1 ? (
              <ImageCarousel images={post.mediaUrls} altPrefix="Post content" />
            ) : isVideo(post.mediaUrls[0]) ? (
              <VideoPlayer src={post.mediaUrls[0]} />
            ) : (
              <img
                src={post.mediaUrls[0]}
                alt="Post content"
                loading="lazy"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            )}
          </div>
        )}

        {post.hashtags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs md:text-sm font-medium border-black-300 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-start pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-2 py-1.5 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
              onClick={handleLike}
            >
              <Heart
                className={`w-4 h-4 mr-1 ${
                  hasLiked ? "text-red-500 fill-red-500" : "text-gray-500"
                }`}
              />
              <span className="text-xs font-semibold">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-2 py-1.5 hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors"
              onClick={toggleComments}
            >
              <MessageCircle className="w-4 h-4 mr-1 text-gray-500" />
              <span className="text-xs font-semibold">{commentsCount}</span>
            </Button>
          </div>
        </div>

        {openComments && (
          <GroupCommentSection
            comments={post.comments}
            postId={post.id}
            groupId={groupId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GroupPostCard;
