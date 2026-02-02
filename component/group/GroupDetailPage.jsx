"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGroupStore } from "@/store/useGroupStore";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  ChevronLeft,
  Lock,
  LockOpen,
  MessageSquare,
  FileText,
  Info,
  Share2,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import GroupPostInput from "./GroupPostInput";
import { getInitialLetter } from "@/utils/formatDate";
import GroupPostCard from "./GroupPostCard";
import JoinRequestManager from "./JoinRequestManager";
import { Badge } from "@/components/ui/badge";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner text="Loading group..." />
      </div>
    );
  }

  const isCreator = user?.id === group.adminId;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <Link href="/groups">
          <Button
            variant="ghost"
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 gap-2 px-3 -ml-3"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Groups</span>
          </Button>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          {/* Group Header */}
          <div className="p-6 sm:p-8 border-b border-zinc-100">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex justify-center sm:justify-start">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-zinc-100 shadow-lg">
                  {group.image ? (
                    <img
                      src={group.image}
                      alt={group.name}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-3xl">
                      {getInitialLetter(group.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* Group Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                        {group.name}
                      </h1>
                      <Badge
                        className={`${
                          group.joinType === "ANYONE_CAN_JOIN"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200"
                        } font-medium`}
                      >
                        {group.joinType === "ANYONE_CAN_JOIN" ? (
                          <>
                            <LockOpen className="h-3 w-3 mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-500 mb-3">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">
                        {group._count?.members ?? 0} Members
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
                      {group.description ||
                        "No description provided for this group."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center sm:justify-end gap-2">
                    {isCreator && <JoinRequestManager groupId={group.id} />}
                    {isCreator && (
                      <Link href={`/groups/${groupId}/settings`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl border-zinc-200 hover:bg-zinc-50"
                        >
                          <Settings className="h-5 w-5 text-zinc-600" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-zinc-100 bg-zinc-50/50">
            <div className="py-4 px-6 text-center">
              <p className="text-2xl font-bold text-green-600">
                {group._count?.members ?? 0}
              </p>
              <p className="text-xs text-zinc-500 font-medium">Members</p>
            </div>
            <div className="py-4 px-6 text-center">
              <p className="text-2xl font-bold text-green-600">{posts.length}</p>
              <p className="text-xs text-zinc-500 font-medium">Posts</p>
            </div>
            <div className="py-4 px-6 text-center">
              <p className="text-2xl font-bold text-green-600">
                {group.joinType === "ANYONE_CAN_JOIN" ? "Open" : "Invite"}
              </p>
              <p className="text-xs text-zinc-500 font-medium">Join Type</p>
            </div>
          </div>
        </div>

        {/* Post Input */}
        <div className="mt-6">
          <GroupPostInput groupId={groupId} />
        </div>

        {/* Posts Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800">Group Posts</h2>
            {posts.length > 0 && (
              <span className="text-sm text-zinc-500 ml-1">
                ({posts.length})
              </span>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 py-16 px-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-700 mb-2">
                  No posts yet
                </h3>
                <p className="text-zinc-500 max-w-sm">
                  Be the first to share something with the group! Start a
                  conversation or share an update above.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {groupPosts[groupId]?.map((post) => (
                <GroupPostCard key={post.id} post={post} groupId={groupId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
