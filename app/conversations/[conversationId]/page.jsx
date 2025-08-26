"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useConversationStore } from "@/store/useConversationStore";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import socket from "@/lib/socket";
import { Link, Upload } from "lucide-react";

const MessagesArea = () => {
  const [messageInput, setMessageInput] = useState(""); // text input
  const [selectedFile, setSelectedFile] = useState(null); // file input
  const [filePreview, setFilePreview] = useState(null); // file preview URL
  const [isSending, setIsSending] = useState(false); // sending state
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

  // Get current conversation and other user data
  const currentConversation = conversations?.find(
    (c) => c.conversationId === conversationId
  );

  const otherUser = currentConversation?.conversation?.participants?.find(
    (p) => p.userId !== currentUser?.id
  )?.user;

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  useEffect(() => {
    getMessages(conversationId);
  }, [getMessages, conversationId]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
      setIsSending(false); // Stop loading when message is received
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [setMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

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
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImageFile = (file) => {
    return file?.type?.startsWith("image/");
  };

  const isVideoFile = (file) => {
    return file?.type?.startsWith("video/");
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !selectedFile) return;

    setIsSending(true);

    const receiverId = otherUser?.id;

    try {
      await useConversationStore
        .getState()
        .sendMessage(
          currentUser.id,
          receiverId,
          conversationId,
          messageInput.trim() || null,
          selectedFile
        );

      // Reset input and file
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

    // Create preview for images and videos
    if (isImageFile(file) || isVideoFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
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

  const groupMessagesByDate = (messages) => {
    if (!messages || !Array.isArray(messages)) return {};
    const grouped = {};
    messages.forEach((msg) => {
      const date = formatDate(msg.createdAt);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  // Show loading if conversation data isn't loaded yet
  if (!currentConversation || !otherUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <div className="fixed top-16 w-full z-10 bg-white border-b border-gray-200 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>

          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage src={otherUser.image} alt={otherUser.username} className="object-cover" />
            <AvatarFallback className="bg-gray-100 text-gray-600">
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

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="mt-17 mb-17">
              <div className="flex items-center justify-center my-4">
                <Badge
                  variant="secondary"
                  className="bg-gray-200 text-gray-700"
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
                        className={`flex items-end gap-2 max-w-[70%] ${
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
                          {msg.attachmentUrl &&
                          (msg.attachmentType?.startsWith("image/") ||
                            msg.attachmentType?.startsWith("video/")) ? (
                            <div className="space-y-2">
                              {msg.attachmentType?.startsWith("image/") ? (
                                <div className="relative">
                                  <img
                                    src={msg.attachmentUrl}
                                    alt="Shared image"
                                    className="w-full max-w-xs h-auto rounded-lg cursor-pointer"
                                    onClick={() =>
                                      window.open(msg.attachmentUrl, "_blank")
                                    }
                                  />
                                </div>
                              ) : (
                                <div className="relative max-w-xs">
                                  <video
                                    src={msg.attachmentUrl}
                                    controls
                                    className="w-full h-auto rounded-lg"
                                    preload="metadata"
                                  />
                                </div>
                              )}
                              {msg.content && (
                                <Card
                                  className={`p-3 ${
                                    isFromCurrentUser
                                      ? "bg-blue-500 text-white"
                                      : "bg-white"
                                  }`}
                                >
                                  <CardContent className="p-0">
                                    <p
                                      className={`text-sm whitespace-pre-wrap ${
                                        isFromCurrentUser
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {msg.content}
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          ) : msg.attachmentUrl ? (
                            <Card
                              className={`p-3 ${
                                isFromCurrentUser ? "bg-blue-500" : "bg-white"
                              }`}
                            >
                              <CardContent className="p-0">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-2 rounded-full ${
                                      isFromCurrentUser
                                        ? "bg-blue-600"
                                        : "bg-gray-100"
                                    }`}
                                  >
                                    {msg.attachmentType?.includes("pdf") ? (
                                      <svg
                                        className={`w-5 h-5 ${
                                          isFromCurrentUser
                                            ? "text-white"
                                            : "text-red-600"
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                      </svg>
                                    ) : msg.attachmentType?.includes("text") ? (
                                      <svg
                                        className={`w-5 h-5 ${
                                          isFromCurrentUser
                                            ? "text-white"
                                            : "text-gray-600"
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        className={`w-5 h-5 ${
                                          isFromCurrentUser
                                            ? "text-white"
                                            : "text-gray-600"
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-medium truncate ${
                                        isFromCurrentUser
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {msg.attachmentName || "File attachment"}
                                    </p>
                                    <button
                                      onClick={() =>
                                        window.open(msg.attachmentUrl, "_blank")
                                      }
                                      className={`text-xs underline hover:no-underline ${
                                        isFromCurrentUser
                                          ? "text-blue-100 hover:text-white"
                                          : "text-blue-600 hover:text-blue-800"
                                      }`}
                                    >
                                      Download
                                    </button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card
                              className={`p-3 ${
                                isFromCurrentUser
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                            >
                              <CardContent className="p-0">
                                <p
                                  className={`text-sm whitespace-pre-wrap ${
                                    isFromCurrentUser
                                      ? "text-white"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {msg.content}
                                </p>
                              </CardContent>
                            </Card>
                          )}

                          <span
                            className={`text-xs text-gray-500 mt-1 px-1 ${
                              isFromCurrentUser ? "text-right" : "text-left"
                            }`}
                          >
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

      {selectedFile && (
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="relative mb-18">
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
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              )}

              <button
                onClick={removeFilePreview}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
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
      <div className="bg-white fixed bottom-0 w-full border-t border-gray-200 p-3 sm:p-4">
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 flex-shrink-0"
            disabled={isSending}
          >
            <Link/>
          </Button>

          <div className="flex-1 min-w-0">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={(!messageInput.trim() && !selectedFile) || isSending}
            size="sm"
            className="px-4 flex-shrink-0"
          >
            {isSending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending</span>
              </div>
            ) : (
              "Send"
            )}
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
