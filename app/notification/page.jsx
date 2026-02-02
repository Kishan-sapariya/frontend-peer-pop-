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
  UserPlus,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notificationTypes = [
  { key: "ALL", label: "All" },
  { key: "CONNECTION_REQUEST", label: "Connection Requests" },
  { key: "CONNECTION_ACCEPTED", label: "Accepted Connections" },
  { key: "CONNECTION_REJECTED", label: "Rejected Connections" },
  { key: "BUSINESS_VERIFICATION", label: "Business Verified" },
  { key: "BUSINESS_UNVERIFICATION", label: "Business Unverified" },
  { key: "CUSTOM", label: "Custom Messages" },
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
      fetchNotifications();
    }
  }, [initSocket, fetchNotifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "CONNECTION_REQUEST":
        return <UserPlus className="h-5 w-5 text-yellow-600" />;
      case "CONNECTION_ACCEPTED":
        return <UserCheck className="h-5 w-5 text-green-500" />;
      case "CONNECTION_REJECTED":
        return <UserX className="h-5 w-5 text-red-500" />;
      case "BUSINESS_VERIFICATION":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "BUSINESS_UNVERIFICATION":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "CUSTOM":
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

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
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <Card className="md:col-span-1 shadow-xl border-2 bg-white h-fit rounded-xl p-4 md:p-6">
          <CardHeader className="p-0 border-b pb-4 mb-4 border-gray-200">
            <CardTitle className="flex items-center justify-between text-2xl font-bold text-gray-900">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Unread</span>
              <Badge className="bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-600">
                {unreadCount}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">Read</span>
              <Badge
                variant="secondary"
                className="bg-gray-200 text-gray-700 font-semibold"
              >
                {readCount}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left bg-white text-gray-800 hover:bg-yellow-50 border-gray-300 transition-colors rounded-lg shadow-sm"
                >
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  {notificationTypes.find((t) => t.key === activeFilter)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[220px] rounded-lg"
              >
                {notificationTypes.map((t) => (
                  <DropdownMenuItem
                    key={t.key}
                    onClick={() => setActiveFilter(t.key)}
                    className="cursor-pointer rounded-md"
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
                className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
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
            <div className="flex justify-center items-center h-[600px] border border-gray-200 rounded-xl bg-white shadow-xl">
              <Loader2 className="animate-spin text-yellow-500 h-8 w-8" />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[600px] p-6 text-center border-2 border-yellow-100 rounded-xl bg-white shadow-xl">
              <Bell className="h-20 w-20 text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600">
                You're all caught up!
              </h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                No new notifications. We'll let you know when something arrives.
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
                    className={`
                      flex items-center gap-4 p-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer border
                      ${
                        n.isRead
                          ? "bg-white border-gray-200 hover:bg-gray-50"
                          : "bg-yellow-50 border-yellow-300 hover:shadow-lg"
                      }
                    `}
                  >
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-yellow-500">
                        <AvatarImage
                          src={n.sender?.image}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-yellow-500 text-white text-lg font-semibold">
                          {n.sender?.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-gray-200">
                        {getNotificationIcon(n.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900 leading-tight">
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-500 block mt-1">
                        {formatTime(n.createdAt)}
                      </span>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0 ml-auto text-gray-400 hover:text-red-500 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
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
