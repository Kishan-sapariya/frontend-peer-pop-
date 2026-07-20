import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { showApiError } from "@/utils/showApiError";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
axios.defaults.withCredentials = true;

export const useFeedStore = create((set, get) => ({
  userDetails: null,
  posts: [],
  singlePost: null,
  hasMore: true,
  cursor: null,
  loading: false,
  loadingMore: false,
  suggestedUsers: [],

  getUserDetails: async () => {
    try {
      const response = await axios.get(`${API_URL}/feed/user-detail`);
      set({ userDetail: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Error fetching user details");
    }
  },
  createPost: async (postData, files) => {
    try {
      set({ loading: true });

      const formData = new FormData();
      formData.append("description", postData.description);
      formData.append("category", postData.category);

      // only send customLabel if category === GENERAL
      if (postData.category === "GENERAL" && postData.customLabel) {
        formData.append("customLabel", postData.customLabel);
      }

      formData.append("hashtags", JSON.stringify(postData.hashtags || []));

      if (files?.video) formData.append("video", files.video);
      if (files?.image) formData.append("image", files.image);
      if (files?.images?.length) {
        files.images.forEach((img) => formData.append("images", img));
      }

      const res = await axios.post(`${API_URL}/feed/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // optimistic update
      set((state) => ({
        posts: [res.data.post, ...state.posts],
      }));

      toast.success("Post created successfully 🎉");
      return res.data.post;
    } catch (err) {
      console.error("Error creating post:", err);
      showApiError(err, "Failed to create post");
    } finally {
      set({ loading: false });
    }
  },
  fetchMyPosts: async (profileId, isLoadMore = false) => {
    const { cursor, posts } = get();
    try {
      if (isLoadMore) {
        set({ loadingMore: true });
      } else {
        set({ loading: true, cursor: null, hasMore: true });
      }

      const res = await axios.get(`${API_URL}/feed/my-posts/${profileId}`, {
        params: { cursor: isLoadMore ? cursor : null, limit: 10 },
      });

      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

      set({
        posts: isLoadMore ? [...posts, ...newPosts] : newPosts,
        cursor: res.data.nextCursor,
        hasMore: Boolean(res.data.nextCursor),
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      showApiError(err, "Failed to load posts");
    } finally {
      if (isLoadMore) {
        set({ loadingMore: false });
      } else {
        set({ loading: false });
      }
    }
  },

  fetchPosts: async (isLoadMore = false) => {
    const { cursor, posts } = get();
    try {
      if (isLoadMore) {
        set({ loadingMore: true });
      } else {
        set({ loading: true });
      }

      const res = await axios.get(`${API_URL}/feed/posts`, {
        params: { cursor: isLoadMore ? cursor : null, limit: 10 },
      });

      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

      set({
        posts: isLoadMore ? [...posts, ...newPosts] : newPosts,
        cursor: res.data.nextCursor,
        hasMore: Boolean(res.data.nextCursor),
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      showApiError(err, "Failed to load posts");
    } finally {
      if (isLoadMore) {
        set({ loadingMore: false });
      } else {
        set({ loading: false });
      }
    }
  },
  fetchPostsForMyPeers: async (isLoadMore = false) => {
    const { cursor, posts } = get();
    try {
      if (isLoadMore) set({ loadingMore: true });
      else set({ loading: true });

      const res = await axios.get(`${API_URL}/feed/my-peers`, {
        params: { cursor: isLoadMore ? cursor : null, limit: 10 },
      });

      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

      set({
        posts: isLoadMore ? [...posts, ...newPosts] : newPosts,
        cursor: res.data.nextCursor,
        hasMore: Boolean(res.data.nextCursor),
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      showApiError(err, "Failed to load posts");
    } finally {
      if (isLoadMore) set({ loadingMore: false });
      else set({ loading: false });
    }
  },

  deletePost: async (postId) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}/feed/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== postId),
      }));
      toast.success("Post deleted");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post");
    } finally {
      set({ loading: false });
    }
  },
  toggleLike: async (postId) => {
    // Get current state for rollback
    const currentState = get();
    const post = currentState.posts.find((p) => p.id === postId);
    const singlePost = currentState.singlePost;

    if (!post) return;

    // Optimistic update - immediately update UI
    const wasLiked = post.likedByMe;
    const newLikedByMe = !wasLiked;
    const newLikesCount = wasLiked ? post.likesCount - 1 : post.likesCount + 1;

    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, likesCount: newLikesCount, likedByMe: newLikedByMe }
          : p
      ),
      singlePost:
        state.singlePost?.id === postId
          ? { ...state.singlePost, likesCount: newLikesCount, likedByMe: newLikedByMe }
          : state.singlePost,
    }));

    try {
      const res = await axios.post(`${API_URL}/feed/posts/${postId}/like`);
      const { likesCount, likedByMe } = res.data;

      // Update with actual server response
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId ? { ...p, likesCount, likedByMe } : p
        ),
        singlePost:
          state.singlePost?.id === postId
            ? { ...state.singlePost, likesCount, likedByMe }
            : state.singlePost,
      }));
      return res.data.likesCount;
    } catch (error) {
      // Rollback on error
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId
            ? { ...p, likesCount: post.likesCount, likedByMe: post.likedByMe }
            : p
        ),
        singlePost:
          state.singlePost?.id === postId && singlePost
            ? { ...state.singlePost, likesCount: singlePost.likesCount, likedByMe: singlePost.likedByMe }
            : state.singlePost,
      }));
      console.error("Error liking post:", error);
      showApiError(error, "Failed to like post");
    }
  },
  addComment: async (postId, comment, currentUser) => {
    // Generate temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempComment = {
      id: tempId,
      content: comment,
      createdAt: new Date().toISOString(),
      user: currentUser ? {
        id: currentUser.id,
        username: currentUser.username,
        image: currentUser.image,
      } : null,
      _isOptimistic: true,
    };

    // Optimistic update - immediately show comment
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), tempComment],
              commentsCount: (post.commentsCount || 0) + 1,
            }
          : post
      ),
      singlePost:
        state.singlePost?.id === postId
          ? {
              ...state.singlePost,
              comments: [...(state.singlePost.comments || []), tempComment],
              commentsCount: (state.singlePost.commentsCount || 0) + 1,
            }
          : state.singlePost,
    }));

    try {
      const res = await axios.post(`${API_URL}/feed/posts/${postId}/comment`, {
        comment,
      });
      const newComment = res.data.comment;

      // Replace temp comment with real comment
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((c) =>
                  c.id === tempId ? newComment : c
                ),
              }
            : post
        ),
        singlePost:
          state.singlePost?.id === postId
            ? {
                ...state.singlePost,
                comments: state.singlePost.comments.map((c) =>
                  c.id === tempId ? newComment : c
                ),
              }
            : state.singlePost,
      }));
    } catch (error) {
      // Rollback - remove temp comment
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c.id !== tempId),
                commentsCount: Math.max(0, (post.commentsCount || 1) - 1),
              }
            : post
        ),
        singlePost:
          state.singlePost?.id === postId
            ? {
                ...state.singlePost,
                comments: state.singlePost.comments.filter((c) => c.id !== tempId),
                commentsCount: Math.max(0, (state.singlePost.commentsCount || 1) - 1),
              }
            : state.singlePost,
      }));
      console.error("Error commenting post:", error);
      showApiError(error, "Failed to comment on post");
    }
  },
  deleteComment: async (postId, commentId) => {
    try {
      await axios.delete(
        `${API_URL}/feed/posts/${postId}/comments/${commentId}`
      );

      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c.id !== commentId),
                commentsCount: post.commentsCount - 1,
              }
            : post
        );

        const updatedSinglePost =
          state.singlePost?.id === postId
            ? {
                ...state.singlePost,
                comments: state.singlePost.comments.filter(
                  (c) => c.id !== commentId
                ),
                commentsCount: state.singlePost.commentsCount - 1,
              }
            : state.singlePost;

        return {
          posts: updatedPosts,
          singlePost: updatedSinglePost,
        };
      });
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      showApiError(error, "Failed to delete comment on post");
    }
  },
  getSuggestedUsers: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_URL}/feed/get-suggested-users`);
      set({ suggestedUsers: res.data.users || [] });
    } catch (error) {
      console.error("Error fetching suggested users:", error);
      toast.error("Failed to load suggested peers");
    } finally {
      set({ loading: false });
    }
  },
  fetchPostById: async (postId) => {
    try {
      if (!postId) return;
      const res = await axios.get(`${API_URL}/feed/posts/${postId}`);
      const post = await res.data.post;
      set({ singlePost: post });
    } catch (error) {
      console.log(error || "error fetching post");
    }
  },
}));
