"use client";

import React, { useEffect } from "react";
import {
  Lock,
  LockOpen,
  Sparkles,
  Users,
  ArrowRight,
  Loader2,
  Frown, 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "@/store/useGroupStore";
import { getInitialLetter } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const SuggestedGroups = () => {
  const {
    groups,
    suggestedGroupIds,
    fetchSuggestedGroups,
    joinGroup,
    isLoading,
  } = useGroupStore();
  const { groupId } = useParams();

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId);
      toast.success("Group joined successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to join group.");
    }
  };

  useEffect(() => {
    fetchSuggestedGroups();
  }, [fetchSuggestedGroups]);

  const suggestedGroups = suggestedGroupIds
    .map((id) => groups[id])
    .filter(Boolean);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <Sparkles className="text-yellow-500 h-7 w-7 sm:h-8 sm:w-8" />
        <h2 className="text-2xl sm:text-3xl text-zinc-900 font-extrabold tracking-tight">
          Suggested Groups
        </h2>
      </div>

      {suggestedGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-50 rounded-xl border border-zinc-200">
          <Frown className="h-10 w-10 text-zinc-400 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-700 mb-2">
            No Suggested Groups Available
          </h3>
          <p className="text-zinc-500 text-center max-w-md">
            It looks like we couldn't find any groups to suggest right now. Try
            checking back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedGroups.map((g) => (
            <Card
              key={g.id}
              className="relative p-6 rounded-2xl border-2 border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 shadow-md border-2 border-yellow-100">
                    {g.image ? (
                      <img
                        src={g.image}
                        alt={g.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="text-xl font-bold bg-yellow-500 text-zinc-900">
                        {getInitialLetter(g.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col">
                    <h3 className="font-extrabold text-xl text-zinc-900 truncate max-w-[200px]">
                      {g.name}
                    </h3>
                    <div
                      className="mt-1 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit 
                      text-yellow-800 bg-yellow-100 border border-yellow-200"
                    >
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

                <p className="text-sm text-zinc-600 line-clamp-3 mt-2 min-h-[4rem]">
                  {g.description || "No description provided"}
                </p>

                <div className="flex items-center text-sm font-semibold text-zinc-700 gap-2 border-t border-zinc-100 pt-4">
                  <Users className="h-4 w-4 text-yellow-500" />{" "}
                  <span>{g._count?.members ?? 0} Members</span>
                </div>
              </div>

              {/* JOIN BUTTON */}
              <div className="mt-6">
                <Button
                  onClick={() => handleJoinGroup(g.id)}
                  disabled={isLoading}
                  className={`group w-full bg-yellow-500 transition-colors text-black hover:bg-yellow-600 font-bold flex items-center justify-center gap-2 h-10 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Joining...
                    </div>
                  ) : g.joinType === "ANYONE_CAN_JOIN" ? (
                    "Join Group"
                  ) : (
                    "Request to join"
                  )}
                  <ArrowRight
                    className={`h-4 w-4 ml-1 transition-transform ${
                      isLoading ? "" : "group-hover:translate-x-1"
                    }`}
                  />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default SuggestedGroups;
