import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useComedianStore = create((set, get) => ({
  profile: null,

  createComedianProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/comedian/create-profile`,
        profileData
      );

      const createdProfile = response.data;
      toast.success("Comedian profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create Comedian profile. Please try again."
      );
    }
  },

  getComedianProfileByUsername: async (username) => {
    try {
      const response = await axios.get(
        `${API_URL}/comedian/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching comedian profile by username:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch comedian profile by username. Please try again."
      );
    }
  },
  addUpcomingShow: async (show) => {
    try {
      const response = await axios.post(
        `${API_URL}/comedian/add-upcoming-show`,
        show
      );
      toast.success("Content uploaded successfully!");
      return response.data;
    } catch (error) {
      console.error("Error adding upcoming show:", error);
      toast.error(
        error?.response?.data?.message || "Failed to add  upcoming show."
      );
    }
  },
  deleteShow: async (upcomingShowId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/comedian/delete-show/${upcomingShowId}`
      );
      if (!upcomingShowId) {
        toast.error("No id provided");
      }
      const currentShow = get().profile.data.upcomingShows || [];
      const filteredShow = currentShow.filter(
        (show) => show.id !== upcomingShowId
      );
      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            upcomingShows: filteredShow,
          },
        },
      }));
      toast.success("show deleted!");
      return response.data;
    } catch (error) {
      console.error("Error deleting show:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete show. Please try again."
      );
    }
  },
  addRecentSets: async (sets) => {
    try {
      const response = await axios.post(`${API_URL}/comedian/add-recent-sets`, {
        recentSets: sets,
      });

      toast.success("Sets uploaded successfully!");

      const newSets = Array.isArray(sets) ? sets : [sets];

      set((state) => {
        const currentRecentSets = state.profile?.data?.recentSets || [];
        return {
          profile: {
            ...state.profile,
            data: {
              ...state.profile.data,
              recentSets: [...newSets, ...currentRecentSets],
            },
          },
        };
      });

      return response.data;
    } catch (error) {
      console.error("Error adding recent set:", error);
      toast.error(
        error?.response?.data?.message || "Failed to add recent set."
      );
    }
  },
  deleteRecentSets: async (recentSetsId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/comedian/delete-sets/${recentSetsId}`
      );
      if (!recentSetsId) {
        toast.error("No id provided");
      }
      const currentSets = get().profile.data.recentSets || [];
      const filteredSets = currentSets.filter(
        (show) => show.id !== recentSetsId
      );
      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            recentSets: filteredSets,
          },
        },
      }));
      toast.success("set deleted!");
      return response.data;
    } catch (error) {
      console.error("Error deleting set:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete set. Please try again."
      );
    }
  },
  addAchievement: async (achievements) => {
    try {
      const response = await axios.patch(
        `${API_URL}/comedian/add-achievement`,
        {
          achievements,
        }
      );

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
        `${API_URL}/comedian/delete-achievement/${achievementId}`
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
