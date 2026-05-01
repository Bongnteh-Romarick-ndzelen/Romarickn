// lib/services/subscription.service.ts
import { apiPost, apiGet } from "../api";

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
};
