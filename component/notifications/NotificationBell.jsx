"use client";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const NotificationBell = () => {
  const { unreadCount, notifications, initSocket, disconnectSocket } =
    useNotificationStore();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      initSocket();
    }

    // Cleanup on unmount
    return () => {
      if (disconnectSocket) {
        disconnectSocket();
      }
    };
  }, [user?.id, initSocket, disconnectSocket]);

  if(!user){
    return null;
  }


  return (
    <div className="relative cursor-pointer">
      <Link href="/notification">
        <Bell className="w-6 h-6 hover:text-[#F0AF1B]" />
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-2 -right-2 px-1.5 py-0 text-xs rounded-full"
            variant="destructive"
          >
            {unreadCount}
          </Badge>
        )}
      </Link>
    </div>
  );
};

export default NotificationBell;