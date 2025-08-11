import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useFilmMakerStore = create((set) => ({
  profile: null,

  createFilmMakerProfile: async (profileData) => {
    try {
      const response = await axios.post(
        `${API_URL}/filmmaker/create-profile`,
        profileData
      );

      const createdProfile = response.data;
      toast.success("filmMaker profile created successfully!");
      return createdProfile;
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create filmMaker profile. Please try again."
      );
    }
  },

  getFilmMakerProfileByUsername: async (username) => {
    try {
      const response = await axios.get(
        `${API_URL}/filmmaker/profile/${username}`
      );
      const profile = response.data.profile;
      set({ profile: profile });
      return profile;
    } catch (error) {
      console.error("Error fetching filmMaker profile by username:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch filmMaker profile by username. Please try again."
      );
    }
  },
}));
