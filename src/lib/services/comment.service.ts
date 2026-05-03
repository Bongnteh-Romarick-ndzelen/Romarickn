import { apiRequest } from '../api';
import type { Comment, CreateCommentData } from '@/types/comment';
import type { PaginatedResponse } from '@/types/common';

export const commentService = {
  // Get comments for a post
  async getComments(postId: string, page: number = 1, limit: number = 10) {
    return apiRequest<PaginatedResponse<Comment>>(
      `/api/comments/post/${postId}?page=${page}&limit=${limit}`
    );
  },

  // Create comment
  async createComment(data: CreateCommentData) {
    return apiRequest<Comment>(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update comment
  async updateComment(id: string, data: Partial<Comment>) {
    return apiRequest<Comment>(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete comment
  async deleteComment(id: string) {
    return apiRequest<{ message: string }>(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  },

  // Approve comment (admin only)
  async approveComment(id: string) {
    return apiRequest<Comment>(`/api/comments/${id}/approve`, {
      method: 'PUT',
    });
  },
};
