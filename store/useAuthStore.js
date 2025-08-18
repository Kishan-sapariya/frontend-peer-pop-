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

  signup: async (user) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });
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
      const res = await axios.post(`${API_URL}/auth/login`, user);
      const parsedRes = res.data;

      if (parsedRes.success) {
        const userRes = await axios.get(`${API_URL}/auth/me`);
        const fullUser = userRes.data.user;

        set({ isAuthenticated: true, user: fullUser });

        socket.emit("join", fullUser.id);

        toast.success(parsedRes.message);
      } else {
        toast.error(parsedRes.message);
      }

      return parsedRes;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed",
      };
    }
  },

  verifyOtp: async (user) => {
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, user);
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
      const res = await axios.post(`${API_URL}/auth/logout`);
      const parsedRes = res.data;
      set({ isAuthenticated: false, user: null, signedUpEmail: "" });
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
        set({ isAuthenticated: true, user: parsedRes.user });

        socket.emit("join", parsedRes.user.id);
      } else {
        set({ isAuthenticated: false, user: null });
      }

      return parsedRes;
    } catch (error) {
      set({ isAuthenticated: false, user: null });
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to fetch current user",
      };
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
}));
