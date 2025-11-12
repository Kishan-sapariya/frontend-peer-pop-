import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useWaitlistStore = create((set, get) => ({
  formData: {
    name: "",
    email: "",
    role: "",
  },

  loading: false,

  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  resetForm: () =>
    set({
      formData: { name: "", email: "", role: "" },
    }),

  submitWaitlist: async () => {
    const { formData, resetForm } = get();
    const { name, email, role } = formData;

    if (!name || !email || !role) return;

    set({ loading: true });

    try {
      const res = await axios.post(`${API_URL}/waitlist`, formData);
      const data = res.data;

      // success case
      resetForm();
      return data;
    } catch (err) {
      // log full error for debugging
      console.error("Waitlist submission failed:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      // if backend sent a response, return that so frontend can show real msg
      if (err.response?.data) {
        return err.response.data;
      }

      // fallback for network/unknown errors
      return {
        ok: false,
        message: "Network error. Please try again.",
      };
    } finally {
      set({ loading: false });
    }
  },
}));
