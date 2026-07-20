import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { showApiError } from "@/utils/showApiError";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useFounderStore = create((set, get) => ({
  founder: null, // { id, username, image, coverImage, founderProfile: { ...media[] } }
  loading: false,
  saving: false,
  uploading: false,

  // Fetch the founder profile by username
  fetchFounderProfile: async (username) => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_URL}/founder/profile/${username}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        set({ founder: res.data.user });
      }
      return res.data;
    } catch (error) {
      console.error("Error fetching founder profile:", error);
      if (error.response?.status !== 404) {
        showApiError(error, "Failed to load founder profile");
      }
      return error.response?.data || { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // Update text / socials / milestones (founder only)
  updateFounderProfile: async (payload) => {
    try {
      set({ saving: true });
      const res = await axios.patch(
        `${API_URL}/founder/update-profile`,
        payload,
        { withCredentials: true }
      );
      if (res.data.success) {
        // Merge updated profile into current founder object
        set((state) => ({
          founder: state.founder
            ? { ...state.founder, founderProfile: res.data.profile }
            : state.founder,
        }));
        toast.success("Profile updated ✅");
      }
      return res.data;
    } catch (error) {
      console.error("Error updating founder profile:", error);
      showApiError(error, "Failed to update profile");
      return error.response?.data || { success: false };
    } finally {
      set({ saving: false });
    }
  },

  // Upload a gallery image or showcase video (founder only)
  uploadFounderMedia: async (file, type, caption = "") => {
    try {
      set({ uploading: true });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type); // "IMAGE" | "VIDEO"
      if (caption) formData.append("caption", caption);

      const res = await axios.post(`${API_URL}/founder/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        // Prepend new media to the founder's media list
        set((state) => {
          if (!state.founder?.founderProfile) return state;
          return {
            founder: {
              ...state.founder,
              founderProfile: {
                ...state.founder.founderProfile,
                media: [
                  res.data.media,
                  ...(state.founder.founderProfile.media || []),
                ],
              },
            },
          };
        });
        toast.success(`${type === "VIDEO" ? "Video" : "Image"} uploaded ✅`);
      }
      return res.data;
    } catch (error) {
      console.error("Error uploading founder media:", error);
      showApiError(error, "Upload failed");
      return error.response?.data || { success: false };
    } finally {
      set({ uploading: false });
    }
  },

  // Delete a piece of media (founder only)
  deleteFounderMedia: async (mediaId) => {
    try {
      const res = await axios.delete(`${API_URL}/founder/media/${mediaId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        set((state) => {
          if (!state.founder?.founderProfile) return state;
          return {
            founder: {
              ...state.founder,
              founderProfile: {
                ...state.founder.founderProfile,
                media: (state.founder.founderProfile.media || []).filter(
                  (m) => m.id !== mediaId
                ),
              },
            },
          };
        });
        toast.success("Media deleted");
      }
      return res.data;
    } catch (error) {
      console.error("Error deleting founder media:", error);
      showApiError(error, "Failed to delete media");
      return error.response?.data || { success: false };
    }
  },
}));
