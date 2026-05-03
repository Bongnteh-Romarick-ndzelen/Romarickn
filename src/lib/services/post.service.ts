import { apiRequest } from '../api';
import type { Post, CreatePostData, UpdatePostData } from '@/types/post';
import type { PaginatedResponse } from '@/types/common';

export const postService = {
  // Get all posts with pagination
  async getPosts(page: number = 1, limit: number = 10) {
    return apiRequest<PaginatedResponse<Post>>(
      `/api/posts?page=${page}&limit=${limit}`,
    );
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: Post;
    }>(`/api/posts/${slug}`);
    return response.data;
  },

  // Get post by ID
  async getPostById(id: string) {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: Post;
    }>(`/api/posts/id/${id}`);
    return response.data;
  },

  // Create new post
  async createPost(data: CreatePostData & { coverImage?: File }) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("categories", JSON.stringify(data.categories || []));
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("featured", String(data.featured || false));
    formData.append("status", data.published ? "published" : "draft");
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    return apiRequest<Post>("/api/posts", {
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  // Update post
  async updatePost(id: string, data: UpdatePostData & { coverImage?: File }) {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.excerpt !== undefined) formData.append("excerpt", data.excerpt);
    if (data.content !== undefined) formData.append("content", data.content);
    if (data.categories !== undefined)
      formData.append("categories", JSON.stringify(data.categories));
    if (data.tags !== undefined)
      formData.append("tags", JSON.stringify(data.tags));
    if (data.featured !== undefined)
      formData.append("featured", String(data.featured));
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    return apiRequest<Post>(`/api/posts/${id}`, {
      method: "PUT",
      body: formData,
      headers: {},
    });
  },

  // Delete post
  async deletePost(id: string) {
    return apiRequest<{ message: string }>(`/api/posts/${id}`, {
      method: "DELETE",
    });
  },

  // Publish post
  async publishPost(id: string) {
    return apiRequest<Post>(`/api/posts/${id}/publish`, {
      method: "PUT",
    });
  },

  // Upload image for editor
  async uploadImage(formData: FormData) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: { url: string; publicId: string };
    }>("/api/posts/upload-image", {
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  // Like/unlike a post
async toggleLike(postId: string) {
  console.log('toggleLike called with postId:', postId);
  try {
    const response = await apiRequest<{ liked: boolean; likesCount: number }>(
      `/api/posts/${postId}/likes`,
      {
        method: 'POST',
      }
    );
    console.log('toggleLike response:', response);
    
    // If your API returns nested data, extract it
    if (response.data) {
      return response.data;
    }
    return response;
  } catch (error) {
    console.error('toggleLike error:', error);
    throw error;
  }
},

  // Get post likes count
  async getPostLikes(postId: string) {
    return apiRequest<{ count: number }>(`/api/posts/${postId}/likes`);
  },
};
