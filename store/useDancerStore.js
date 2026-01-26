import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useDancerStore = create((set) => ({
  profile: null,

  createDancerProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/dancer/create-profile`,
        {data:profileData}
      );

      const createdProfile = response.data;
      toast.success("Dancer profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create Dancer profile. Please try again."
      );
    }
  },

  getDancerProfileByUsername: async (username) => {
    try {
      const response = await axios.get(
        `${API_URL}/dancer/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching Dancer profile by username:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch Dancer profile by username. Please try again."
      );
    }
  },
}));
