import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

let socket;

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
        connections: state.connections.map((conn) =>
          conn.id === connectionId ? { ...conn, status: updated.status } : conn
        ),
      }));
      toast.success("Connection request rejected");

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
        connections: state.connections.filter((c) => c.id !== connectionId),
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

  getPendingCount: () => {
    const { connections } = get();
    const { user } = useAuthStore.getState();

    if (!user) return 0;

    return connections.filter(
      (c) => c.status === "PENDING" && c.receiverId === user.id
    ).length;
  },

  listenForSocketEvents: () => {
    if (socket) return; // don’t re-initialize

    socket = io(API_URL, { withCredentials: true });

    socket.on("connection:pendingUpdated", (data) => {
      const { type, request, connectionId } = data;
      set((state) => {
        let updatedConnections = [...state.connections];

        if (type === "NEW_REQUEST") {
          const { user } = useAuthStore.getState();
          if (request.receiverId === user.id) {
            updatedConnections.push(request);
          }
        }

        if (type === "REQUEST_ACCEPTED" || type === "REQUEST_REJECTED") {
          updatedConnections = updatedConnections.map((conn) =>
            conn.id === connectionId
              ? {
                  ...conn,
                  status: type === "REQUEST_ACCEPTED" ? "ACCEPTED" : "REJECTED",
                }
              : conn
          );
        }

        if (type === "CONNECTION_DELETED") {
          updatedConnections = updatedConnections.filter(
            (conn) => conn.id !== connectionId
          );
        }

        return { connections: updatedConnections };
      });
    });
  },

  subscribeToConnectionUpdates: () => {
    socket.on("connection:pendingUpdated", (data) => {
      console.log("🔔 Connection update:", data);
      const { type, request, connectionId } = data;

      set((state) => {
        switch (type) {
          case "NEW_REQUEST":
            return { connections: [...state.connections, request] };

          case "REQUEST_ACCEPTED":
            return {
              connections: state.connections.map((conn) =>
                conn.id === connectionId
                  ? { ...conn, status: "ACCEPTED" }
                  : conn
              ),
            };

          case "REQUEST_REJECTED":
            return {
              connections: state.connections.map((conn) =>
                conn.id === connectionId
                  ? { ...conn, status: "REJECTED" }
                  : conn
              ),
            };

          case "CONNECTION_DELETED":
            return {
              connections: state.connections.filter(
                (conn) => conn.id !== connectionId
              ),
            };

          default:
            return state;
        }
      });
    });
  },
}));
