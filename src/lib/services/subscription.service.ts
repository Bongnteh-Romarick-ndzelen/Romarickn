// lib/services/subscription.service.ts
import { apiPost, apiGet, API_BASE_URL, apiDelete } from "../api";

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscribedAt?: string;
    unsubscribedAt?: string;
  };
}

export interface SubscriptionStatus {
  success?: boolean;
  data?: {
    isSubscribed: boolean;
    subscribedAt?: string;
    unsubscribedAt?: string;
  };
  isSubscribed?: boolean;
  message?: string;
}

export const subscriptionService = {
  /**
   * Subscribe to newsletter (no verification required)
   * @param email - User's email address
   * @returns Promise with subscription response
   */
  async subscribe(email: string): Promise<SubscriptionResponse> {
    try {
      const response = await apiPost<SubscriptionResponse>("/api/subscribe", {
        email,
      });
      return response;
    } catch (error: any) {
      console.error("Subscribe error:", error);
      throw new Error(error.message || "Failed to subscribe");
    }
  },

  /**
   * Unsubscribe from newsletter
   * @param email - User's email address
   * @returns Promise with unsubscription response
   */
  async unsubscribe(email: string): Promise<SubscriptionResponse> {
    try {
      const response = await apiPost<SubscriptionResponse>(
        "/api/subscribe/unsubscribe",
        { email },
      );
      return response;
    } catch (error: any) {
      console.error("Unsubscribe error:", error);
      throw new Error(error.message || "Failed to unsubscribe");
    }
  },

  /**
   * Get subscription status for an email
   * @param email - User's email address
   * @returns Promise with subscription status
   */
  async getStatus(email: string): Promise<SubscriptionStatus> {
    try {
      const response = await apiGet<SubscriptionStatus>(
        `/api/subscribe/status/${encodeURIComponent(email)}`,
      );
      return response;
    } catch (error: any) {
      console.error("Get status error:", error);
      return {
        success: false,
        isSubscribed: false,
        message: error.message || "Failed to get status",
      };
    }
  },
  // Get all subscribers (admin only)
  async getAllSubscribers(
    page: number = 1,
    limit: number = 20,
    status?: string,
    search?: string,
  ) {
    let url = `/api/admin/subscribers?page=${page}&limit=${limit}`;
    if (status && status !== "all") url += `&status=${status}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const response = await apiGet<any>(url);
    return response;
  },

  // Get subscriber statistics (admin only)
  async getSubscriberStats() {
    const response = await apiGet<any>("/api/admin/subscribers/stats");
    return response;
  },

  // Remove subscriber (admin only)
  async removeSubscriber(id: string) {
    const response = await apiDelete<any>(`/api/admin/subscribers/${id}`);
    return response;
  },

  // Bulk remove subscribers (admin only)
  async bulkRemoveSubscribers(ids: string[]) {
    const response = await apiPost<any>("/api/admin/subscribers/bulk-remove", {
      subscriberIds: ids,
    });
    return response;
  },

  // Export subscribers to CSV (admin only)
  async exportSubscribers() {
    window.open(`${API_BASE_URL}/api/admin/subscribers/export`, "_blank");
  },
};


