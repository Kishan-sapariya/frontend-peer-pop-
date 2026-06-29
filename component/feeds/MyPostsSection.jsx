"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import PostCard from "./PostCard";
import { Loader2, PenSquare } from "lucide-react";
import PostSkeleton from "./PostSkeleton";
import EmptyState from "@/component/profile/EmptyState";

const MyPostsSection = ({ profileId }) => {
  const { posts, fetchMyPosts, loading, loadingMore, hasMore } = useFeedStore();
  const observerRef = useRef(null);

  useEffect(() => {
    fetchMyPosts(profileId, false);
  }, [fetchMyPosts, profileId]);

  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore || loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMyPosts(profileId, true);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchMyPosts, profileId]
  );

  if (loading && !posts.length) {
    return <PostSkeleton />;
  }

  if (!posts.length) {
    return (
      <EmptyState
        className="mt-4"
        icon={PenSquare}
        title="No posts yet"
        description="Share your work, ideas, or updates — your first post will show up here."
      />
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1;
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

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 py-4 font-medium">
          You’ve reached the end 🎉
        </p>
      )}
    </div>
  );
};

export default MyPostsSection;
