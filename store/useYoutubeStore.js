import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useYoutubeStore = create((set, get) => ({
  profile: null,
  recentContent: [],
  stats: [],

  createYoutubeProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/youtube/create-profile`,
        profileData
      );

      const createdProfile = response.data;
      toast.success("YouTube profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create YouTube profile. Please try again."
      );
    }
  },

  getYoutubeStats: async (profileId) => {
    try {
      const response = await axios.get(`${API_URL}/youtube/stats/${profileId}`);

      const stats = response.data.stats.stats;
      set({ stats: stats });
      return stats;
    } catch (error) {
      console.error("Error fetching YouTube profile stats:", error);
    }
  },

  getYoutubeProfileByUsername: async (username) => {
    try {
      if (!username) {
        toast.error("No username provided");
        return;
      }
      const response = await axios.get(
        `${API_URL}/youtube/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching YouTube profile by username:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch YouTube profile by username. Please try again."
      );
    }
  },

  addRecentContent: async (contentData) => {
    try {
      const response = await axios.post(
        `${API_URL}/youtube/recent-content`,
        contentData
      );

      toast.success("Content uploaded successfully!");
      return response.data;
    } catch (error) {
      console.error("Error uploading content:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to upload content. Please try again."
      );
    }
  },

  getRecentContent: async () => {
    try {
      const response = await axios.get(`${API_URL}/youtube/recent-content`);
      const parsedRes = response.data;
      set({ recentContent: response.data.content });
    } catch (error) {
      console.error("Error uploading content:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to upload content. Please try again."
      );
    }
  },

  deleteRecentContentById: async (contentId) => {
    try {
      if (!contentId) {
        toast.error("Invaild content Id or Id not provided");
        return;
      }
      const response = await axios.delete(
        `${API_URL}/youtube/recent-content/${contentId}`
      );
      const currentContent = Array.isArray(get().recentContent)
        ? get().recentContent
        : [];
      toast.success("content deleted successfully");
      set({
        recentContent: currentContent.filter(
          (content) => content.id !== contentId
        ),
      });
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete content. Please try again."
      );
    }
  },

  addCollaboration: async (collaborations) => {
    try {
      const response = await axios.patch(
        `${API_URL}/youtube/add-collaboration`,
        { collaborations }
      );

      const updatedUser = response.data.user;

      set({ profile: updatedUser });

      toast.success("Collaboration added!");
      return response.data;
    } catch (error) {
      console.error("Error adding collaboration:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add collaboration. Please try again."
      );
    }
  },
  deleteCollaboration: async (collabId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/youtube/delete-collaboration/${collabId}`
      );
      if (!collabId) {
        toast.error("No collab id provided");
      }
      const currentCollaboration = get().profile.data.collaborations || [];
      const filteredCollaboration = currentCollaboration.filter(
        (collab) => collab.id !== collabId
      );
      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            collaborations: filteredCollaboration,
          },
        },
      }));
      toast.success("Collab deleted!");
      return response.data;
    } catch (error) {
      console.error("Error deleting collab:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete collab. Please try again."
      );
    }
  },
  addAchievement: async (achievements) => {
    try {
      const response = await axios.patch(`${API_URL}/youtube/add-achievement`, {
        achievements,
      });

      const updatedUser = response.data.user;

      set({ profile: updatedUser });

      toast.success("Achievement added!");
      return response.data;
    } catch (error) {
      console.error("Error adding achievement:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add achievement. Please try again."
      );
    }
  },
  deleteAchievement: async (achievementId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/youtube/delete-achievement/${achievementId}`
      );
      if (!achievementId) {
        toast.error("No achievement id provided");
      }
      const currentAchievement = get().profile.data.achievements || [];
      const filteredAchievement = currentAchievement.filter(
        (achievement) => achievement.id !== achievementId
      );
      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            achievements: filteredAchievement,
          },
        },
      }));
      toast.success("Achievement deleted!");
      return response.data;
    } catch (error) {
      console.error("Error deleting Achievement:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete Achievement. Please try again."
      );
    }
  },
}));
