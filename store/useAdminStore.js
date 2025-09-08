import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const useAdminStore = create((set) => ({
  businesses: [],
  loading: false,
  error: null,

  // ✅ Fetch all businesses for verification
  fetchBusinesses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/admin/businesses-verification`, {
        withCredentials: true,
      });
      set({ businesses: res.data.businesses, loading: false });
    } catch (error) {
      console.error("Error fetching businesses:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch businesses",
        loading: false,
      });
    }
  },

  // ✅ Update status (VERIFY | UNVERIFY | REJECT)
  updateBusinessStatus: async (businessId, action, rejectionReason = null) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.patch(
        `${API_URL}/admin/business/${businessId}/status`,
        { action, rejectionReason },
        { withCredentials: true }
      );

      const updatedBusiness = res.data.business;

      // Update local state (replace only updated business)
      set((state) => ({
        businesses: state.businesses.map((b) =>
          b.id === businessId ? { ...b, ...updatedBusiness } : b
        ),
        loading: false,
      }));

      return res.data;
    } catch (error) {
      console.error("Error updating business status:", error);
      set({
        error:
          error.response?.data?.message || "Failed to update business status",
        loading: false,
      });
    }
  },
}));
