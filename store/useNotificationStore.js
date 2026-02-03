"use client";

import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import socket from "@/lib/socket";
import { useAuthStore } from "./useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,

  // ✅ Fetch notifications from backend
  fetchNotifications: async () => {
    try {
      const res = await axios.get(`${API_URL}/notification/all`);
      const notifications = Array.isArray(res.data)
        ? res.data
        : res.data.notifications || [];

      set({
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notifications");
    }
  },

  // ✅ Mark one notification as read
  markAsRead: async (id) => {
    try {
      await axios.patch(`${API_URL}/notification/read/${id}`);
      set((state) => {
        const updated = state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        );
        return {
          notifications: updated,
          unreadCount: updated.filter((n) => !n.isRead).length,
        };
      });
    } catch (err) {
      console.error(err);
    }
  },

  // ✅ Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const { notifications } = get();
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

      // Mark all as read in parallel
      await Promise.all(
        unreadIds.map((id) => axios.patch(`${API_URL}/notification/read/${id}`))
      );

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));

      toast.success("All notifications marked as read");
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark all as read");
    }
  },

  // ✅ Delete one notification
  deleteNotification: async (id) => {
    try {
      await axios.delete(`${API_URL}/notification/delete/${id}`);
      set((state) => {
        const updated = state.notifications.filter((n) => n.id !== id);
        return {
          notifications: updated,
          unreadCount: updated.filter((n) => !n.isRead).length,
        };
      });
      toast.success("Notification deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notification");
    }
  },

  // ✅ Initialize socket connection for real-time updates
  initSocket: () => {
    const { fetchNotifications } = get();
    const user = useAuthStore.getState().user;

    if (!user?.id) {
      console.warn("[SOCKET] User not available for socket join");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", user.id);

    // Prevent duplicate listeners
    socket.off("newNotification");

    socket.on("connect", () => {
      socket.emit("join", user.id);
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] Disconnected from server");
    });

    // ✅ Handle new notifications from server
    socket.on("newNotification", (data) => {
      const notification = data.notification || data;

      set((state) => {
        // prevent duplicates
        if (state.notifications.some((n) => n.id === notification.id)) {
          return state;
        }

        const updatedNotifications = [notification, ...state.notifications];
        return {
          notifications: updatedNotifications,
          unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
        };
      });

      // ✅ Show different toasts depending on type
      switch (notification.type) {
        case "BUSINESS_VERIFICATION":
          toast.success("✅ Your business has been verified!");
          break;
        case "BUSINESS_UNVERIFICATION":
          toast.error("❌ Your business verification was revoked!");
          break;
        case "CONNECTION_REQUEST":
          toast("🤝 You have a new connection request!");
          break;
        case "CONNECTION_ACCEPTED":
          toast.success("🎉 Your connection request was accepted!");
          break;
        case "CONNECTION_REJECTED":
          toast.error("🚫 Your connection request was rejected.");
          break;
        case "POST_LIKE":
          toast(notification.message || "❤️ Someone liked your post!");
          break;
        case "POST_COMMENT":
          toast(notification.message || "💬 Someone commented on your post!");
          break;
        case "CUSTOM":
          toast(notification.message || "🔔 You have a new update!");
          break;
        default:
          toast("🔔 New Notification");
      }
    });

    // Load old notifications on init
    fetchNotifications();
  },

  // ✅ Disconnect socket (logout, cleanup)
  disconnectSocket: () => {
    socket.off("newNotification");
    socket.disconnect();
  },
}));
