"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversationStore } from "@/store/useConversationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, PlusCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { NewChatModal } from "@/component/conversations/NewChatModal";
import { useOnlineStatus } from "@/hooks/useSocketFeatures";

// Sidebar component for conversation list
function ConversationsSidebar({ onConversationSelect, selectedConversationId }) {
  const { user } = useAuthStore();
  const { conversations, getAllConversation, loading } = useConversationStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  const getOtherUser = (conversation, currentUserId) => {
    return conversation?.participants?.find((p) => p.userId !== currentUserId)?.user;
  };

  const filteredConversations = conversations?.filter((c) => {
    const otherUser = getOtherUser(c, user?.id);
    if (!otherUser) return false;
    if (!searchTerm) return true;
    return (
      otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  // Get all user IDs for online status tracking
  const userIds = useMemo(() => {
    return filteredConversations
      .map((c) => getOtherUser(c, user?.id)?.id)
      .filter(Boolean);
  }, [filteredConversations, user?.id]);

  const { isOnline } = useOnlineStatus(userIds);

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
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const getLastMessagePreview = (message) => {
    if (!message?.content && !message?.attachmentUrl) return "No messages yet";
    if (message?.content) {
      return message.content.length > 35
        ? message.content.substring(0, 35) + "..."
        : message.content;
    }
    if (message?.attachmentUrl) return "Sent an attachment";
    return "";
  };

  const handleConversationClick = (conversationId) => {
    if (onConversationSelect) {
      onConversationSelect(conversationId);
    }
    router.push(`/conversations/${conversationId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-4 pt-2 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <Button
            onClick={() => setIsNewChatModalOpen(true)}
            size="icon"
            variant="ghost"
            aria-label="Start new conversation"
            className="h-9 w-9 rounded-full hover:bg-yellow-50 text-gray-600 hover:text-yellow-600"
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 h-10 rounded-full bg-gray-100 border-0 text-sm focus:ring-1 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading && (!conversations || conversations.length === 0) ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-3 p-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-3">
              {searchTerm ? "No conversations found" : "No conversations yet"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsNewChatModalOpen(true)}
                size="sm"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                Start a Chat
              </Button>
            )}
          </div>
        ) : (
          <div className="py-2">
            {filteredConversations.map((c) => {
              const otherUser = getOtherUser(c, user?.id);
              const isUnread = c.unreadCount > 0;
              const isSelected = selectedConversationId === c.id;

              if (!otherUser) return null;

              const isLastMessageFromOther = c.lastMessage?.senderId !== user?.id;

              return (
                <div
                  key={c.id}
                  onClick={() => handleConversationClick(c.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                    ${isSelected
                      ? "bg-yellow-50 border-l-2 border-yellow-400"
                      : "hover:bg-gray-50 border-l-2 border-transparent"
                    }
                  `}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        className="object-cover"
                        src={otherUser.image}
                        alt={otherUser.username}
                      />
                      <AvatarFallback className="bg-yellow-400 text-gray-900 font-semibold">
                        {otherUser.username?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    {isOnline(otherUser.id) && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className={`truncate text-sm ${isUnread ? "font-semibold text-gray-900" : "font-medium text-gray-800"}`}>
                        {otherUser.username}
                      </h3>
                      {c.lastMessage && (
                        <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">
                          {formatTime(c.lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`truncate text-xs ${isUnread ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                        {!isLastMessageFromOther && c.lastMessage?.content ? "You: " : ""}
                        {getLastMessagePreview(c.lastMessage)}
                      </p>
                      {isUnread && (
                        <Badge className="bg-yellow-400 text-gray-900 text-[10px] px-1.5 py-0 h-4 rounded-full font-bold flex-shrink-0">
                          {c.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewChatModal
        open={isNewChatModalOpen}
        onOpenChange={setIsNewChatModalOpen}
      />
    </div>
  );
}

// Main Layout Component
export default function ConversationsLayout({ children }) {
  const pathname = usePathname();
  const isInChat = pathname !== "/conversations";
  const conversationId = pathname.split("/").pop();

  return (
    <div className="fixed inset-0 top-20 flex bg-gray-100">
      {/* Sidebar - Hidden on mobile when in a chat, always visible on desktop */}
      <aside
        className={`
          ${isInChat ? "hidden md:flex" : "flex"}
          w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-gray-200
        `}
      >
        <div className="w-full">
          <ConversationsSidebar
            selectedConversationId={isInChat ? conversationId : null}
          />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main
        className={`
          ${isInChat ? "flex" : "hidden md:flex"}
          flex-1 flex-col min-w-0
        `}
      >
        {children}
      </main>
    </div>
  );
}
