"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGroupStore } from "@/store/useGroupStore";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MoreVertical, Settings, ChevronLeft } from "lucide-react";
import Link from "next/link";
import GroupPostInput from "./GroupPostInput";
import { getInitialLetter } from "@/utils/formatDate";
import GroupPostCard from "./GroupPostCard";

const GroupDetailPage = () => {
  const params = useParams();
  const groupId = params.id;

  const { groups, fetchGroupById } = useGroupStore();
  const { groupPosts, fetchGroupPosts } = useGroupStore();

  const { user } = useAuthStore();

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId);
      fetchGroupPosts(groupId);
    }
  }, [groupId, fetchGroupById, fetchGroupPosts]);

  const group = groups[groupId];
  const posts = groupPosts[groupId] || [];

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Loading group..." />
      </div>
    );
  }

  const isCreator = user?.id === group.adminId;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/groups">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>

            <Avatar className="h-12 w-12 border-2 border-green-500 shadow-md">
              {group.image ? (
                <img
                  src={group.image}
                  alt={group.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-green-600 text-white font-bold">
                  {getInitialLetter(group.name)}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <h1 className="text-2xl font-extrabold text-zinc-900 truncate">
                {group.name}
              </h1>

              <span className="flex items-center text-sm text-zinc-600 gap-1">
                <Users className="h-4 w-4 text-green-600" />
                {group._count?.members ?? 0} Members
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isCreator && (
              <Link href={`/groups/${groupId}/settings`}>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5 text-green-600" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <GroupPostInput groupId={groupId} />

        {/* ABOUT SECTION */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-zinc-800 mb-2">
            About This Group
          </h3>

          <p className="text-zinc-600 italic">
            {group.description || "No description provided."}
          </p>
        </div>

        <h2 className="text-xl font-bold text-zinc-900 mb-4 border-b pb-2">
          Group Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center py-10 bg-white rounded-lg shadow-md text-zinc-500">
            No posts yet.
          </p>
        ) : (
          <div className="space-y-6">
            {groupPosts[groupId]?.map((post) => (
              <GroupPostCard key={post.id} post={post} groupId={groupId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetailPage;
