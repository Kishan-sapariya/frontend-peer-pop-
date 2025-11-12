import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const useGroupStore = create((set) => ({
  groups: [],
  isLoading: false,
  isCreating: false,
  error: null,

  createGroup: async ({ name, desc, joinType }) => {
    set({ isCreating: true });
    try {
      const res = await axios.post(
        `${API_URL}/group/create-group`,
        { name, desc, joinType },
        { withCredentials: true }
      );
      const newGroup = await res.data.group;
      set((state) => ({
        groups: [newGroup, ...state.groups],
        isCreating: false,
      }));
      return newGroup;
    } catch (error) {
      console.error("Error creating group:", error);
      set({
        error: error.response?.data?.message || "Failed to create group",
        isCreating: false,
      });
      throw error;
    }
  },
}));
