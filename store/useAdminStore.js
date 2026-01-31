import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const useAdminStore = create((set, get) => ({
  // Waitlist state
  waitlist: [],
  pagination: null,
  isLoading: false,
  filters: {
    status: "",
    role: "",
    search: "",
    page: 1,
    limit: 10,
  },

  // Fetch waitlist
  fetchWaitlist: async (customFilters = {}) => {
    try {
      set({ isLoading: true });
      const filters = { ...get().filters, ...customFilters };
      set({ filters });

      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.role) params.append("role", filters.role);
      if (filters.search) params.append("search", filters.search);
      params.append("page", filters.page);
      params.append("limit", filters.limit);

      const response = await axios.get(
        `${API_URL}/admin/waitlist?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        set({
          waitlist: response.data.waitlist,
          pagination: response.data.pagination,
        });
      }
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      if (error.response?.status === 403) {
        toast.error("Access denied. Admin only.");
      } else {
        toast.error("Failed to fetch waitlist");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Update waitlist status
  updateWaitlistStatus: async (id, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/waitlist/${id}/status`,
        { status },
        { withCredentials: true }
      );

      if (response.data.success) {
        set((state) => ({
          waitlist: state.waitlist.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        }));
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  },

  // Delete waitlist entry
  deleteWaitlistEntry: async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/admin/waitlist/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        set((state) => ({
          waitlist: state.waitlist.filter((item) => item.id !== id),
        }));
        toast.success("Entry deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete entry");
    }
  },

  // Set filters
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    }));
  },

  // Set page
  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
  },
}));
