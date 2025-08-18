import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useConversationStore = create((set, get) => ({
  conversations: [],
  messages: [],
  activeConversation: null,
  loading: false,
  error: null,

  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),

  createConversation: async (receiverId) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/conversation/create`, {
        receiverId,
      });
      set((state) => ({
        conversations: [...state.conversations, res.data.newConversation],
        loading: false,
      }));
      return res.data.newConversation;
    } catch (err) {
      console.error(err);
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
        loading: false,
      });
      return res.data.conversation;
    } catch (err) {
      console.error(err);
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
      console.error(err);
      set({
        error: err.response?.data?.message || "Failed to fetch conversation",
        loading: false,
      });
    }
  },

  sendMessage: async (senderId, receiverId, conversationId, content, file) => {
    try {
      let fileUrl = null;
      let fileType = null;

      // Upload attachment if exists
      if (file) {
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

      // Build payload dynamically
      const payload = { receiverId };
      if (content) payload.content = content;
      if (fileUrl) {
        payload.attachmentUrl = fileUrl;
        payload.attachmentType = fileType;
      }

      // Prevent sending empty messages
      if (!payload.content && !payload.attachmentUrl) {
        throw new Error("Cannot send empty message");
      }

      // Send message to backend (backend emits it via socket)
      await axios.post(
        `${API_URL}/conversation/send-message/${conversationId}`,
        payload,
        { withCredentials: true }
      );

      // No need to update state here; socket will handle incoming message
    } catch (err) {
      console.error("Failed to send message:", err);
      set((state) => ({
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to send message",
      }));
    }
  },

  getMessages: async (conversationId, cursor = null, limit = 20) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(
        `${API_URL}/conversation/get-messages/${conversationId}`,
        {
          params: { cursor, limit },
          withCredentials: true,
        }
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
    } catch (err) {
      console.error(err);
      set({
        error: err.response?.data?.message || "Failed to load messages",
        loading: false,
      });
    }
  },
}));
