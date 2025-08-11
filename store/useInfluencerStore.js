import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useInfluencerStore = create((set, get) => ({
  profile: null,

  createInfluencerProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/influencer/create-profile`,
        profileData
      );

      const createdProfile = response.data;
      toast.success("Influencer profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create Influencer profile. Please try again."
      );
    }
  },

  getInfluencerProfileByUsername: async (username) => {
    try {
      const response = await axios.get(
        `${API_URL}/influencer/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching influencer profile by username:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch influencer profile by username. Please try again."
      );
    }
  },

  addRecentContent: async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/influencer/recent-content`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Merge the new content into state
      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            recentContent: [
              ...(state.profile.data.recentContent || []),
              response.data.recentContent,
            ],
          },
        },
      }));

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
  deleteRecentContent: async (id) => {
    try {
      const res = await axios.post(
        `${API_URL}/influencer/delete-recent-content/${id}`
      );

      set((state) => {
        if (!state.profile?.data?.recentContent) return state;

        return {
          profile: {
            ...state.profile,
            data: {
              ...state.profile.data,
              recentContent: state.profile.data.recentContent.filter(
                (item) => item.id !== id
              ),
            },
          },
        };
      });

      toast.success(res.data?.message || "Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete content. Please try again."
      );
    }
  },

  addCampaign: async (campaignData) => {
    try {
      const res = await axios.post(
        `${API_URL}/influencer/add-campaign`,
        campaignData
      );

      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile?.data,
            campaigns: [
              ...(state.profile?.data?.campaigns || []),
              ...(res.data?.campaigns || []),
            ],
          },
        },
      }));

      toast.success(res.data?.message || "Campaign added successfully!");
    } catch (error) {
      console.error("Error adding campaign:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add campaign. Please try again."
      );
    }
  },
  deleteCampaign: async (campaignId) => {
    try {
      await axios.delete(`${API_URL}/influencer/delete-campaign/${campaignId}`);

      set((state) => ({
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            campaigns:
              state.profile?.campaigns?.filter(
                (campaign) => campaign.id !== campaignId
              ) || [],
          },
        },
      }));

      toast.success("Campaign deleted successfully");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign");
    }
  },
}));
