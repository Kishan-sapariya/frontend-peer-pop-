"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import PostCard from "./PostCard";
import { Loader2 } from "lucide-react";
import PostSkeleton from "./PostSkeleton";

const FeedsPostSections = ({ activeFilter }) => {
  const { posts, fetchPosts, hasMore, loadingMore, loading } = useFeedStore();
  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, fetchPosts]
  );

  useEffect(() => {
    fetchPosts(false);
  }, [fetchPosts]);

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  if (loading) {
    return <PostSkeleton />;
  }

  if (!filteredPosts.length) {
    return (
      <p className="text-center text-gray-500 font-medium mt-10">
        No posts available yet. Be the first to post!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post, index) => {
        const isLastPost = index === filteredPosts.length - 1;
        return (
          <div key={post.id} ref={isLastPost ? lastPostElementRef : null}>
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

export default FeedsPostSections;
