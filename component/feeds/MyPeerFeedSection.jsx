"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import PostCard from "./PostCard"; 
import { Loader2 } from "lucide-react";
import PostSkeleton from "./PostSkeleton";

const MyPeerFeedSection = ({ activeFilter }) => {
  const { posts, fetchPostsForMyPeers, loading, loadingMore, hasMore } =
    useFeedStore();

  const observerRef = useRef(null);

  useEffect(() => {
    fetchPostsForMyPeers(false);
  }, [fetchPostsForMyPeers]);

  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore || loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPostsForMyPeers(true);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchPostsForMyPeers]
  );

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  if (loading && !posts.length) {
    return <PostSkeleton />;
  }

  if (!filteredPosts.length) {
    return (
      <p className="text-center text-gray-500 font-medium mt-10">
        No posts available. Your peers haven’t posted yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post, idx) => {
        const isLastPost = idx === filteredPosts.length - 1;
        return (
          <div key={post.id} ref={isLastPost ? lastPostRef : null}>
            <PostCard post={post} />
          </div>
        );
      })}

      {hasMore && (
        <div className="flex justify-center p-6">
          {loadingMore && (
            <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
          )}
        </div>
      )}

      {!hasMore && filteredPosts.length > 0 && (
        <p className="text-center text-gray-500 py-4 font-medium">
          You’ve reached the end 🎉
        </p>
      )}
    </div>
  );
};

export default MyPeerFeedSection;
