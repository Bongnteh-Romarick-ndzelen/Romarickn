import { apiRequest } from '../api';
import type { DashboardAnalytics, TrafficStats } from '@/types/analytics';

export const adminService = {
  // Get dashboard analytics
  async getDashboardAnalytics() {
    return apiRequest<DashboardAnalytics>('/api/admin/analytics');
  },

  // Get traffic statistics
  async getTrafficStats(period: 'day' | 'week' | 'month' | 'year' = 'week') {
    return apiRequest<TrafficStats>(
      `/api/admin/traffic?period=${period}`
    );
  },

  // Admin: Get all posts
  async getAllPosts(page: number = 1, limit: number = 20) {
    return apiRequest<any>(`/api/admin/posts?page=${page}&limit=${limit}`);
  },

  // Admin: Delete post
  async deletePost(id: string) {
    return apiRequest<{ message: string }>(`/api/admin/posts/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin: Toggle featured post
  async toggleFeatured(id: string) {
    return apiRequest<any>(`/api/admin/posts/${id}/featured`, {
      method: 'PUT',
    });
  },

  // Admin: Get all users
  async getAllUsers(page: number = 1, limit: number = 20) {
    return apiRequest<any>(`/api/admin/users?page=${page}&limit=${limit}`);
  },

  // Admin: Get user details
  async getUserDetails(id: string) {
    return apiRequest<any>(`/api/admin/users/${id}`);
  },

  // Admin: Update user role
  async updateUserRole(id: string, role: string) {
    return apiRequest<any>(`/api/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  // Admin: Toggle user active status
  async toggleUserActive(id: string) {
    return apiRequest<any>(`/api/admin/users/${id}/toggle-active`, {
      method: 'PUT',
    });
  },

  // Admin: Delete user
  async deleteUser(id: string) {
    return apiRequest<{ message: string }>(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin: Get all comments
  async getAllComments(page: number = 1, limit: number = 20) {
    return apiRequest<any>(
      `/api/admin/comments?page=${page}&limit=${limit}`
    );
  },

  // Admin: Approve comment
  async approveComment(id: string) {
    return apiRequest<any>(`/api/admin/comments/${id}/approve`, {
      method: 'PUT',
    });
  },

  // Admin: Delete comment
  async deleteComment(id: string) {
    return apiRequest<{ message: string }>(`/api/admin/comments/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin: Bulk approve comments
  async bulkApproveComments(commentIds: string[]) {
    return apiRequest<any>('/api/admin/comments/bulk-approve', {
      method: 'POST',
      body: JSON.stringify({ commentIds }),
    });
  },

  // Admin: Send newsletter
  async sendNewsletter(data: { subject: string; content: string }) {
    return apiRequest<any>('/api/admin/newsletter/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin: Get newsletter stats
  async getNewsletterStats() {
    return apiRequest<any>('/api/admin/newsletter/stats');
  },
};
