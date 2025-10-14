"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversationStore } from "../../store/useConversationStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ConversationsPage() {
  const { user } = useAuthStore();
  const { conversations, getAllConversation, loading, error } =
    useConversationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  const getOtherUser = (conversation, currentUserId) => {
    return conversation?.participants?.find((p) => p.userId !== currentUserId)
      ?.user;
  };

  const filteredConversations =
    conversations?.filter((c) => {
      const otherUser = getOtherUser(c, user?.id);
      if (!otherUser) return false;

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
    if (!message?.content && !message?.attachmentUrl) return "No messages yet";
    if (message?.content) {
      return message.content.length > 50
        ? message.content.substring(0, 50) + "..."
        : message.content;
    }
    if (message?.attachmentUrl) return "📎 Attachment";
    return "";
  };

  if (loading && (!conversations || conversations.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          <div className="animate-pulse space-y-4 pt-16">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4 border border-gray-100"
              >
                <div className="w-14 h-14 bg-yellow-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            You have {conversations?.length || 0} conversation
            {(conversations?.length || 0) !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search conversations by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-6 rounded-xl shadow-md border-gray-200 focus:border-yellow-500 transition-colors bg-white text-gray-800"
            />
          </div>
        </div>

        {error && (
          <Card className="mb-4 bg-red-50 border-red-200 text-red-700 shadow-sm">
            <CardContent className="p-4">{error}</CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredConversations.length === 0 ? (
            <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-200">
                  <MessageSquare className="w-7 h-7 text-yellow-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm
                    ? "No conversations found"
                    : "No conversations yet"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {searchTerm
                    ? `No conversations match your search.`
                    : "Start a new conversation to see it here."}
                </p>
                {!searchTerm && (
                  <Link href="/connections">
                    <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-lg transition-all font-semibold">
                      <PlusCircle className="w-4 h-4 mr-2" /> Start a New Chat
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((c) => {
              const otherUser = getOtherUser(c, user?.id);
              const isUnread = c.unreadCount > 0;

              if (!otherUser) return null;

              const isLastMessageFromOther =
                c.lastMessage?.senderId !== user?.id;
              const userType = otherUser?.type;
              const profileLink =
                userType === "BUSINESS"
                  ? `/profile/business/${otherUser?.username}`
                  : `/profile/${
                      otherUser?.username
                    }/${otherUser?.creatorType?.toLowerCase()}`;

              return (
                <Card
                  key={c.id}
                  className={` py-1 cursor-pointer rounded-xl transition-shadow hover:shadow-lg ${
                    isUnread
                      ? "bg-yellow-50 shadow-md border"
                      : "bg-white shadow-sm border border-gray-100"
                  }`}
                  onClick={() => handleConversationClick(c.id)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <Link
                      href={profileLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative">
                        <Avatar className="h-14 w-14">
                          <AvatarImage
                            className="object-cover"
                            src={otherUser.image}
                            alt={otherUser.username}
                          />
                          <AvatarFallback className="bg-yellow-400 text-white text-xl font-semibold">
                            {otherUser.username?.[0]?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3
                          className={`truncate text-lg ${
                            isUnread
                              ? "font-bold text-gray-900"
                              : "font-semibold text-gray-800"
                          }`}
                        >
                          {otherUser.username}
                        </h3>
                        {c.lastMessage && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTime(c.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`truncate text-sm ${
                            isUnread
                              ? "text-gray-800 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {isLastMessageFromOther && c.lastMessage?.content
                            ? `${otherUser.username}: `
                            : !isLastMessageFromOther && c.lastMessage?.content
                            ? "You: "
                            : ""}
                          {getLastMessagePreview(c.lastMessage)}
                        </p>
                        {isUnread && (
                          <Badge className="bg-yellow-500 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold">
                            {c.unreadCount}
                          </Badge>
                        )}
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
