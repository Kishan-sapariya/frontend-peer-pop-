"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationStore } from "@/store/useConversationStore";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import socket from "@/lib/socket";
import { ArrowLeft, Paperclip, Send, X, File, Check, CheckCheck } from "lucide-react";
import {
  useOnlineStatus,
  useTypingIndicator,
  useReadReceipts,
} from "@/hooks/useSocketFeatures";

const MAX_MESSAGE_LENGTH = 1000;

const ChatPage = () => {
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const messageCharCount = messageInput.length;
  const isMessageOverLimit = messageCharCount > MAX_MESSAGE_LENGTH;
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const {
    sendMessage,
    getMessages,
    getAllConversation,
    messages,
    setMessages,
    isLoading,
    conversations,
    clearUnreadCount,
    setActiveConversation,
    clearActiveConversation,
  } = useConversationStore();
  const { conversationId } = useParams();

  const currentConversation = conversations?.find((c) => c.id === conversationId);
  const otherUser = currentConversation?.participants?.find(
    (p) => p.userId !== currentUser?.id
  )?.user;

  // Online status, typing indicator, and read receipts
  const { isOnline } = useOnlineStatus(otherUser?.id ? [otherUser.id] : []);
  const { isOtherTyping, emitTyping } = useTypingIndicator(conversationId, otherUser?.id);
  const { readStatus, markAsRead } = useReadReceipts(conversationId);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  useEffect(() => {
    setMessages([]);
    if (conversationId) {
      getMessages(conversationId);
      // Clear unread count and set active conversation
      clearUnreadCount(conversationId);
      setActiveConversation(conversationId);
    }

    // Clear active conversation when leaving
    return () => {
      clearActiveConversation();
    };
  }, [conversationId, getMessages, setMessages, clearUnreadCount, setActiveConversation, clearActiveConversation]);

  useEffect(() => {
    // Use a named function so we can remove only THIS listener, not the store's listener
    const handleReceiveMessage = (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      useConversationStore.setState((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === msg.conversationId ? { ...c, lastMessage: msg } : c
        ),
      }));

      setIsSending(false);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      // Remove only this specific listener, not all receiveMessage listeners
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Scroll when typing indicator appears
  useEffect(() => {
    if (isOtherTyping) {
      scrollToBottom();
    }
  }, [isOtherTyping, scrollToBottom]);

  useEffect(() => {
    const timer = setTimeout(() => scrollToBottom(), 100);
    return () => clearTimeout(timer);
  }, [conversationId, isLoading, scrollToBottom]);

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (conversationId && messages.length > 0 && !isLoading) {
      markAsRead();
    }
  }, [conversationId, messages.length, isLoading, markAsRead]);

  // Listen for read receipts and update local messages
  useEffect(() => {
    const handleMessagesRead = ({ conversationId: convId, userId, lastReadAt }) => {
      if (convId === conversationId && userId !== currentUser?.id) {
        // Update local messages to mark them as read by this user
        setMessages((prev) =>
          prev.map((msg) => {
            // Only update messages sent by current user that were created before lastReadAt
            if (msg.senderId === currentUser?.id && new Date(msg.createdAt) <= new Date(lastReadAt)) {
              const readBy = msg.readBy || [];
              if (!readBy.includes(userId)) {
                return { ...msg, readBy: [...readBy, userId] };
              }
            }
            return msg;
          })
        );
      }
    };

    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [conversationId, currentUser?.id, setMessages]);

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  };

  const getFileSize = (bytes) => {
    if (!bytes) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImageFile = (file) => file?.type?.startsWith("image/");
  const isVideoFile = (file) => file?.type?.startsWith("video/");

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !selectedFile) return;

    setIsSending(true);
    emitTyping(false); // Clear typing indicator
    const receiverId = otherUser?.id;

    try {
      await sendMessage(receiverId, conversationId, messageInput.trim() || null, selectedFile);
      setMessageInput("");
      setSelectedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      if (inputRef.current) inputRef.current.style.height = '44px';
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsSending(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    if (isImageFile(file) || isVideoFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const removeFilePreview = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const groupMessagesByDate = (msgs) => {
    if (!Array.isArray(msgs)) return {};
    return msgs.reduce((acc, msg) => {
      const date = formatDate(msg.createdAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (!currentConversation || !otherUser) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Get profile link for the other user
  const getProfileLink = () => {
    if (!otherUser) return "/";
    if (otherUser.role === "BUSINESS") {
      return `/profile/business/${otherUser.username}`;
    }
    const creatorType = otherUser.creatorProfile?.creatorType?.toLowerCase() || "youtuber";
    return `/profile/${otherUser.username}/${creatorType}`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Back button - Only on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/conversations")}
            className="md:hidden h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push(getProfileLink())}
          >
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-yellow-400">
                <AvatarImage src={otherUser.image} alt={otherUser.username} className="object-cover" />
                <AvatarFallback className="bg-yellow-400 text-gray-900 font-semibold">
                  {otherUser.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              {isOnline(otherUser?.id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {otherUser.username}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {isOnline(otherUser?.id) ? (
                  <span className="text-green-600">Online</span>
                ) : (
                  "Tap to view profile"
                )}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Messages Container */}
      <main ref={messagesContainerRef} className="flex-1 overflow-y-auto bg-gray-50 chat-messages">
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <LoadingSpinner />
            </div>
          ) : Object.keys(groupedMessages).length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="w-20 h-20 rounded-full bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={otherUser.image} alt={otherUser.username} className="object-cover" />
                  <AvatarFallback className="bg-yellow-400 text-gray-900 text-xl font-semibold">
                    {otherUser.username?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Start chatting with {otherUser.username}
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Send a message to begin your conversation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date}>
                  {/* Date Separator */}
                  <div className="flex items-center justify-center my-4">
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                      {date}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-1">
                    {dateMessages.map((msg, index) => {
                      const isFromCurrentUser = msg.senderId === currentUser?.id;
                      const sender = isFromCurrentUser ? currentUser : otherUser;
                      const showAvatar =
                        !isFromCurrentUser &&
                        (index === 0 || dateMessages[index - 1]?.senderId !== msg.senderId);

                      return (
                        <div
                          key={msg.id}
                          className={`flex w-full px-3 ${isFromCurrentUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-end gap-2 max-w-[85%] md:max-w-[70%] ${
                              isFromCurrentUser ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            {/* Avatar */}
                            {!isFromCurrentUser && (
                              <div className="w-8 flex-shrink-0 mb-5">
                                {showAvatar && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={sender.image} alt={sender.username} className="object-cover" />
                                    <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                                      {sender.username?.charAt(0).toUpperCase() || "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            )}

                            {/* Message Bubble */}
                            <div className={`flex flex-col ${isFromCurrentUser ? "items-end" : "items-start"}`}>
                              <div
                                className={`
                                  px-4 py-2.5 rounded-2xl
                                  ${isFromCurrentUser
                                    ? "bg-yellow-400 text-gray-900 rounded-br-sm"
                                    : "bg-white text-gray-900 rounded-bl-sm shadow-sm border border-gray-100"
                                  }
                                `}
                              >
                                {msg.content && (
                                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                                    {msg.content}
                                  </p>
                                )}

                                {msg.attachmentUrl && (
                                  <div className={msg.content ? "mt-2" : ""}>
                                    {msg.attachmentType?.startsWith("image/") ? (
                                      <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <img
                                          src={msg.attachmentUrl}
                                          alt="attachment"
                                          className="max-w-full sm:max-w-[280px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                          loading="lazy"
                                        />
                                      </a>
                                    ) : msg.attachmentType?.startsWith("video/") ? (
                                      <video controls className="max-w-full sm:max-w-[280px] rounded-lg" src={msg.attachmentUrl} />
                                    ) : (
                                      <a
                                        href={msg.attachmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                          flex items-center gap-3 p-3 rounded-lg transition-colors
                                          ${isFromCurrentUser
                                            ? "bg-yellow-500/30 hover:bg-yellow-500/40"
                                            : "bg-gray-100 hover:bg-gray-200"
                                          }
                                        `}
                                      >
                                        <File className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm font-medium truncate">Download File</span>
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>

                              <span className={`text-[11px] text-gray-400 mt-1 flex items-center gap-1 ${isFromCurrentUser ? "mr-1" : "ml-1"}`}>
                                {formatTime(msg.createdAt)}
                                {isFromCurrentUser && (
                                  // Check if message is read: either from backend readBy array or from socket readStatus
                                  (msg.readBy?.includes(otherUser?.id)) ||
                                  (readStatus[otherUser?.id] && new Date(readStatus[otherUser.id]) >= new Date(msg.createdAt)) ? (
                                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                                  ) : (
                                    <Check className="w-3.5 h-3.5 text-gray-400" />
                                  )
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Typing Indicator */}
          {isOtherTyping && (
            <div className="flex items-end gap-2 px-3 py-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={otherUser?.image} alt={otherUser?.username} className="object-cover" />
                <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                  {otherUser?.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* File Preview */}
      {selectedFile && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="relative flex-shrink-0">
              {isImageFile(selectedFile) && filePreview ? (
                <img src={filePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
              ) : isVideoFile(selectedFile) && filePreview ? (
                <video src={filePreview} className="w-12 h-12 object-cover rounded-lg" muted />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-gray-500" />
                </div>
              )}
              <button
                onClick={removeFilePreview}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{getFileSize(selectedFile.size)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-3 safe-area-inset-bottom">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 w-11 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full flex-shrink-0"
            disabled={isSending}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                // Emit typing event
                emitTyping(e.target.value.length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isMessageOverLimit) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onBlur={() => emitTyping(false)}
              disabled={isSending}
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH + 50}
              className={`w-full px-4 py-2.5 pr-12 text-[15px] bg-gray-100 border rounded-2xl resize-none focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 disabled:opacity-50 ${
                isMessageOverLimit
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
              }`}
              style={{ minHeight: "44px", maxHeight: "100px", lineHeight: "1.4" }}
            />
            {messageInput.length > 0 && (
              <span
                className={`absolute right-3 bottom-2.5 text-[10px] font-medium ${
                  isMessageOverLimit
                    ? "text-red-500"
                    : messageCharCount > MAX_MESSAGE_LENGTH - 100
                    ? "text-amber-500"
                    : "text-gray-400"
                }`}
              >
                {MAX_MESSAGE_LENGTH - messageCharCount}
              </span>
            )}
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={(!messageInput.trim() && !selectedFile) || isSending || isMessageOverLimit}
            size="icon"
            className={`
              h-11 w-11 rounded-full flex-shrink-0 transition-all duration-200
              ${(!messageInput.trim() && !selectedFile) || isSending || isMessageOverLimit
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:scale-95"
              }
            `}
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        />
      </div>
    </div>
  );
};

export default ChatPage;
