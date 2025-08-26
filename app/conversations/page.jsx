"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversationStore } from "../../store/useConversationStore"; // Corrected import path
import { useAuthStore } from "../../store/useAuthStore"; // Corrected import path
import { useRouter } from "next/navigation";

export default function ConversationsPage() {
  const { user } = useAuthStore();
  const { conversations, getAllConversation, loading, error } =
    useConversationStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  const router = useRouter();

  // A helper function to find the other participant in a conversation
  const getOtherUser = (conversation, currentUserId) => {
    if (!conversation || !conversation.participants) return null;
    return conversation.participants.find((p) => p.userId !== currentUserId)
      ?.user;
  };

  const filteredConversations =
    conversations?.filter((c) => {
      if (!c?.conversation?.participants) {
        return null;
      }
      const otherUser = getOtherUser(c?.conversation, user?.id);
      if (!searchTerm) return true;
      return (
        otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  const handleConversationClick = (conversationId) => {
    router.push(`/conversations/${conversationId}`);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getLastMessagePreview = (message) => {
    if (!message?.content) return "No messages yet";
    return message.content.length > 50
      ? message.content.substring(0, 50) + "..."
      : message.content;
  };

  // Loading skeleton
  if (loading && (!conversations || conversations.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg flex gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Messages
          </h1>
          <p className="text-gray-600 text-sm">
            {conversations?.length || 0} conversation
            {(conversations?.length || 0) !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error */}
        {error && (
          <Card className="mb-4">
            <CardContent className="p-4 text-red-600">{error}</CardContent>
          </Card>
        )}

        {/* List */}
        <div className="space-y-2">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {searchTerm
                    ? "No conversations found"
                    : "No conversations yet"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {searchTerm
                    ? `No conversations match "${searchTerm}"`
                    : "Start a conversation to see it here"}
                </p>
                {!searchTerm && (
                  <Button onClick={() => router.push("/connections")}>
                    Browse Connections
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((c) => {
              const otherUser = getOtherUser(c.conversation, user?.id);
              const isUnread = c.unreadCount > 0;
              const isLastMessageFromOther =
                c.lastMessage?.senderId !== user?.id;

              if (!otherUser) return null;

              return (
                <Card
                  key={c.id}
                  className={`cursor-pointer hover:shadow-sm py-1 px-3 ${
                    isUnread ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleConversationClick(c.conversationId)}
                >
                  <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                        <AvatarImage
                          className="object-cover"
                          src={otherUser.image}
                          alt={otherUser.username}
                        />
                        <AvatarFallback>
                          {otherUser.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      {/* Assuming otherUser has an `isOnline` property */}
                      {otherUser?.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3
                          className={`truncate ${
                            isUnread
                              ? "font-semibold text-gray-900"
                              : "font-medium text-gray-900"
                          }`}
                        >
                          {otherUser.username}
                        </h3>
                        <div className="flex items-center gap-2">
                          {c.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {formatTime(c.lastMessage.createdAt)}
                            </span>
                          )}
                          {isUnread && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              {c.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {c.lastMessage && isLastMessageFromOther && (
                          <span className="text-xs text-gray-500">
                            {otherUser.username}:
                          </span>
                        )}
                        {c.lastMessage && !isLastMessageFromOther && (
                          <span className="text-xs text-gray-500">You:</span>
                        )}
                        <p
                          className={`truncate text-xs sm:text-sm ${
                            isUnread && isLastMessageFromOther
                              ? "text-gray-900 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {getLastMessagePreview(c.lastMessage)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
