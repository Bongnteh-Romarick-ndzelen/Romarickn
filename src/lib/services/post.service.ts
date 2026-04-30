import { apiRequest } from '../api';
import type { Post, CreatePostData, UpdatePostData } from '@/types/post';
import type { PaginatedResponse } from '@/types/common';

export const postService = {
  // Get all posts with pagination
  async getPosts(page: number = 1, limit: number = 10) {
    return apiRequest<PaginatedResponse<Post>>(
      `/api/posts?page=${page}&limit=${limit}`
    );
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    return apiRequest<Post>(`/api/posts/${slug}`);
  },

  // Get post by ID
  async getPostById(id: string) {
    return apiRequest<Post>(`/api/posts/id/${id}`);
  },

  // Create new post
  async createPost(data: CreatePostData) {
    return apiRequest<Post>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update post
  async updatePost(id: string, data: UpdatePostData) {
    return apiRequest<Post>(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete post
  async deletePost(id: string) {
    return apiRequest<{ message: string }>(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  },

  // Publish post
  async publishPost(id: string) {
    return apiRequest<Post>(`/api/posts/${id}/publish`, {
      method: 'PUT',
    });
  },

  // Like a post
  async likePost(postId: string) {
    return apiRequest<{ liked: boolean; likesCount: number }>(
      `/api/posts/${postId}/likes`,
      {
        method: 'POST',
      }
    );
  },

  // Unlike a post
  async unlikePost(postId: string) {
    return apiRequest<{ liked: boolean; likesCount: number }>(
      `/api/posts/${postId}/likes`,
      {
        method: 'DELETE',
      }
    );
  },

  // Get post likes count
  async getPostLikes(postId: string) {
    return apiRequest<{ count: number }>(`/api/posts/${postId}/likes`);
  },
};
