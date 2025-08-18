import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { connection } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useConnectionStore = create((set, get) => ({
  connections: [],
  isLoading: false,

  getConnections: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/connection/requests`);
      set({ connections: response.data.requests, isLoading: false });
    } catch (error) {
      console.error("Error fetching connections:", error);
      set({ isLoading: false });
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch connections. Please try again."
      );
    }
  },

  sendConnectionRequest: async (receiverId) => {
    try {
      const response = await axios.post(`${API_URL}/connection/send-request`, {
        receiverId,
      });

      const newConnection = response.data.request;
      set((state) => ({
        connections: [...state.connections, newConnection],
      }));

      toast.success("Connection request sent!");
      return newConnection;
    } catch (error) {
      console.error("Error send connection request:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send connection request. Please try again."
      );
    }
  },

  acceptRequest: async (connectionId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/connection/accept/${connectionId}`
      );

      const updated = response.data.updatedRequest;

      set((state) => ({
        ...state,
        connections: state.connections.map((conn) =>
          conn.id === connectionId ? { ...conn, status: updated.status } : conn
        ),
      }));
      toast.success("Connection request accepted");

      return updated;
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to accept request. Please try again."
      );
    }
  },
  rejectRequest: async (connectionId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/connection/reject/${connectionId}`
      );

      const updated = response.data.updatedRequest;

      set((state) => ({
        ...state,
        connections: state.connections.map((conn) =>
          conn.id === connectionId ? { ...conn, status: updated.status } : conn
        ),
      }));
      toast.success("Connection request reject");

      return updated;
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject request. Please try again."
      );
    }
  },
  deleteRequest: async (connectionId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/connection/delete-connection/${connectionId}`
      );
      const deletedRequest = response.data.deletedConnection;
      set((state) => ({
        ...state,
        connections: state.connections.filter(
          (conn) => conn.id !== connectionId
        ),
      }));
      toast.success("Connection deleted");

      return deletedRequest;
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to deleting request. Please try again."
      );
    }
  },
}));
