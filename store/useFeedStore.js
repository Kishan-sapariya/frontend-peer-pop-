import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      toast.error(err.response?.data?.message || "Failed to create post");
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
      toast.error(err.response?.data?.message || "Failed to load posts");
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
      toast.error(err.response?.data?.message || "Failed to load posts");
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
      toast.error(err.response?.data?.message || "Failed to load posts");
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
    try {
      const res = await axios.post(`${API_URL}/feed/posts/${postId}/like`);
      const { likesCount, likedByMe } = res.data;

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, likesCount, likedByMe } : post
        ),
        singlePost:
          state.singlePost?.id === postId
            ? { ...state.singlePost, likesCount, likedByMe }
            : state.singlePost,
      }));
      return res.data.likesCount;
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error(error.response?.data?.message || "Failed to like post");
    }
  },
  addComment: async (postId, comment) => {
    try {
      const res = await axios.post(`${API_URL}/feed/posts/${postId}/comment`, {
        comment,
      });
      const newComment = res.data.comment;

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), newComment],
                commentsCount: (post.commentsCount || 0) + 1,
              }
            : post
        ),
        singlePost:
          state.singlePost?.id === postId
            ? {
                ...state.singlePost,
                comments: [...(state.singlePost.comments || []), newComment],
                commentsCount: (state.singlePost.commentsCount || 0) + 1,
              }
            : state.singlePost,
      }));
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error commenting post:", error);
      toast.error(error.response?.data?.message || "Failed to comment on post");
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
      toast.error(
        error.response?.data?.message || "Failed to delete comment on post"
      );
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
