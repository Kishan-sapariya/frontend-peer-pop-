import socket from "@/lib/socket";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  signedUpEmail:
    typeof window !== "undefined"
      ? sessionStorage.getItem("signedUpEmail") || ""
      : "",
  results: [],
  loading: false,
  hasMore: true,
  cursor: null,
  query: "",
  creatorType: undefined,
  location: undefined,
  isInitialized: false,

  signup: async (user) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          companyName: user.companyName || null,
          industry: user.industry || null,
          companySize: user.companySize || null,
        },
        { withCredentials: true }
      );
      const parsedRes = res.data;
      if (parsedRes?.success) {
        toast.success(parsedRes.message);
        // Persist email to sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("signedUpEmail", user.email);
        }
      } else {
        toast.error(parsedRes.message);
      }
      set({ signedUpEmail: user.email });
      return parsedRes;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      return {
        success: false,
        message: error?.response?.data?.message || "Signup failed",
      };
    }
  },

  login: async (user) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, user, {
        withCredentials: true,
      });
      const parsedRes = res.data;

      if (parsedRes.success) {
        await get().getCurrentUser();

        toast.success(parsedRes.message || "Login successful");
        return parsedRes;
      } else {
        toast.error(parsedRes.message || "Login failed");
        return parsedRes;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
      return { success: false, message: "Login failed" };
    }
  },

  getCurrentUser: async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      const parsedRes = res.data;

      if (parsedRes.user) {
        set({
          isAuthenticated: true,
          user: parsedRes.user,
          isInitialized: true,
        });

        if (!socket.connected && parsedRes.user) {
          socket.connect();
          socket.emit("join", parsedRes.user.id);
        }
      } else {
        set({
          isAuthenticated: false,
          user: null,
          isInitialized: true,
        });
      }

      return parsedRes;
    } catch (error) {
      const status = error?.response?.status;
      // 401/403 just means "not logged in" on initial load — expected, not an error.
      if (status === 401 || status === 403) {
        set({
          isAuthenticated: false,
          user: null,
        });
      } else {
        // Only log genuinely unexpected failures (network errors, 500s, etc.)
        console.error("getCurrentUser error:", error);
      }
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to fetch current user",
      };
    } finally {
      set({ isInitialized: true });
    }
  },

  verifyOtp: async (user) => {
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, user, {
        withCredentials: true,
      });
      const parsedRes = res.data;

      if (parsedRes.success) {
        await get().getCurrentUser();
        set({ signedUpEmail: "" });
        // Clear from sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("signedUpEmail");
        }

        toast.success(parsedRes.message);
      } else {
        toast.error(parsedRes.message);
      }

      return parsedRes;
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
      return {
        success: false,
        message: error?.response?.data?.message || "OTP verification failed",
      };
    }
  },

  logout: async () => {
    // Get user ID BEFORE clearing state
    const currentUserId = get().user?.id;

    try {
      // Emit leave event FIRST so others get notified immediately
      if (currentUserId && socket.connected) {
        socket.emit("leave", currentUserId);
        // Small delay to ensure the leave event is sent before disconnecting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      socket.disconnect();

      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const parsedRes = res.data;

      set({ isAuthenticated: false, user: null, signedUpEmail: "" });
      // Clear from sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("signedUpEmail");
      }

      toast.success(parsedRes.message || "Logged out successfully!");
    } catch (error) {
      // Still clear state even if API call fails
      set({ isAuthenticated: false, user: null, signedUpEmail: "" });
      socket.disconnect();
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  initializeAuth: async () => {
    const { isInitialized } = get();
    if (!isInitialized) {
      try {
        await get().getCurrentUser();
      } finally {
        set({ isInitialized: true });
      }
    }
  },

  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${API_URL}/auth/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set((state) => ({
        user: {
          ...state.user,
          image: response.data.user.image,
        },
      }));

      toast.success("Image uploaded successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Upload image failed");
    }
  },
  deleteImage: async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/auth/delete-profile-picture`
      );
      set((state) => ({
        user: {
          ...state.user,
          image: response.data.user.image,
        },
      }));
      toast.success("Profile picture deleted");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "image deletion failed");
    }
  },
  uploadCoverImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${API_URL}/auth/upload-cover-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set((state) => ({
        user: {
          ...state.user,
          coverImage: response.data.user.coverImage,
        },
      }));

      toast.success("Cover Image uploaded successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Upload cover image failed"
      );
    }
  },

  resetSearch: () =>
    set({
      results: [],
      loading: false,
      hasMore: true,
      cursor: null,
    }),

  fetchSearchResults: async (q, creatorType, location, tier, limit = 10) => {
    try {
      set({ loading: true });

      // Build params object, only including non-empty values
      const params = {
        limit,
      };

      // Only add q if it has a value
      if (q && q.trim()) {
        params.q = q.trim();
      }

      // Only add creatorType if it has a value
      if (creatorType) {
        params.creatorType = Array.isArray(creatorType)
          ? creatorType.join(",")
          : creatorType;
      }

      // Only add location if it has a value
      if (location) {
        params.location = Array.isArray(location)
          ? location.join(",")
          : location;
      }

      // Filter by completion tier (Rising/Elite/Pro)
      if (tier && (Array.isArray(tier) ? tier.length : tier)) {
        params.tier = Array.isArray(tier) ? tier.join(",") : tier;
      }

      const res = await axios.get(`${API_URL}/auth/search`, { params });

      const results = (res.data.users || [])
        .map((user) => {
          if (user.isFounder) {
            return {
              type: "FOUNDER",
              id: user.id,
              username: user.username,
              image: user.image,
              headline: user.founderProfile?.headline || null,
              location: user.founderProfile?.location || null,
            };
          }
          if (user.creatorProfile) {
            // Extract location information from the new structure
            const personalInfo = user.creatorProfile.data?.personalInfo || {};
            const locationParts = [];

            if (personalInfo.customCity) {
              locationParts.push(personalInfo.customCity);
            } else if (personalInfo.city) {
              locationParts.push(personalInfo.city);
            }

            if (personalInfo.state) {
              locationParts.push(personalInfo.state);
            }

            const locationString = locationParts.join(", ");

            return {
              type: "CREATOR",
              id: user.id,
              username: user.username,
              image: user.image,
              creatorType: user.creatorProfile.creatorType,
              data: user.creatorProfile.data,
              location: locationString || null,
              tier: user.tier || user.creatorProfile.data?.completionTier || null,
            };
          }
          if (user.businessProfile) {
            return {
              type: "BUSINESS",
              id: user.id,
              username: user.username,
              image: user.image,
              companyName: user.businessProfile.companyName,
              industry: user.businessProfile.industry,
              size: user.businessProfile.size,
              headquarters: user.businessProfile.headquarters,
            };
          }
          return null;
        })
        .filter(Boolean);

      set({
        results,
        cursor: res.data.nextCursor,
        hasMore: !!res.data.nextCursor,
        query: q,
        creatorType,
        location,
      });
    } catch (err) {
      console.error("Search error:", err);
      toast.error(err.response?.data?.message || "Failed to search users");
    } finally {
      set({ loading: false });
    }
  },

  loadMore: async () => {
    const { cursor, hasMore, query, creatorType, location, results, loading } = get();
    if (!hasMore || !cursor || loading) return;

    try {
      set({ loading: true });

      const res = await axios.get(`${API_URL}/auth/search`, {
        params: { q: query, creatorType, location, cursor, limit: 10 },
      });

      const newResults = (res.data.users || [])
        .map((user) => {
          if (user.isFounder) {
            return {
              type: "FOUNDER",
              id: user.id,
              username: user.username,
              image: user.image,
              headline: user.founderProfile?.headline || null,
              location: user.founderProfile?.location || null,
            };
          }
          if (user.creatorProfile) {
            const personalInfo = user.creatorProfile.data?.personalInfo || {};
            const locationParts = [];

            if (personalInfo.customCity) {
              locationParts.push(personalInfo.customCity);
            } else if (personalInfo.city) {
              locationParts.push(personalInfo.city);
            }

            if (personalInfo.state) {
              locationParts.push(personalInfo.state);
            }

            const locationString = locationParts.join(", ");

            return {
              type: "CREATOR",
              id: user.id,
              username: user.username,
              image: user.image,
              creatorType: user.creatorProfile.creatorType,
              data: user.creatorProfile.data,
              location: locationString || null,
              tier: user.tier || user.creatorProfile.data?.completionTier || null,
            };
          }
          if (user.businessProfile) {
            return {
              type: "BUSINESS",
              id: user.id,
              username: user.username,
              image: user.image,
              companyName: user.businessProfile.companyName,
              industry: user.businessProfile.industry,
              size: user.businessProfile.size,
              headquarters: user.businessProfile.headquarters,
            };
          }
          return null;
        })
        .filter(Boolean);

      set({
        results: [...results, ...newResults],
        cursor: res.data.nextCursor,
        hasMore: !!res.data.nextCursor,
      });
    } catch (err) {
      console.error("Load more search error:", err);
      toast.error(err.response?.data?.message || "Failed to load more results");
    } finally {
      set({ loading: false });
    }
  },

  toggleVisibility: async () => {
    try {
      const res = await axios.patch(`${API_URL}/account/visibility`);
      const newVisibility = res.data?.user?.visibility;

      set((state) => ({
        user: {
          ...state.user,
          visibility: newVisibility,
        },
      }));

      toast.success("Visibility changed");
      return newVisibility;
    } catch (error) {
      console.error(error);
      toast.error("Error toggling visibility");
      throw error;
    }
  },
}));
