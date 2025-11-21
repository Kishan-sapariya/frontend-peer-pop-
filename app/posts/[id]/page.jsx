"use client";

import PostCard from "@/component/feeds/PostCard";
import SuggestedUsers from "@/component/feeds/SuggestedUser";
import UserDetailsCard from "@/component/feeds/UserDetailsCard";
import LoadingSpinner from "@/component/LoadingSpinner";
import { useFeedStore } from "@/store/useFeedStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { fetchPostById, singlePost } = useFeedStore();
  const postId = useParams();

  useEffect(() => {
    if (postId) {
      fetchPostById(postId.id);
    } else {
      toast.error("Post id missing");
    }
  }, [fetchPostById,singlePost]);

  if (!singlePost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner text="Loading post..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:sticky lg:top-25 lg:self-start">
            <UserDetailsCard />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <PostCard post={singlePost} />
          </div>
          <div className="lg:col-span-1 space-y-4 ">
            <SuggestedUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
