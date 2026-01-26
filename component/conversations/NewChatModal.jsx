"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Loader2, Users, Sparkles } from "lucide-react";
import { useConversationStore } from "@/store/useConversationStore";
import { useDebounce } from "@/hooks/useDebounce";

export function NewChatModal({ open, onOpenChange }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [startingChat, setStartingChat] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const {
    publicUsers,
    publicUsersLoading,
    getPublicUsersForChat,
    createConversation,
    clearPublicUsers,
  } = useConversationStore();

  useEffect(() => {
    if (open) {
      getPublicUsersForChat(debouncedSearch);
    }
  }, [open, debouncedSearch, getPublicUsersForChat]);

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      clearPublicUsers();
    }
  }, [open, clearPublicUsers]);

  const handleStartChat = useCallback(
    async (userId) => {
      setStartingChat(userId);
      try {
        const conversation = await createConversation(userId);
        if (conversation?.id) {
          onOpenChange(false);
          router.push(`/conversations/${conversation.id}`);
        }
      } catch (error) {
        console.error("Error starting chat:", error);
      } finally {
        setStartingChat(null);
      }
    },
    [createConversation, onOpenChange, router]
  );

  const getUserDisplayInfo = (user) => {
    const name =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username;

    let subtitle = "";
    if (user.role === "BUSINESS" && user.businessProfile) {
      subtitle =
        user.businessProfile.companyName || user.businessProfile.industry || "Business";
    } else if (user.creatorProfile?.creatorType) {
      subtitle = user.creatorProfile.creatorType.charAt(0) +
        user.creatorProfile.creatorType.slice(1).toLowerCase();
    }

    return { name, subtitle };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col p-0 gap-0 bg-white rounded-2xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </div>
            Start a New Chat
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-5 rounded-xl border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 bg-gray-50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-[300px] max-h-[400px]">
          {publicUsersLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              <p className="text-sm text-gray-500">Finding people...</p>
            </div>
          ) : publicUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {searchTerm ? "No users found" : "No public users available"}
              </h3>
              <p className="text-sm text-gray-500 max-w-[250px]">
                {searchTerm
                  ? `No users match "${searchTerm}"`
                  : "There are no new public users to chat with at the moment."}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {publicUsers.map((user) => {
                const { name, subtitle } = getUserDisplayInfo(user);
                const isStarting = startingChat === user.id;

                return (
                  <div
                    key={user.id}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-all cursor-pointer"
                    onClick={() => !isStarting && handleStartChat(user.id)}
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-gray-100 group-hover:ring-yellow-200 transition-all">
                      <AvatarImage
                        src={user.image}
                        alt={user.username}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-semibold">
                        {user.username?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {name}
                      </h4>
                      {subtitle && (
                        <p className="text-sm text-gray-500 truncate">
                          {subtitle}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>

                    <Button
                      size="sm"
                      disabled={isStarting}
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                    >
                      {isStarting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Showing users with public profiles
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
