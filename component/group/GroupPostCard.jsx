"use client";

import React, { useState } from "react";
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
  MoreHorizontal,
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
  const { toggleGroupPostLike, deleteGroupPost } = useGroupStore();

  const [openComments, setOpenComments] = useState(false);

  const hasLiked = post.likedByMe || false;
  const likesCount = post.likesCount ?? post.likes?.length ?? 0;
  const commentsCount = post.commentsCount ?? post.comments?.length ?? 0;

  const toggleComments = () => setOpenComments((v) => !v);

  const handleLike = () => {
    toggleGroupPostLike(groupId, post.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/profile/${post.user?.username}`}
            className="flex items-center gap-3 group"
          >
            <Avatar className="w-11 h-11 ring-2 ring-zinc-100">
              <AvatarImage
                src={post.user?.image}
                alt={post.user?.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold text-base">
                {post.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-zinc-900 group-hover:text-green-600 transition-colors">
                {post.user?.username || "Unknown User"}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                <Clock className="w-3 h-3" />
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
                  aria-label="More options"
                  className="w-8 h-8 rounded-full hover:bg-zinc-100 text-zinc-400"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-36 p-1.5 rounded-xl shadow-lg" align="end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  onClick={() => deleteGroupPost(groupId, post.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Content */}
        {post.description && (
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">
            {cleanDescription(post.description)}
          </p>
        )}

        {/* Media */}
        {post.mediaUrls?.length > 0 && (
          <div className="mb-4 rounded-xl overflow-hidden border border-zinc-100">
            {post.mediaUrls.length > 1 ? (
              <ImageCarousel images={post.mediaUrls} altPrefix="Post content" />
            ) : isVideo(post.mediaUrls[0]) ? (
              <VideoPlayer src={post.mediaUrls[0]} />
            ) : (
              <img
                src={post.mediaUrls[0]}
                alt="Post content"
                loading="lazy"
                className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
              />
            )}
          </div>
        )}

        {/* Hashtags */}
        {post.hashtags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs font-medium text-green-600 bg-green-50 border-green-200 hover:bg-green-100 cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 pt-3 border-t border-zinc-100">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-lg px-3 py-2 h-auto gap-1.5 transition-colors ${
              hasLiked
                ? "text-red-500 hover:bg-red-50"
                : "text-zinc-500 hover:text-red-500 hover:bg-red-50"
            }`}
            onClick={handleLike}
          >
            <Heart
              className={`w-[18px] h-[18px] ${hasLiked ? "fill-red-500" : ""}`}
            />
            <span className="text-sm font-medium">{likesCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`rounded-lg px-3 py-2 h-auto gap-1.5 transition-colors ${
              openComments
                ? "text-green-600 hover:bg-green-50"
                : "text-zinc-500 hover:text-green-600 hover:bg-green-50"
            }`}
            onClick={toggleComments}
          >
            <MessageCircle
              className={`w-[18px] h-[18px] ${openComments ? "fill-green-100" : ""}`}
            />
            <span className="text-sm font-medium">{commentsCount}</span>
          </Button>
        </div>

        {/* Comments Section */}
        {openComments && (
          <div className="mt-4 pt-4 border-t border-zinc-100">
            <GroupCommentSection
              comments={post.comments}
              postId={post.id}
              groupId={groupId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupPostCard;
