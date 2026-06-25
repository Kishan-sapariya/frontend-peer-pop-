"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import { useConnectionStore } from "@/store/useConnectionStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Loader2, UserPlus, Check } from "lucide-react";
import {
  capitalizeInitials,
  getCompletionCateogryStyle,
} from "@/utils/formatDate";
import Link from "next/link";

const SuggestedUserSkeleton = () => (
  <div className="p-4 space-y-3 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
      <div className="flex flex-col space-y-2 flex-grow">
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="h-10 w-full bg-gray-200 rounded-md"></div>
  </div>
);

const SuggestedUsers = () => {
  const { suggestedUsers, getSuggestedUsers, loading } = useFeedStore();
  const { sendConnectionRequest } = useConnectionStore();
  const [sendingRequests, setSendingRequests] = useState({});
  const [sentRequests, setSentRequests] = useState({});

  useEffect(() => {
    getSuggestedUsers();
  }, [getSuggestedUsers]);

  const handleSendRequest = useCallback(
    async (userId) => {
      if (sentRequests[userId]) return;

      try {
        setSendingRequests((prev) => ({ ...prev, [userId]: true }));

        await sendConnectionRequest(userId);

        setSentRequests((prev) => ({ ...prev, [userId]: true }));
      } catch (error) {
        console.error("Failed to send connection request:", error);
      } finally {
        setSendingRequests((prev) => ({ ...prev, [userId]: false }));
      }
    },
    [sendConnectionRequest, sentRequests]
  );

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto space-y-3">
        <h2 className="text-xl font-bold text-gray-900 px-2">
          Suggested Peers
        </h2>
        <Card className="p-0 border-none shadow-lg divide-y divide-gray-100">
          {[...Array(4)].map((_, index) => (
            <SuggestedUserSkeleton key={index} />
          ))}
        </Card>
      </div>
    );
  }

  if (!Array.isArray(suggestedUsers) || suggestedUsers.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto space-y-3">
        <h2 className="text-xl font-bold text-gray-900 px-2">
          Suggested Peers
        </h2>
        <Card className="p-4 border-none shadow-lg">
          <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
            <Users className="w-8 h-8 mb-2" />
            <p className="font-medium">No suggested peers found.</p>
            <p className="text-sm">Check back later for new connections.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-bold text-gray-900 px-2">Suggested Peers</h2>

      <Card className="p-0 border-none shadow-lg divide-y divide-gray-100">
        {suggestedUsers.map((user) => {
          const completionStyle = getCompletionCateogryStyle(
            user.completion?.category
          );
          const isSending = sendingRequests[user.id];
          const isSent = sentRequests[user.id];

          const profileLink = user.isFounder
            ? `/profile/${user.username}/founder`
            : user.creatorType
            ? `/profile/${user.username}/${user.creatorType.toLowerCase()}`
            : `/profile/business/${user.username}`;

          return (
            <div
              key={user.id}
              className="p-4 space-y-3 transition duration-150 ease-in-out"
            >
              <Link
                href={profileLink}
                className="flex items-start gap-3 group"
              >
                <Avatar className="w-12 h-12 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  {user.image ? (
                    <AvatarImage
                      src={user.image}
                      alt={user.username}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-yellow-500 text-white font-bold text-lg">
                      {user.username ? user.username[0].toUpperCase() : ""}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex flex-col pt-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-yellow-600 transition-colors duration-200">
                      {capitalizeInitials(user.username)}
                    </p>
                    {user.completion?.category && (
                      <Badge
                        className={`${completionStyle.className} px-2 py-0.5 text-xs font-medium shrink-0`}
                      >
                        {user.completion.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {user.isFounder
                      ? "Founder"
                      : user.creatorType
                      ? capitalizeInitials(user.creatorType.toLowerCase())
                      : "Business Account"}
                  </p>
                </div>
              </Link>

              <Button
                size="lg"
                className={`w-full font-semibold shadow-md rounded-lg h-10 ${
                  isSent
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-default border border-gray-300"
                    : "bg-black hover:bg-gray-800 text-white"
                }`}
                onClick={() => handleSendRequest(user.id)}
                disabled={isSending || isSent}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default SuggestedUsers;
