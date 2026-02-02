"use client";

import React, { useEffect, useState } from "react";
import {
  Lock,
  LockOpen,
  Sparkles,
  Users,
  ArrowRight,
  Loader2,
  Compass,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGroupStore } from "@/store/useGroupStore";
import { getInitialLetter } from "@/utils/formatDate";
import toast from "react-hot-toast";

const SuggestedGroups = () => {
  const { groups, suggestedGroupIds, fetchSuggestedGroups, joinGroup } =
    useGroupStore();

  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    fetchSuggestedGroups();
  }, [fetchSuggestedGroups]);

  const handleJoinGroup = async (groupId) => {
    setJoiningId(groupId);

    const result = await joinGroup(groupId);

    setJoiningId(null);

    if (result.status === "JOINED") {
      toast.success("You joined the group!");
    } else if (result.status === "PENDING") {
      toast.success("Join request sent!");
    } else if (result.status === "REJECTED") {
      toast.error("Your previous request was rejected.");
    } else {
      toast.error(result.error || "Failed to join group.");
    }
  };

  const getJoinState = (g) => {
    if (g.members?.length > 0) return "JOINED";
    if (g.joinRequests?.length > 0) return g.joinRequests[0].status;
    return "NONE";
  };

  const suggestedGroups = suggestedGroupIds
    .map((id) => groups[id])
    .filter(Boolean);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 pb-4">
        <Sparkles className="text-yellow-500 h-7 w-7 sm:h-8 sm:w-8" />
        <h2 className="text-2xl sm:text-3xl text-zinc-900 font-extrabold tracking-tight">
          Suggested Groups
          {suggestedGroups.length > 0 && (
            <span className="text-yellow-600 ml-2">
              ({suggestedGroups.length})
            </span>
          )}
        </h2>
      </div>

      {suggestedGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-50 rounded-full flex items-center justify-center">
              <Compass className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-800 mb-2 text-center">
            No suggestions right now
          </h3>
          <p className="text-zinc-500 text-center max-w-sm mb-6 leading-relaxed">
            We're working on finding the perfect groups for you. Check back soon
            or create your own group to get started!
          </p>

          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6">
            <Plus className="h-4 w-4 mr-2" />
            Create a Group
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedGroups.map((g) => {
            const state = getJoinState(g);
            const loading = joiningId === g.id;

            let buttonText = "";
            let disabled = false;
            let buttonVariant = "default";

            switch (state) {
              case "JOINED":
                buttonText = "Joined";
                disabled = true;
                buttonVariant = "success";
                break;
              case "PENDING":
                buttonText = "Request Pending";
                disabled = true;
                buttonVariant = "pending";
                break;
              case "REJECTED":
                buttonText = "Request Again";
                break;
              default:
                buttonText =
                  g.joinType === "ANYONE_CAN_JOIN"
                    ? "Join Group"
                    : "Request to Join";
            }

            return (
              <Card
                key={g.id}
                className="relative overflow-hidden bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all duration-300 group"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-14 w-14 ring-2 ring-yellow-100 ring-offset-2">
                      {g.image ? (
                        <img
                          src={g.image}
                          alt={g.name}
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-yellow-400 to-amber-500 text-white">
                          {getInitialLetter(g.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-zinc-900 truncate mb-2">
                        {g.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`font-medium text-xs px-2 py-0.5 ${
                          g.joinType === "ANYONE_CAN_JOIN"
                            ? "text-yellow-700 border-yellow-200 bg-yellow-50"
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

                  <p className="text-sm text-zinc-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {g.description || "No description available"}
                  </p>

                  <div className="flex items-center text-sm text-zinc-600 gap-2 py-3 border-t border-zinc-100">
                    <Users className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">
                      {g._count?.members ?? 0} Members
                    </span>
                  </div>

                  <Button
                    onClick={() => handleJoinGroup(g.id)}
                    disabled={disabled || loading}
                    className={`w-full font-semibold h-10 rounded-xl transition-all duration-200 ${
                      state === "JOINED"
                        ? "bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
                        : state === "PENDING"
                        ? "bg-zinc-100 text-zinc-500 hover:bg-zinc-100 cursor-default"
                        : "bg-yellow-500 text-black hover:bg-yellow-600"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {state === "JOINED" && (
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                        )}
                        {state === "PENDING" && (
                          <Clock className="h-4 w-4 mr-2" />
                        )}
                        {buttonText}
                        {state === "NONE" && (
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SuggestedGroups;
