// lib/services/contact.service.ts
import { apiPost, apiGet, apiPut, apiDelete } from "../api";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  createdAt: string;
  repliedAt?: string;
  repliedBy?: string;
  replyMessage?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactStats {
  pending: number;
  read: number;
  replied: number;
  archived: number;
  total: number;
  thisWeek: number;
  thisMonth: number;
  recentActivity?: Array<{
    date: string;
    contacts: number;
  }>;
}

export const contactService = {
  // Public: Submit contact form
  async submitContact(
    data: ContactFormData,
  ): Promise<{ success: boolean; message: string; data?: { id: string } }> {
    return apiPost<{
      success: boolean;
      message: string;
      data?: { id: string };
    }>("/api/contact", data);
  },

  // Admin: Get all contacts
  async getAllContacts(
    page: number = 1,
    limit: number = 20,
    status?: string,
    search?: string,
  ): Promise<{
    success: boolean;
    data: {
      contacts: Contact[];
      stats: ContactStats;
      pagination: { page: number; limit: number; total: number; pages: number };
    };
  }> {
    let url = `/api/contact?page=${page}&limit=${limit}`;
    if (status && status !== "all") url += `&status=${status}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    return apiGet(url);
  },

  // Admin: Get contact statistics
  async getContactStats(): Promise<{ success: boolean; data: ContactStats }> {
    return apiGet("/api/contact/stats");
  },

  // Admin: Get single contact
  async getContactById(
    id: string,
  ): Promise<{ success: boolean; data: Contact }> {
    return apiGet(`/api/contact/${id}`);
  },

  // Admin: Update contact status
  async updateContactStatus(
    id: string,
    status: string,
  ): Promise<{ success: boolean; message: string; data: Contact }> {
    return apiPut(`/api/contact/${id}/status`, { status });
  },

  // Admin: Reply to contact
  async replyToContact(
    id: string,
    replyMessage: string,
  ): Promise<{ success: boolean; message: string; data: Contact }> {
    return apiPost(`/api/contact/${id}/reply`, { replyMessage });
  },

  // Admin: Delete contact
  async deleteContact(
    id: string,
  ): Promise<{ success: boolean; message: string }> {
    return apiDelete(`/api/contact/${id}`);
  },

  // Admin: Bulk delete contacts
  async bulkDeleteContacts(
    ids: string[],
  ): Promise<{ success: boolean; message: string }> {
    return apiPost("/api/contact/bulk-delete", { contactIds: ids });
  },
};
