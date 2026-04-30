// lib/services/auth.service.ts
import { apiPost, apiGet, apiPut, apiDelete } from "../api";
import type { User, LoginCredentials, RegisterData } from "@/types/user";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
  };
}

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>(
      "/api/auth/login",
      credentials,
    );

    if (response.success && response.data?.token) {
      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }
    return response;
  },

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>("/api/auth/register", data);

    if (response.success) {
      // Store email for verification
      localStorage.setItem("pendingVerificationEmail", data.email);
    }
    return response;
  },

  // Verify email with 5-digit code
  async verifyEmail(email: string, code: string): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/api/auth/verify-email", { email, code });
  },

  // Resend verification code
  async resendVerificationCode(email: string): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/api/auth/resend-verification", { email });
  },

  // Logout
  async logout(): Promise<AuthResponse> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return apiPost<AuthResponse>("/api/auth/logout");
  },

  // Get current user
  async getCurrentUser(): Promise<AuthResponse> {
    return apiGet<AuthResponse>("/api/auth/me");
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<AuthResponse> {
    return apiPut<AuthResponse>("/api/auth/profile", data);
  },

  // Forgot password - request reset code
  async forgotPassword(email: string): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/api/auth/forgot-password", { email });
  },

  // Reset password with 5-digit code
  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/api/auth/reset-password", {
      email,
      code,
      newPassword,
    });
  },
};
