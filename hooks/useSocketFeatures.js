"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import socket from "@/lib/socket";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Hook to manage online status tracking
 */
export function useOnlineStatus(userIds = []) {
  const [onlineUsers, setOnlineUsers] = useState({});
  const { user } = useAuthStore();
  const userIdsRef = useRef(userIds);

  // Keep userIds ref updated
  useEffect(() => {
    userIdsRef.current = userIds;
  }, [userIds]);

  useEffect(() => {
    if (!user?.id) {
      // Clear online status when user logs out
      setOnlineUsers({});
      if (socket.connected) {
        socket.disconnect();
      }
      return;
    }

    // Function to fetch online status
    const fetchOnlineStatus = () => {
      if (userIdsRef.current.length > 0 && socket.connected) {
        socket.emit("getOnlineUsers", userIdsRef.current, (status) => {
          if (status) {
            setOnlineUsers(status);
          }
        });
      }
    };

    // Function to initialize socket connection
    const initSocket = () => {
      socket.emit("join", user.id);
      // Small delay to ensure join is processed before fetching
      setTimeout(fetchOnlineStatus, 100);
    };

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Listen for online/offline events
    const handleUserOnline = ({ userId }) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: true }));
    };

    const handleUserOffline = ({ userId }) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: false }));
    };

    // Handle connection/reconnection
    const handleConnect = () => {
      initSocket();
    };

    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);
    socket.on("connect", handleConnect);

    // Initialize if already connected, otherwise wait for connect event
    if (socket.connected) {
      initSocket();
    }

    // Handle page unload - notify server user is going offline
    const handleBeforeUnload = () => {
      if (socket.connected && user?.id) {
        socket.emit("leave", user.id);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
      socket.off("connect", handleConnect);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user?.id]);

  // Refetch when userIds change
  useEffect(() => {
    if (user?.id && userIds.length > 0 && socket.connected) {
      socket.emit("getOnlineUsers", userIds, (status) => {
        if (status) {
          setOnlineUsers((prev) => ({ ...prev, ...status }));
        }
      });
    }
  }, [user?.id, JSON.stringify(userIds)]);

  const isOnline = useCallback(
    (userId) => onlineUsers[userId] === true,
    [onlineUsers]
  );

  return { onlineUsers, isOnline };
}

/**
 * Hook to manage typing indicators
 */
export function useTypingIndicator(conversationId, receiverId) {
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const lastTypingRef = useRef(0);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!conversationId || !receiverId || !user?.id) return;

    // Ensure socket is connected and user has joined their room
    if (!socket.connected) {
      socket.connect();
    }

    const joinRoom = () => {
      socket.emit("join", user.id);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    const handleUserTyping = ({ conversationId: convId, userId, isTyping }) => {
      // Check if this typing event is for our conversation and from the other user
      if (convId === conversationId && userId === receiverId) {
        setIsOtherTyping(isTyping);

        // Auto-clear typing status after 3 seconds of no updates
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        if (isTyping) {
          typingTimeoutRef.current = setTimeout(() => {
            setIsOtherTyping(false);
          }, 3000);
        }
      }
    };

    socket.on("userTyping", handleUserTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("connect", joinRoom);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [conversationId, receiverId, user?.id]);

  // Throttled typing emitter
  const emitTyping = useCallback(
    (isTyping) => {
      if (!conversationId || !receiverId || !socket.connected) return;

      const now = Date.now();
      // Throttle typing events to once per second
      if (isTyping && now - lastTypingRef.current < 1000) {
        return;
      }
      lastTypingRef.current = now;

      socket.emit("typing", {
        conversationId,
        receiverId,
        isTyping,
      });
    },
    [conversationId, receiverId]
  );

  return { isOtherTyping, emitTyping };
}

// Empty object constant to avoid creating new references
const EMPTY_READ_STATUS = {};

/**
 * Hook to manage read receipts
 * Uses conversation store for persistence across navigation
 */
export function useReadReceipts(conversationId) {
  const { user } = useAuthStore();
  const [localReadStatus, setLocalReadStatus] = useState({});

  // Import dynamically to avoid circular dependency
  const { useConversationStore } = require("@/store/useConversationStore");
  const allReadReceipts = useConversationStore((state) => state.readReceipts);
  const updateReadReceipt = useConversationStore((state) => state.updateReadReceipt);

  // Get read receipts for this conversation (use stable empty object if not found)
  const readReceipts = conversationId ? (allReadReceipts[conversationId] || EMPTY_READ_STATUS) : EMPTY_READ_STATUS;

  useEffect(() => {
    if (!conversationId) return;

    // Join conversation room for read receipts
    socket.emit("join", conversationId);

    const handleMessagesRead = ({ conversationId: convId, userId, lastReadAt }) => {
      if (convId === conversationId) {
        // Update the store which persists across navigation
        updateReadReceipt(conversationId, userId, lastReadAt);
        // Also update local state for immediate UI feedback
        setLocalReadStatus((prev) => ({
          ...prev,
          [userId]: lastReadAt,
        }));
      }
    };

    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [conversationId, updateReadReceipt]);

  const markAsRead = useCallback(() => {
    if (!conversationId || !user?.id) return;

    const lastReadAt = new Date().toISOString();
    socket.emit("markAsRead", {
      conversationId,
      userId: user.id,
      lastReadAt,
    });
  }, [conversationId, user?.id]);

  // Merge store read receipts with local state
  const mergedReadStatus = { ...readReceipts, ...localReadStatus };

  return { readStatus: mergedReadStatus, markAsRead };
}
