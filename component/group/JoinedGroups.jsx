"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useGroupStore } from "@/store/useGroupStore";
import { getInitialLetter } from "@/utils/formatDate";
import { Lock, LockOpen, Users, LogOut, Crown } from "lucide-react"; // Added Crown icon
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge"; // Import Badge component

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
    <section className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <h2 className="text-2xl sm:text-3xl text-zinc-900 font-extrabold tracking-tight">
          Your Groups{" "}
          <span className="text-green-600">({joinedGroups.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {joinedGroups.map((g) => {
          const isOwner = user?.id === g.adminId;

          return (
            <Card
              key={g.id}
              className="relative p-6 rounded-2xl border-2 border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 shadow-md border-2 border-green-200">
                    {g.image ? (
                      <img
                        src={g.image}
                        alt={g.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="text-xl font-bold bg-green-600 text-white">
                        {getInitialLetter(g.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col">
                    <div className="mb-1">
                      <h3 className="font-extrabold text-xl text-zinc-900 truncate max-w-[200px] sm:max-w-[250px] mb-2">
                        {g.name}
                      </h3>
                      {isOwner && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 text-xs flex items-center gap-1"
                        >
                          <Crown className="h-3 w-3 fill-purple-700" />
                          Owner
                        </Badge>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit text-green-800 bg-green-100 border border-green-200">
                      {g.joinType === "ANYONE_CAN_JOIN" ? (
                        <>
                          <LockOpen className="h-3 w-3" />
                          <span>Public</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3" />
                          <span>Private</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-zinc-600 line-clamp-3 min-h-[2rem]">
                  {g.description || "No description"}
                </p>

                <div className="flex items-center text-sm font-semibold text-zinc-700 gap-2 pt-2 border-t border-zinc-100">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>{g._count?.members ?? 0} Members</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => handleViewGroup(g.id)}
                  className="flex-grow bg-green-600 hover:bg-green-700 text-white font-bold h-10"
                  disabled={isLoading}
                >
                  View Group
                </Button>

                {!isOwner && (
                  <Button
                    onClick={() => handleLeaveGroup(g.id)}
                    variant="outline"
                    className="bg-white border-red-400 text-red-600 font-bold h-10 w-10 p-0"
                    disabled={isLoading}
                    title="Leave Group"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default JoinedGroups;
