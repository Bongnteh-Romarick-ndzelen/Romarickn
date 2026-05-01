// lib/services/auth.service.ts
import { apiPost, apiGet, apiPut, apiDelete } from "../api";
import type { User, LoginCredentials, RegisterData } from "@/types/user";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
    user?: User;
    session?: any;
  };
}

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>(
      "/api/auth/login",
      credentials,
    );

    console.log("Login response:", response);

    // Extract user from the response structure
    if (response.success && response.data) {
      // Create user object from the data
      const userData: User = {
        _id: response.data._id || response.data.user?._id || "",
        name: response.data.name || response.data.user?.name || "",
        email: response.data.email || response.data.user?.email || "",
        role: (response.data.role || response.data.user?.role || "user") as
          | "user"
          | "admin",
        avatar: response.data.user?.avatar || "",
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }

    return response;
  },

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>("/api/auth/register", data);

    if (response.success) {
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
