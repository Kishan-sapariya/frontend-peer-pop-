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
  Filter,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const notificationTypes = [
  { key: "ALL", label: "All" },
  { key: "CONNECTION_REQUEST", label: "Connection Requests" },
  { key: "CONNECTION_ACCEPTED", label: "Accepted Connections" },
  { key: "CONNECTION_REJECTED", label: "Rejected Connections" },
  { key: "BUSINESS_VERIFICATION", label: "Business Verified" },
  { key: "BUSINESS_UNVERIFICATION", label: "Business Unverified" },
  { key: "CUSTOM", label: "Custom Messages" }, // ✅ Custom notifications
];

export default function NotificationList() {
  const {
    notifications,
    fetchNotifications,
    deleteNotification,
    loading,
    markAsRead,
    initSocket,
  } = useNotificationStore();

  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    if (typeof window !== "undefined") {
      initSocket();
      fetchNotifications(); // Fetch latest notifications
    }
  }, [initSocket, fetchNotifications]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diffInSeconds < 60) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications =
    activeFilter === "ALL"
      ? notifications
      : notifications.filter((n) => n.type === activeFilter);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.length - unreadCount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <Card className="md:col-span-1 shadow-md border border-gray-200 dark:border-gray-800 h-fit rounded-xl p-4 md:p-6">
          <CardHeader className="p-0 border-b pb-4 mb-4 border-gray-200 dark:border-gray-800">
            <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-3">
            {/* Read/unread counts */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Unread
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold">
                {unreadCount}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Read
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-semibold">
                {readCount}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  {notificationTypes.find((t) => t.key === activeFilter)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[200px] dark:bg-gray-800"
              >
                {notificationTypes.map((t) => (
                  <DropdownMenuItem
                    key={t.key}
                    onClick={() => setActiveFilter(t.key)}
                    className="cursor-pointer dark:hover:bg-gray-700"
                  >
                    {t.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  notifications.forEach((n) => deleteNotification(n.id))
                }
                className="w-full justify-start text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete All
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Notifications list */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-[600px] border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
              <Loader2 className="animate-spin text-gray-400 h-8 w-8" />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[600px] p-6 text-center border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
              <Bell className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                No notifications found
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                You're all caught up. We'll let you know when something new
                arrives.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[600px] md:pr-4">
              <div className="space-y-4">
                {filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (!n.isRead) {
                        markAsRead(n.id);
                      }
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                      n.isRead
                        ? "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                        : "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-700"
                    }`}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={n.sender?.image}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {n.sender?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50 leading-tight">
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                        {formatTime(n.createdAt)}
                      </span>
                    </div>

                    {/* Status icon for notification type */}
                    {n.type === "BUSINESS_VERIFICATION" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {n.type === "BUSINESS_UNVERIFICATION" && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    {n.type === "CUSTOM" && (
                      <Bell className="h-5 w-5 text-yellow-500" />
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0 ml-auto text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
