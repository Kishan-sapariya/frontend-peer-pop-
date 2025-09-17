import socket from "@/lib/socket";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  signedUpEmail: "",
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
      console.log("📤 Sending login request:", user.email);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // important for cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      console.log("📥 Login response status:", res.status);

      // Check cookies in the browser after response
      console.log("🍪 Browser cookies:", document.cookie);

      const parsedRes = await res.json();
      console.log("📄 Parsed login response:", parsedRes);

      if (parsedRes.success) {
        console.log("✅ Login successful for:", user.email);
        // Update authentication state immediately after successful login
        set({ 
          isAuthenticated: true, 
          user: parsedRes.user 
        });
      } else {
        console.warn("⚠️ Login failed:", parsedRes.message);
      }

      return parsedRes;
    } catch (error) {
      console.error("🔥 Login error:", error);
      return { success: false, message: "Login failed" };
    }
  },

  verifyOtp: async (user) => {
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, user, {
        withCredentials: true,
      });
      const parsedRes = res.data;
      if (parsedRes.success) {
        set({ isAuthenticated: true, user: parsedRes.user, signedUpEmail: "" });
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
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const parsedRes = res.data;
      set({ isAuthenticated: false, user: null, signedUpEmail: "" });

      // Disconnect socket on logout
      socket.disconnect();

      toast.success(parsedRes.message || "Logged out successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  getCurrentUser: async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      const parsedRes = res.data;

      if (parsedRes.user) {
        set({ 
          isAuthenticated: true, 
          user: parsedRes.user,
          isInitialized: true 
        });

        // Connect socket if not already connected
        if (!socket.connected) {
          socket.connect();
        }
        socket.emit("join", parsedRes.user.id);
      } else {
        set({ 
          isAuthenticated: false, 
          user: null,
          isInitialized: true 
        });
      }

      return parsedRes;
    } catch (error) {
      console.error("getCurrentUser error:", error);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        set({ 
          isAuthenticated: false, 
          user: null,
          isInitialized: true 
        });
      }
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to fetch current user",
      };
    }
  },

  // Initialize auth state on app start
  initializeAuth: async () => {
    const { isInitialized } = get();
    if (!isInitialized) {
      await get().getCurrentUser();
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

  fetchSearchResults: async (q, creatorType, location, limit = 10) => {
    try {
      set({ loading: true });

      const res = await axios.get(`${API_URL}/auth/search`, {
        params: {
          q: q?.trim() || undefined, // only add if not empty
          creatorType: Array.isArray(creatorType)
            ? creatorType.join(",") // ✅ backend expects string (comma-separated)
            : creatorType || undefined,
          location: Array.isArray(location)
            ? location.join(",") // ✅ same for location
            : location || undefined,
          limit,
        },
      });

      const results = (res.data.users || [])
        .map((user) => {
          if (user.creatorProfile) {
            return {
              type: "CREATOR",
              id: user.id,
              username: user.username,
              image: user.image,
              creatorType: user.creatorProfile.creatorType,
              data: user.creatorProfile.data,
            };
          }
          if (user.businessProfile) {
            return {
              type: "BUSINESS",
              id: user.id,
              username: user.username,
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
    const { cursor, hasMore, query, creatorType, location, results } = get();
    if (!hasMore || !cursor) return;

    try {
      set({ loading: true });

      const res = await axios.get(`${API_URL}/search`, {
        params: { q: query, creatorType, location, cursor, limit: 10 },
      });

      set({
        results: [...results, ...(res.data.users || [])],
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