"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Trash2,
  MoreVertical,
  Linkedin,
  Instagram,
  X,
  Share,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { VideoPlayer } from "./VideoPlayer";
import { CommentSection } from "./CommentSection";
import { formatTimeAgo } from "@/utils/formatDate";
import SharePostDialog from "../SharePostDialog";

const cleanDescription = (text) => text.replace(/#\w+/g, "").trim();
const isVideo = (url) =>
  [".mp4", ".webm", ".ogg", ".mov", ".avi"].some((ext) =>
    url.toLowerCase().includes(ext)
  );

const getCategoryLabel = (category) => {
  switch (category?.toUpperCase()) {
    case "COLLABORATION":
      return "Seeking Collab";
    case "OPPORTUNITY":
      return "Job/Gig Post";
    case "SHOWCASE":
      return "Projects";
    default:
      return "General Post";
  }
};

const MyPeerFeedSection = ({ activeFilter }) => {
  const {
    posts,
    fetchPostsForMyPeers,
    loading,
    loadingMore,
    hasMore,
    deletePost,
    toggleLike,
  } = useFeedStore();
  const { user: currentUser } = useAuthStore();
  const [openComments, setOpenComments] = useState({});

  const observerRef = useRef(null);

  // Initial fetch
  useEffect(() => {
    fetchPostsForMyPeers(false);
  }, [fetchPostsForMyPeers]);

  // Infinite scroll observer
  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore || loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPostsForMyPeers(true); // load more
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchPostsForMyPeers]
  );

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleShare = async (platform, post) => {
    const shareUrl = `${window.location.origin}/posts/${post.id}`;
    const shareText = `Check out this post by ${
      post.user?.username
    }: ${cleanDescription(post.description)}`;

    if (navigator.share) {
      // Use Web Share API for a native share dialog
      try {
        await navigator.share({
          title: "Share Post",
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
      return;
    }

    // Fallback for browsers that do not support Web Share API
    let url;
    switch (platform) {
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent("New Post")}&summary=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "x":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        break;
      case "instagram":
        // Instagram doesn't have a public share API for feed posts.
        // We can't programmatically share to feed, so we'll just copy to clipboard.
        navigator.clipboard
          .writeText(shareText + " " + shareUrl)
          .then(() =>
            alert(
              "Copied to clipboard. You can now paste it into your Instagram story or message!"
            )
          )
          .catch((err) => console.error("Failed to copy text: ", err));
        return;
      default:
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  if (loading && !posts.length) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 mt-1"></div>
              </div>
            </div>
            <div className="mt-3 h-20 bg-gray-200 rounded"></div>
            <div className="mt-4 flex space-x-2">
              <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!filteredPosts.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No posts available. Your peers haven’t posted yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post, idx) => {
        const isLastPost = idx === filteredPosts.length - 1;
        return (
          <Card
            key={post.id}
            ref={isLastPost ? lastPostRef : null}
            className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-blue-200">
                    <AvatarImage
                      src={post.user?.image}
                      alt={post.user?.username}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-600 text-white text-sm">
                      {post.user?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-gray-800">
                        {post.user?.username || "Unknown User"}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                      >
                        {getCategoryLabel(post.category)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 text-blue-500" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {/* Delete Button */}
                {currentUser?.id === post.user?.id && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-blue-50"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Post
                      </Button>
                    </PopoverContent>
                  </Popover>
                )}
              </div>

              {/* Post Content */}
              {post.description && (
                <p className="text-sm text-gray-800 leading-relaxed mb-3">
                  {cleanDescription(post.description)}
                </p>
              )}

              {/* Post Media */}
              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="mb-4">
                  {post.mediaUrls.length > 1 ? (
                    <ImageCarousel
                      images={post.mediaUrls}
                      altPrefix="Post content"
                    />
                  ) : isVideo(post.mediaUrls[0]) ? (
                    <VideoPlayer src={post.mediaUrls[0]} />
                  ) : (
                    <img
                      src={post.mediaUrls[0]}
                      alt="Post content"
                      className="w-full h-auto max-h-96 object-contain rounded-lg border border-gray-200"
                      loading="lazy"
                    />
                  )}
                </div>
              )}

              {/* Hashtags */}
              {post.hashtags?.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.hashtags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        post.likedByMe ? "text-red-500 fill-red-500" : ""
                      }`}
                    />
                    <span className="text-xs">{post?.likesCount || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                      {post.comments?.length || 0}
                    </span>
                  </Button>
                  <SharePostDialog postId={post.id}/>
                </div>
              </div>

              {openComments[post.id] && (
                <CommentSection comments={post.comments} postId={post.id} />
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Loader at the bottom */}
      {loadingMore && (
        <p className="text-center text-gray-500 py-4">Loading more posts...</p>
      )}
    </div>
  );
};

export default MyPeerFeedSection;
