import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useBusinessStore = create((set, get) => ({
  businessProfileDetails: null,
  loading: false,

  getBusinessDetails: async (username) => {
    try {
      const res = await axios.get(
        `${API_URL}/business/get-business-profile/${username}`
      );
      set({ businessProfileDetails: res.data.user });
    } catch (error) {
      console.error("Error fetching business details:", error);
      toast.error("Error getting data");
    }
  },

  postBusinessDetails: async (
    basicInfo,
    contact,
    location,
    socials,
    gstNumber,
    panNumber,
    gstFile,
    panFile
  ) => {
    try {
      const formData = new FormData();
      formData.append("basicInfo", JSON.stringify(basicInfo));
      formData.append("contact", JSON.stringify(contact));
      formData.append("location", JSON.stringify(location));
      formData.append("socials", JSON.stringify(socials));
      if (gstNumber) formData.append("gstNumber", gstNumber);
      if (panNumber) formData.append("panNumber", panNumber);
      if (gstFile) formData.append("gstFile", gstFile);
      if (panFile) formData.append("panFile", panFile);

      const res = await axios.patch(
        `${API_URL}/business/update-business-profile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // backend sends profile = full businessProfile
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));

      toast.success("Profile details updated ✅");
    } catch (error) {
      console.error("Update business profile error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while updating profile"
      );
    }
  },

  updateBasicInfo: async (formData) => {
    try {
      set({ loading: true });

      const res = await axios.patch(
        `${API_URL}/business/update-basic-info`,
        formData
      );

      // backend sends profile = only updated fields
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: {
            ...state.businessProfileDetails?.businessProfile,
            ...res.data.profile,
          },
        },
        loading: false,
      }));

      toast.success("Business info updated ✅");
      return res.data.profile;
    } catch (err) {
      console.error("Error updating business info:", err);
      set({ loading: false });
      toast.error(err.response?.data?.message || "Failed to update info");
    }
  },

  updateSocials: async (formData) => {
    try {
      set({ loading: true });

      const res = await axios.patch(
        `${API_URL}/business/update-socials`,
        formData
      );

      // backend sends profile = only updated fields
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: {
            ...state.businessProfileDetails?.businessProfile,
            ...res.data.profile,
          },
        },
        loading: false,
      }));

      toast.success("Socials updated ✅");
      return res.data.profile;
    } catch (err) {
      console.error("Error updating socials:", err);
      set({ loading: false });
      toast.error(err.response?.data?.message || "Failed to update socials");
    }
  },

  reuploadDocuments: async (gstFile, panFile, gstNumber, panNumber) => {
    try {
      if (!gstNumber || !panNumber) {
        toast.error("GST number and PAN number are required");
        return;
      }

      const formData = new FormData();
      if (gstFile) formData.append("gstFile", gstFile);
      if (panFile) formData.append("panFile", panFile);

      formData.append("gstNumber", gstNumber);
      formData.append("panNumber", panNumber);

      const res = await axios.patch(
        `${API_URL}/business/reupload-docs`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // backend sends updated profile
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));

      toast.success("Documents re-uploaded ✅");
      return res.data.profile;
    } catch (err) {
      console.error("Error reuploading documents:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to re-upload documents"
      );
      throw err;
    }
  },

  updateServices: async (services) => {
    try {
      const res = await axios.patch(
        `${API_URL}/business/update-services`,
        { services },
        { withCredentials: true }
      );

      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));

      toast.success("Services updated ✅");
      return res.data.profile;
    } catch (err) {
      console.error("Error updating services:", err);
      toast.error(err.response?.data?.message || "Failed to update services");
      throw err;
    }
  },

  updateAchievements: async (achievements) => {
    try {
      const res = await axios.patch(
        `${API_URL}/business/update-achievements`,
        { achievements },
        { withCredentials: true }
      );

      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));

      toast.success("Achievements updated 🎉");
      return res.data.profile;
    } catch (err) {
      console.error("Error updating achievements:", err);
      toast.error(
        err.response?.data?.message || "Failed to update achievements"
      );
      throw err;
    }
  },

  deleteService: async (index) => {
    try {
      const res = await axios.delete(`${API_URL}/business/services/${index}`);
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));
      toast.success("Service deleted ✅");
    } catch (err) {
      console.error("Error deleting service:", err);
      toast.error(err.response?.data?.message || "Failed to delete service");
    }
  },

  deleteAchievement: async (index) => {
    try {
      const res = await axios.delete(
        `${API_URL}/business/achievements/${index}`
      );
      set((state) => ({
        businessProfileDetails: {
          ...state.businessProfileDetails,
          businessProfile: res.data.profile,
        },
      }));
      toast.success("Achievement deleted ✅");
    } catch (err) {
      console.error("Error deleting achievement:", err);
      toast.error(
        err.response?.data?.message || "Failed to delete achievement"
      );
    }
  },
}));
