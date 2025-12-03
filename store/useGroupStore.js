import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const useGroupStore = create((set, get) => ({
  groups: {},
  groupPosts: {},
  joinRequests: {},
  createdGroupIds: [],
  joinedGroupIds: [],
  suggestedGroupIds: [],
  singleGroupId: null,

  isJoinRequestLoading: false,
  isLoading: false,
  isCreating: false,
  error: null,

  upsertGroup: (group) => {
    set((state) => {
      const existing = state.groups[group.id] || {};
      return {
        groups: {
          ...state.groups,
          [group.id]: {
            posts: existing.posts || [],
            ...existing,
            ...group,
          },
        },
      };
    });
  },
  upsertGroups: (groups) => {
    const map = {};
    groups.forEach((g) => (map[g.id] = g));
    set((state) => ({
      groups: { ...state.groups, ...map },
    }));
  },

  fetchGroupById: async (groupId) => {
    try {
      const res = await axios.get(`${API_URL}/group/${groupId}`);
      const group = res.data.group;

      get().upsertGroup(group);

      set({ singleGroupId: groupId });
    } catch (err) {
      console.error("Error fetching group:", err);
    }
  },

  createGroup: async ({ name, description, joinType }) => {
    set({ isCreating: true });

    try {
      const res = await axios.post(
        `${API_URL}/group/create-group`,
        { name, description, joinType },
        { withCredentials: true }
      );

      const newGroup = res.data.group;

      get().upsertGroup(newGroup);

      set((state) => ({
        createdGroupIds: [newGroup.id, ...state.createdGroupIds],
        joinedGroupIds: [newGroup.id, ...state.joinedGroupIds],
        isCreating: false,
      }));

      return newGroup;
    } catch (error) {
      set({ isCreating: false });
      throw error;
    }
  },

  fetchJoinedGroup: async () => {
    try {
      const res = await axios.get(`${API_URL}/group/joined-groups`, {
        withCredentials: true,
      });
      const groups = res.data.groups;

      get().upsertGroups(groups);

      set({
        joinedGroupIds: groups.map((g) => g.id),
      });
    } catch (err) {
      console.error(err);
    }
  },

  fetchSuggestedGroups: async () => {
    try {
      const res = await axios.get(`${API_URL}/group`, {
        withCredentials: true,
      });

      // backend returns an array, not an object
      const groups = res.data;

      if (!Array.isArray(groups)) {
        console.error(
          "Unexpected response format for suggested groups:",
          res.data
        );
        return;
      }

      get().upsertGroups(groups);

      set({
        suggestedGroupIds: groups.map((g) => g.id),
      });
    } catch (err) {
      console.error("fetchSuggestedGroups error:", err);
    }
  },

  joinGroup: async (groupId) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(
        `${API_URL}/group/join-group/${groupId}`,
        {},
        { withCredentials: true }
      );

      const message = res.data.message;

      if (message === "Joined group successfully") {
        await get().fetchJoinedGroup();
        return { status: "JOINED" };
      }

      if (message === "Join request submitted") {
        return { status: "PENDING" };
      }

      return { status: "UNKNOWN" };
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg === "Join request already pending") {
        return { status: "PENDING" };
      }
      if (msg === "User is already a member of this group") {
        return { status: "JOINED" };
      }
      if (msg?.includes("rejected")) {
        return { status: "REJECTED" };
      }

      return { status: "ERROR", error: msg || "Something went wrong" };
    } finally {
      set({ isLoading: false });
    }
  },

  leaveGroup: async (groupId) => {
    set({ isLoading: true });

    try {
      await axios.delete(`${API_URL}/group/leave-group/${groupId}`);

      set((state) => ({
        joinedGroupIds: state.joinedGroupIds.filter((id) => id !== groupId),
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  updateGroup: async (groupId, payload) => {
    const res = await axios.patch(
      `${API_URL}/group/update-group/${groupId}`,
      payload,
      { withCredentials: true }
    );

    const updatedGroup = res.data.group;

    get().upsertGroup(updatedGroup);
    return updatedGroup;
  },

  uploadImage: async (file, groupId) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.patch(
      `${API_URL}/group/update-image/${groupId}`,
      formData,
      { withCredentials: true }
    );

    const updatedGroup = res.data.group;

    get().upsertGroup(updatedGroup);
    return updatedGroup;
  },

  createGroupPost: async (groupId, postData, files) => {
    const { groups } = get();

    try {
      const formData = new FormData();
      formData.append("description", postData.description);
      formData.append("category", postData.category);
      formData.append("hashtags", JSON.stringify(postData.hashtags || []));

      if (postData.customLabel)
        formData.append("customLabel", postData.customLabel);

      if (files?.image) formData.append("image", files.image);
      if (files?.video) formData.append("video", files.video);
      if (files?.images?.length)
        files.images.forEach((img) => formData.append("images", img));

      const res = await axios.post(
        `${API_URL}/group/${groupId}/posts`,
        formData,
        { withCredentials: true }
      );

      const post = res.data.post;

      // Insert into store
      set((state) => ({
        groupPosts: {
          ...state.groupPosts,
          [groupId]: [post, ...(state.groupPosts[groupId] || [])],
        },
      }));

      return post;
    } catch (err) {
      console.error("Error creating group post:", err);
      throw err;
    }
  },

  fetchGroupPosts: async (groupId) => {
    try {
      const res = await axios.get(`${API_URL}/group/${groupId}/posts`, {
        withCredentials: true,
      });

      const posts = res.data.posts;

      set((state) => ({
        groupPosts: {
          ...state.groupPosts,
          [groupId]: posts,
        },
      }));
    } catch (err) {
      console.error("Error fetching group posts:", err);
    }
  },

  toggleGroupPostLike: async (groupId, postId) => {
    try {
      const res = await axios.post(
        `${API_URL}/group/${groupId}/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );

      const { likesCount, likedByMe } = res.data;

      // Update local state instantly
      set((state) => {
        const posts = state.groupPosts[groupId] || [];

        return {
          groupPosts: {
            ...state.groupPosts,
            [groupId]: posts.map((p) =>
              p.id === postId ? { ...p, likesCount, likedByMe } : p
            ),
          },
        };
      });
    } catch (err) {
      console.error("Error liking group post:", err);
    }
  },

  commentOnGroupPost: async (groupId, postId, content) => {
    try {
      const res = await axios.post(
        `${API_URL}/group/${groupId}/posts/${postId}/comment`,
        { content },
        { withCredentials: true }
      );

      const newComment = res.data.comment;

      set((state) => {
        const posts = state.groupPosts[groupId] || [];

        return {
          groupPosts: {
            ...state.groupPosts,
            [groupId]: posts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    comments: [...(p.comments || []), newComment],
                    commentsCount: (p.commentsCount || 0) + 1,
                  }
                : p
            ),
          },
        };
      });

      return newComment;
    } catch (err) {
      console.error("Error commenting on group post:", err);
      throw err;
    }
  },

  deleteGroupPostComment: async (groupId, postId, commentId) => {
    try {
      await axios.delete(
        `${API_URL}/group/${groupId}/posts/${postId}/comments/${commentId}`,
        { withCredentials: true }
      );

      set((state) => {
        const posts = state.groupPosts[groupId] || [];

        return {
          groupPosts: {
            ...state.groupPosts,
            [groupId]: posts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    comments: p.comments.filter((c) => c.id !== commentId),
                    commentsCount: p.commentsCount - 1,
                  }
                : p
            ),
          },
        };
      });
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  },

  deleteGroupPost: async (groupId, postId) => {
    try {
      await axios.delete(`${API_URL}/group/${groupId}/posts/${postId}`, {
        withCredentials: true,
      });

      set((state) => ({
        groupPosts: {
          ...state.groupPosts,
          [groupId]: (state.groupPosts[groupId] || []).filter(
            (p) => p.id !== postId
          ),
        },
      }));
    } catch (err) {
      console.error("Error deleting group post:", err);
    }
  },

  getJoinRequestsForGroup: async (groupId, status = "PENDING") => {
    set({ isJoinRequestLoading: true });

    try {
      const res = await axios.get(
        `${API_URL}/group/${groupId}/join-requests?status=${status}`,
        { withCredentials: true }
      );

      const requests = res.data.requests || [];

      set((state) => ({
        joinRequests: {
          ...state.joinRequests,
          [groupId]: requests,
        },
      }));

      return requests;
    } catch (error) {
      console.error("getJoinRequestsForGroup error:", error);
      return [];
    } finally {
      set({ isJoinRequestLoading: false });
    }
  },

  respondToJoinRequest: async (groupId, requestId, action) => {
    try {
      const res = await axios.post(
        `${API_URL}/group/${groupId}/join-requests/${requestId}/decision`,
        { action },
        { withCredentials: true }
      );

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update request",
      };
    }
  },
}));
