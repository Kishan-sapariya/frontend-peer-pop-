import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import socket from "@/lib/socket";
import { showApiError } from "@/utils/showApiError";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useConversationStore = create((set, get) => ({
  conversations: [],
  messages: [],
  activeConversation: null,
  publicUsers: [],
  publicUsersLoading: false,
  loading: false,
  error: null,
  // Store read receipts per conversation: { conversationId: { odsverId: lastReadAt } }
  readReceipts: {},

  getUnreadCount: () => {
    const { conversations } = get();
    return conversations.filter(
      (c) =>
        c.lastMessage && !c.lastMessage.readBy?.includes(get().currentUserId)
    ).length;
  },

  setMessages: (updater) =>
    set((state) => {
      const newMessages =
        typeof updater === "function" ? updater(state.messages) : updater;
      return { messages: newMessages };
    }),

  createConversation: async (receiverId) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/conversation/create`, {
        receiverId,
      });

      const newConv = res.data.conversation || res.data;

      set((state) => ({
        conversations: [...state.conversations, newConv],
        loading: false,
      }));

      return newConv;
    } catch (err) {
      console.error(err);
      showApiError(err, "Couldn't start the conversation. Please try again.");
      set({
        error: err.response?.data?.message || "Failed to create conversation",
        loading: false,
      });
    }
  },

  getConversation: async (conversationId) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(
        `${API_URL}/conversation/get/${conversationId}`
      );

      set({
        activeConversation: res.data.conversation,
        messages: res.data.conversation.messages || [],
        loading: false,
      });

      return res.data.conversation;
    } catch (err) {
      console.error("Failed to fetch conversation:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch conversation",
        loading: false,
      });
    }
  },

  getAllConversation: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${API_URL}/conversation/get`);

      set({
        conversations: res.data.conversations,
        loading: false,
      });

      return res.data.conversations;
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch conversations",
        loading: false,
      });
    }
  },

  sendMessage: async (receiverId, conversationId, content, file) => {
    try {
      let fileUrl = null;
      let fileType = null;

      if (file && file instanceof File) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(
          `${API_URL}/conversation/upload-attachment`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        fileUrl = uploadRes.data.fileUrl;
        fileType = uploadRes.data.fileType;
      }

      const payload = { receiverId };
      if (content && content.trim()) payload.content = content.trim();
      if (fileUrl) {
        payload.attachmentUrl = fileUrl;
        payload.attachmentType = fileType;
      }

      if (!payload.content && !payload.attachmentUrl) {
        throw new Error("Cannot send empty message");
      }

      await axios.post(
        `${API_URL}/conversation/send-message/${conversationId}`,
        payload
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      showApiError(err, "Message failed to send. Please try again.");
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to send message",
      });
    }
  },

  getMessages: async (conversationId, cursor = null, limit = 20) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(
        `${API_URL}/conversation/get-messages/${conversationId}`,
        { params: { cursor, limit } }
      );

      const fetchedMessages = res.data.messages;

      set((state) => {
        if (cursor) {
          return {
            messages: [...state.messages, ...fetchedMessages],
            loading: false,
          };
        }
        return { messages: fetchedMessages, loading: false };
      });

      return fetchedMessages;
    } catch (err) {
      console.error("Failed to load messages:", err);
      set({
        error: err.response?.data?.message || "Failed to load messages",
        loading: false,
      });
    }
  },

  handleIncomingMessage: (message) => {
    set((state) => ({
      messages:
        state.activeConversation?.id === message.conversationId
          ? [...state.messages, message]
          : state.messages,
    }));
  },

  handleConversationUpdate: (update) => {
    set((state) => {
      const conversations = state.conversations.map((c) =>
        c.id === update.conversationId
          ? {
              ...c,
              lastMessage: update.lastMessage,
              unreadCount:
                state.activeConversation?.id === update.conversationId
                  ? 0
                  : (c.unreadCount || 0) + 1,
            }
          : c
      );

      return { conversations };
    });
  },
  getUnreadConversationCount: () => {
    const { conversations } = get();
    return conversations.filter((c) => (c.unreadCount || 0) > 0).length;
  },

  // Clear unread count for a specific conversation
  clearUnreadCount: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    }));
  },

  // Set active conversation (used for tracking which conversation is currently open)
  setActiveConversation: (conversationId) => {
    const { conversations } = get();
    const conversation = conversations.find((c) => c.id === conversationId);
    set({ activeConversation: conversation || { id: conversationId } });
  },

  // Clear active conversation (when leaving chat)
  clearActiveConversation: () => {
    set({ activeConversation: null });
  },

  // Update read receipt for a conversation
  updateReadReceipt: (conversationId, odsverId, lastReadAt) => {
    set((state) => ({
      readReceipts: {
        ...state.readReceipts,
        [conversationId]: {
          ...(state.readReceipts[conversationId] || {}),
          [odsverId]: lastReadAt,
        },
      },
    }));
  },

  // Get read receipts for a conversation
  getReadReceipts: (conversationId) => {
    return get().readReceipts[conversationId] || {};
  },

  getPublicUsersForChat: async (search = "") => {
    try {
      set({ publicUsersLoading: true, error: null });
      const res = await axios.get(`${API_URL}/conversation/public-users`, {
        params: { search, limit: 20 },
      });

      set({
        publicUsers: res.data.users,
        publicUsersLoading: false,
      });

      return res.data.users;
    } catch (err) {
      console.error("Failed to fetch public users:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch public users",
        publicUsersLoading: false,
      });
      return [];
    }
  },

  clearPublicUsers: () => set({ publicUsers: [], publicUsersLoading: false }),

  // Initialize socket listeners for real-time conversation updates
  initConversationSocket: () => {
    const user = useAuthStore.getState().user;
    if (!user?.id) return;

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", user.id);

    // Remove existing listeners to prevent duplicates
    socket.off("conversationUpdated");
    socket.off("receiveMessage");
    socket.off("messagesRead");

    // Listen for conversation updates (new messages, etc.)
    socket.on("conversationUpdated", (update) => {
      set((state) => {
        const conversations = state.conversations.map((c) =>
          c.id === update.conversationId
            ? {
                ...c,
                lastMessage: update.lastMessage,
                unreadCount:
                  state.activeConversation?.id === update.conversationId
                    ? 0
                    : (c.unreadCount || 0) + 1,
              }
            : c
        );
        return { conversations };
      });
    });

    // Also listen for new messages to update lastMessage and unread count
    socket.on("receiveMessage", (message) => {
      const { activeConversation } = get();
      const isActiveConversation = activeConversation?.id === message.conversationId;

      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === message.conversationId
            ? {
                ...c,
                lastMessage: message,
                // Only increment unread if not in the active conversation
                unreadCount: isActiveConversation ? 0 : (c.unreadCount || 0) + 1,
              }
            : c
        ),
      }));
    });

    // Listen for read receipts
    socket.on("messagesRead", ({ conversationId, odsverId, lastReadAt }) => {
      get().updateReadReceipt(conversationId, odsverId, lastReadAt);
    });

    // Fetch initial conversations
    get().getAllConversation();
  },
}));
