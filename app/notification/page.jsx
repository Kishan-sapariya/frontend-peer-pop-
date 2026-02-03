"use client";

import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Loader2,
  Trash2,
  CheckCheck,
  UserPlus,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Heart,
  MessageCircle,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConnectionStore } from "@/store/useConnectionStore";

export default function NotificationPage() {
  const {
    notifications,
    fetchNotifications,
    deleteNotification,
    loading,
    markAsRead,
    markAllAsRead,
    initSocket,
  } = useNotificationStore();

  const { acceptConnection, rejectConnection } = useConnectionStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      initSocket();
      fetchNotifications();
    }
  }, [initSocket, fetchNotifications]);

  const getNotificationIcon = (type) => {
    const iconMap = {
      CONNECTION_REQUEST: { icon: UserPlus, color: "bg-blue-500" },
      CONNECTION_ACCEPTED: { icon: UserCheck, color: "bg-green-500" },
      CONNECTION_REJECTED: { icon: UserX, color: "bg-red-500" },
      BUSINESS_VERIFICATION: { icon: CheckCircle, color: "bg-green-500" },
      BUSINESS_UNVERIFICATION: { icon: XCircle, color: "bg-orange-500" },
      BUSINESS_REJECTION: { icon: XCircle, color: "bg-red-500" },
      POST_LIKE: { icon: Heart, color: "bg-pink-500" },
      POST_COMMENT: { icon: MessageCircle, color: "bg-purple-500" },
      CUSTOM: { icon: Bell, color: "bg-yellow-500" },
    };
    return iconMap[type] || { icon: Bell, color: "bg-gray-500" };
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (diffInSeconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications.filter((n) => n.type === "CONNECTION_REQUEST");

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.length - unreadCount;

  const handleAcceptConnection = async (notification, e) => {
    e.stopPropagation();
    if (notification.sender?.id) {
      await acceptConnection(notification.sender.id);
      markAsRead(notification.id);
    }
  };

  const handleRejectConnection = async (notification, e) => {
    e.stopPropagation();
    if (notification.sender?.id) {
      await rejectConnection(notification.sender.id);
      markAsRead(notification.id);
    }
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "requests", label: "Requests" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <Card className="lg:col-span-1 shadow-lg border-0 bg-white h-fit rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Bell className="h-5 w-5 text-yellow-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
                <p className="text-xs text-gray-600">Unread</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-600">{readCount}</p>
                <p className="text-xs text-gray-600">Read</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                  {tab.key === "unread" && unreadCount > 0 && (
                    <Badge className="ml-2 bg-white/30 text-inherit">{unreadCount}</Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="w-full justify-start text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Card className="shadow-lg border-0 bg-white rounded-2xl">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
                  <p className="mt-3 text-sm text-gray-500">Loading notifications...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Bell className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {activeTab === "unread" ? "All caught up!" : "No notifications yet"}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    {activeTab === "unread"
                      ? "You've read all your notifications."
                      : "When you get notifications, they'll show up here."}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="divide-y divide-gray-100">
                    {filteredNotifications.map((notification) => {
                      const { icon: Icon, color } = getNotificationIcon(notification.type);
                      const isConnectionRequest =
                        notification.type === "CONNECTION_REQUEST" && !notification.isRead;

                      return (
                        <div
                          key={notification.id}
                          onClick={() => !notification.isRead && markAsRead(notification.id)}
                          className={`
                            group flex items-start gap-4 p-4 cursor-pointer transition-all
                            ${notification.isRead
                              ? "bg-white hover:bg-gray-50"
                              : "bg-yellow-50/50 hover:bg-yellow-50"
                            }
                          `}
                        >
                          {/* Avatar with icon badge */}
                          <div className="relative flex-shrink-0">
                            <Avatar className="h-12 w-12 ring-2 ring-white shadow">
                              <AvatarImage src={notification.sender?.image} className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-semibold">
                                {notification.sender?.username?.[0]?.toUpperCase() || "P"}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${color} ring-2 ring-white`}>
                              <Icon className="h-3 w-3 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-relaxed ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}>
                              <span className="font-semibold">{notification.sender?.username || "Someone"}</span>{" "}
                              {notification.message?.replace(notification.sender?.username || "", "").trim()}
                            </p>
                            <span className={`text-xs ${notification.isRead ? "text-gray-400" : "text-yellow-600 font-medium"}`}>
                              {formatTime(notification.createdAt)}
                            </span>

                            {/* Action buttons for connection requests */}
                            {isConnectionRequest && (
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  onClick={(e) => handleAcceptConnection(notification, e)}
                                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-4 h-8"
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => handleRejectConnection(notification, e)}
                                  className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-4 h-8"
                                >
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Right side - indicator & delete */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.isRead && (
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            )}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
