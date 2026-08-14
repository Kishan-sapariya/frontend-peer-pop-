import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { showApiError } from "@/utils/showApiError";

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

  // Dashboard stats state
  waitlistStats: null,
  userStats: null,
  statsMonths: 6,

  // Registered users state
  users: [],
  usersPagination: null,
  usersLoading: false,
  usersFilters: {
    role: "",
    search: "",
    page: 1,
    limit: 10,
  },

  // Email composer state
  recipients: [],
  recipientsLoading: false,
  sendingEmail: false,

  // Fetch waitlist aggregated stats
  fetchWaitlistStats: async (months) => {
    try {
      const m = months ?? get().statsMonths;
      const response = await axios.get(
        `${API_URL}/admin/waitlist/stats?months=${m}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        set({ waitlistStats: response.data.stats });
      }
    } catch (error) {
      console.error("Error fetching waitlist stats:", error);
    }
  },

  // Fetch registered-user aggregated stats
  fetchUserStats: async (months) => {
    try {
      const m = months ?? get().statsMonths;
      const response = await axios.get(
        `${API_URL}/admin/users/stats?months=${m}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        set({ userStats: response.data.stats });
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  },

  // Set the month window for charts and refetch both stat sets
  setStatsMonths: (months) => {
    set({ statsMonths: months });
    get().fetchWaitlistStats(months);
    get().fetchUserStats(months);
  },

  // Fetch paginated registered users
  fetchUsers: async (customFilters = {}) => {
    try {
      set({ usersLoading: true });
      const usersFilters = { ...get().usersFilters, ...customFilters };
      set({ usersFilters });

      const params = new URLSearchParams();
      if (usersFilters.role) params.append("role", usersFilters.role);
      if (usersFilters.search) params.append("search", usersFilters.search);
      params.append("page", usersFilters.page);
      params.append("limit", usersFilters.limit);

      const response = await axios.get(
        `${API_URL}/admin/users?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        set({
          users: response.data.users,
          usersPagination: response.data.pagination,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 403) {
        toast.error("Access denied. Admin only.");
      } else {
        toast.error("Failed to fetch users");
      }
    } finally {
      set({ usersLoading: false });
    }
  },

  // Set registered-user filters (resets to page 1)
  setUsersFilters: (newFilters) => {
    set((state) => ({
      usersFilters: { ...state.usersFilters, ...newFilters, page: 1 },
    }));
  },

  // Set registered-user page
  setUsersPage: (page) => {
    set((state) => ({
      usersFilters: { ...state.usersFilters, page },
    }));
  },

  // Load every user matching filters (no pagination) for the email composer
  fetchRecipients: async ({ role = "", search = "" } = {}) => {
    try {
      set({ recipientsLoading: true });
      const params = new URLSearchParams();
      if (role) params.append("role", role);
      if (search) params.append("search", search);

      const response = await axios.get(
        `${API_URL}/admin/recipients?${params.toString()}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        set({ recipients: response.data.recipients });
      }
      return response.data?.recipients || [];
    } catch (error) {
      console.error("Error fetching recipients:", error);
      showApiError(error, "Couldn't load recipients. Please try again.");
      return [];
    } finally {
      set({ recipientsLoading: false });
    }
  },

  // Send an admin-composed email to the selected users (admin only)
  sendBulkEmail: async ({ userIds, subject, message, regards }) => {
    try {
      set({ sendingEmail: true });
      const response = await axios.post(
        `${API_URL}/admin/send-email`,
        { userIds, subject, message, regards },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Email sent");
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      showApiError(error, "Couldn't send the email. Please try again.");
      return { success: false };
    } finally {
      set({ sendingEmail: false });
    }
  },

  // Manually (re)send the welcome email to an existing user (admin only)
  sendWelcomeMail: async (userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/users/${userId}/welcome-email`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data?.message || "Welcome email sent");
      return true;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      showApiError(error, "Couldn't send the welcome email. Please try again.");
      return false;
    }
  },

  // Promote/demote the singleton founder (admin only)
  setFounder: async (userId, isFounder) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/users/${userId}/founder`,
        { isFounder },
        { withCredentials: true }
      );
      if (response.data.success) {
        // Reflect singleton semantics locally: only the target is founder
        set((state) => ({
          users: state.users.map((u) => ({
            ...u,
            isFounder: u.id === userId ? isFounder : isFounder ? false : u.isFounder,
          })),
        }));
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error("Error setting founder:", error);
      toast.error(error.response?.data?.message || "Failed to update founder");
      return error.response?.data || { success: false };
    }
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
