"use client";

import { Bell, UserPlus, UserCheck, CheckCircle, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const NotificationBell = () => {
  const { unreadCount, notifications, initSocket, disconnectSocket, markAsRead } =
    useNotificationStore();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      initSocket();
    }

    return () => {
      if (disconnectSocket) {
        disconnectSocket();
      }
    };
  }, [user?.id, initSocket, disconnectSocket]);

  if (!user) {
    return null;
  }

  const recentNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type) => {
    const iconMap = {
      CONNECTION_REQUEST: { icon: UserPlus, color: "bg-blue-500" },
      CONNECTION_ACCEPTED: { icon: UserCheck, color: "bg-green-500" },
      BUSINESS_VERIFICATION: { icon: CheckCircle, color: "bg-green-500" },
      POST_LIKE: { icon: Heart, color: "bg-pink-500" },
      POST_COMMENT: { icon: MessageCircle, color: "bg-purple-500" },
    };
    return iconMap[type] || { icon: Bell, color: "bg-yellow-500" };
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diffInSeconds < 60) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className={`w-6 h-6 ${unreadCount > 0 ? "text-gray-900" : "text-gray-600"}`} />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 p-0 rounded-2xl shadow-xl border-0 overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs font-semibold text-gray-900">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>

        {/* Notifications list */}
        <div className="max-h-80 overflow-y-auto">
          {recentNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentNotifications.map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    onClick={() => {
                      if (!notification.isRead) markAsRead(notification.id);
                    }}
                    className={`
                      flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
                      ${notification.isRead ? "bg-white hover:bg-gray-50" : "bg-yellow-50/50 hover:bg-yellow-50"}
                    `}
                  >
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.sender?.image} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-sm font-semibold">
                          {notification.sender?.username?.[0]?.toUpperCase() || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 p-1 rounded-full ${color} ring-2 ring-white`}>
                        <Icon className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug line-clamp-2 ${notification.isRead ? "text-gray-600" : "text-gray-900"}`}>
                        <span className="font-semibold">{notification.sender?.username}</span>{" "}
                        {notification.message?.replace(notification.sender?.username || "", "").trim()}
                      </p>
                      <span className={`text-xs ${notification.isRead ? "text-gray-400" : "text-yellow-600 font-medium"}`}>
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>

                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <Link
          href="/notification"
          onClick={() => setIsOpen(false)}
          className="block px-4 py-3 text-center text-sm font-semibold text-yellow-600 hover:bg-yellow-50 border-t border-gray-100 transition-colors"
        >
          View all notifications
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
