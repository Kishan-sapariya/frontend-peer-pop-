"use client"

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

  markAsRead: async (id) => {
    try {
      await axios.patch(`${API_URL}/notification/read/${id}`);
      set((state) => {
        const updated = state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        );
        toast.success("Marked as read");
        return {
          notifications: updated,
          unreadCount: updated.filter((n) => !n.isRead).length,
        };
      });
    } catch (err) {
      console.error(err);
    }
  },

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

  initSocket: () => {
    const { fetchNotifications } = get();
    const user = useAuthStore.getState().user;

    if (!user?.id) {
      console.warn("[SOCKET] User not available for socket join");
      return;
    }

    // Connect socket if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    console.log("[SOCKET] Joining room with userId:", user.id);
    socket.emit("join", user.id);

    // Remove existing listeners to prevent duplicates
    socket.off("newNotification");

    socket.on("connect", () => {
      console.log("[SOCKET] Connected to server with id:", socket.id);
      // Re-join room on reconnection
      socket.emit("join", user.id);
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] Disconnected from server");
    });

    socket.on("newNotification", (data) => {
      console.log("[SOCKET] Received newNotification:", data);

      // Handle both old and new notification format
      const notification = data.notification || data;
      const unreadCount = data.unreadCount;

      set((state) => {
        const updatedNotifications = [notification, ...state.notifications];
        return {
          notifications: updatedNotifications,
          unreadCount: unreadCount !== undefined ? unreadCount : state.unreadCount + 1,
        };
      });

      toast.success("🔔 New Notification");
    });

    fetchNotifications();
  },

  disconnectSocket: () => {
    socket.off("newNotification");
    socket.disconnect();
  },
}));