import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { showApiError } from "@/utils/showApiError";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useMusicianStore = create((set) => ({
  profile: null,

  createMusicianProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/musician/create-profile`,
        {data:profileData}
      );

      const createdProfile = response.data;
      toast.success("musician profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating musician profile:", error);
      showApiError(error, "Failed to create musician profile. Please try again.");
    }
  },

  getMusicianProfileByUsername: async (username) => {
    try {
      const response = await axios.get(
        `${API_URL}/musician/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching musician profile by username:", error);
      showApiError(
        error,
        "Failed to fetch musician profile by username. Please try again."
      );
    }
  },
}));
