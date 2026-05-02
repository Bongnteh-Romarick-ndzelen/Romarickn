import { apiGet, apiPut } from "../api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  bio?: string;
  location?: string;
  website?: string;
}

export const userService = {
  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiGet("/users/me");
    return response.data;
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiPut("/users/me", data);
    return response.data;
  },
};
