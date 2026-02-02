"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useGroupStore } from "@/store/useGroupStore";
import { getInitialLetter } from "@/utils/formatDate";
import {
  Lock,
  LockOpen,
  Users,
  LogOut,
  Crown,
  UsersRound,
  Search,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const JoinedGroups = () => {
  const { groups, joinedGroupIds, fetchJoinedGroup, isLoading, leaveGroup } =
    useGroupStore();
  const { user } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    fetchJoinedGroup();
  }, [fetchJoinedGroup]);

  const joinedGroups = joinedGroupIds.map((id) => groups[id]).filter(Boolean);

  const handleViewGroup = (groupId) => {
    router.push(`/groups/${groupId}`);
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await leaveGroup(groupId);
      toast.success("Group left");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error leaving group");
    }
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 pb-4">
        <UsersRound className="text-green-600 h-7 w-7 sm:h-8 sm:w-8" />
        <h2 className="text-2xl sm:text-3xl text-zinc-900 font-extrabold tracking-tight">
          Your Groups
          {joinedGroups.length > 0 && (
            <span className="text-green-600 ml-2">({joinedGroups.length})</span>
          )}
        </h2>
      </div>

      {joinedGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center">
              <Users className="h-12 w-12 text-green-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="h-5 w-5 text-white" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-800 mb-2 text-center">
            No groups yet
          </h3>
          <p className="text-zinc-500 text-center max-w-sm mb-6 leading-relaxed">
            Join a group to connect with like-minded people, share ideas, and
            collaborate on exciting projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 font-semibold px-6"
              onClick={() => {
                const tab = document.querySelector(
                  '[data-state="inactive"][value="suggested"]'
                );
                if (tab) tab.click();
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Suggested Groups
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedGroups.map((g) => {
            const isOwner = user?.id === g.adminId;

            return (
              <Card
                key={g.id}
                className="relative overflow-hidden bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 group"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-14 w-14 ring-2 ring-green-100 ring-offset-2">
                      {g.image ? (
                        <img
                          src={g.image}
                          alt={g.name}
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                          {getInitialLetter(g.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-zinc-900 truncate mb-2">
                        {g.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {isOwner && (
                          <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200 font-semibold text-xs px-2 py-0.5">
                            <Crown className="h-3 w-3 mr-1 fill-amber-500" />
                            Owner
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`font-medium text-xs px-2 py-0.5 ${
                            g.joinType === "ANYONE_CAN_JOIN"
                              ? "text-green-700 border-green-200 bg-green-50"
                              : "text-zinc-600 border-zinc-200 bg-zinc-50"
                          }`}
                        >
                          {g.joinType === "ANYONE_CAN_JOIN" ? (
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
                    </div>
                  </div>

                  <p className="text-sm text-zinc-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {g.description || "No description available"}
                  </p>

                  <div className="flex items-center text-sm text-zinc-600 gap-2 py-3 border-t border-zinc-100">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="font-medium">
                      {g._count?.members ?? 0} Members
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleViewGroup(g.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold h-10 rounded-xl"
                      disabled={isLoading}
                    >
                      View Group
                    </Button>

                    {!isOwner && (
                      <Button
                        onClick={() => handleLeaveGroup(g.id)}
                        variant="outline"
                        className="border-zinc-200 hover:border-red-300 hover:bg-red-50 text-zinc-500 hover:text-red-600 h-10 w-10 p-0 rounded-xl transition-colors"
                        disabled={isLoading}
                        title="Leave Group"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default JoinedGroups;
