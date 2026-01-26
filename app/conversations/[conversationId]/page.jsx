"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConversationStore } from "@/store/useConversationStore";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import socket from "@/lib/socket";
import { ArrowLeft, Paperclip, Send, X, File } from "lucide-react";

const MessagesArea = () => {
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
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
  } = useConversationStore();
  const { conversationId } = useParams();

  const currentConversation = conversations?.find(
    (c) => c.id === conversationId
  );
  const otherUser = currentConversation?.participants?.find(
    (p) => p.userId !== currentUser?.id
  )?.user;

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  useEffect(() => {
    setMessages([]);
    if (conversationId) getMessages(conversationId);
  }, [conversationId, getMessages, setMessages]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
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
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    const receiverId = otherUser?.id;

    try {
      await sendMessage(
        receiverId,
        conversationId,
        messageInput.trim() || null,
        selectedFile
      );

      setMessageInput("");
      setSelectedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      {/* Header */}
      <div className="fixed top-16 w-full z-10 bg-white shadow-sm p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage
              src={otherUser.image}
              alt={otherUser.username}
              className="object-cover"
            />
            <AvatarFallback className="bg-yellow-500 text-white">
              {otherUser.username?.charAt(0).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {otherUser.username}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-24 pb-28 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <LoadingSpinner />
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex items-center justify-center my-4">
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200"
                >
                  {date}
                </Badge>
              </div>
              <div className="space-y-3">
                {dateMessages.map((msg) => {
                  const isFromCurrentUser = msg.senderId === currentUser?.id;
                  const sender = isFromCurrentUser ? currentUser : otherUser;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isFromCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[75%] ${
                          isFromCurrentUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {!isFromCurrentUser && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage
                              src={sender.image}
                              alt={sender.username}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {sender.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`flex flex-col ${
                            isFromCurrentUser ? "items-end" : "items-start"
                          }`}
                        >
                          <Card
                            className={`
                              p-3 rounded-2xl shadow-sm border-none
                              ${
                                isFromCurrentUser
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-300 text-white rounded-br-none"
                                  : "bg-gray-100 shadow-md text-gray-900 rounded-bl-none"
                              }
                            `}
                          >
                            <CardContent className="p-0 space-y-2">
                              {msg.content && (
                                <p className="text-sm whitespace-pre-wrap">
                                  {msg.content}
                                </p>
                              )}
                              {msg.attachmentUrl && (
                                <>
                                  {msg.attachmentType?.startsWith("image/") ? (
                                    <a
                                      href={msg.attachmentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <img
                                        src={msg.attachmentUrl}
                                        alt="attachment"
                                        className="max-w-xs rounded-lg shadow-md cursor-pointer"
                                      />
                                    </a>
                                  ) : msg.attachmentType?.startsWith(
                                      "video/"
                                    ) ? (
                                    <video
                                      controls
                                      className="max-w-xs rounded-lg shadow-md"
                                      src={msg.attachmentUrl}
                                    />
                                  ) : (
                                    <a
                                      href={msg.attachmentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`
                                        flex items-center gap-2 p-3 rounded-lg border
                                        ${
                                          isFromCurrentUser
                                            ? "bg-yellow-600/30 text-white"
                                            : "bg-gray-100 text-gray-800"
                                        }
                                      `}
                                    >
                                      <File className="w-5 h-5" />
                                      <span className="text-sm font-medium">
                                        Download File
                                      </span>
                                    </a>
                                  )}
                                </>
                              )}
                            </CardContent>
                          </Card>
                          <span className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File preview */}
      {selectedFile && (
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-3 fixed w-full bottom-20">
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl shadow-inner">
            <div className="relative">
              {isImageFile(selectedFile) && filePreview ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : isVideoFile(selectedFile) && filePreview ? (
                <video
                  src={filePreview}
                  className="w-16 h-16 object-cover rounded-lg"
                  muted
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  <File className="w-8 h-8" />
                </div>
              )}
              <button
                onClick={removeFilePreview}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {getFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white fixed bottom-0 w-full border-t border-gray-200 p-3 sm:p-4">
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 hover:bg-gray-100 flex-shrink-0"
            disabled={isSending}
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending}
              className="py-6 rounded-full"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={(!messageInput.trim() && !selectedFile) || isSending}
            size="icon"
            className="w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
      </div>
    </div>
  );
};

export default MessagesArea;
