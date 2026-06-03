import { apiFetch } from "./client";
import type {
  Organization,
  OrganizationWithChildren,
  OrganizationCreate,
  OrganizationUpdate,
} from "@/lib/types";

export const organizationsApi = {
  list(): Promise<Organization[]> {
    return apiFetch<Organization[]>("/organizations");
  },

  get(id: number): Promise<OrganizationWithChildren> {
    return apiFetch<OrganizationWithChildren>(`/organizations/${id}`);
  },

  create(data: OrganizationCreate): Promise<Organization> {
    return apiFetch<Organization>("/organizations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: OrganizationUpdate): Promise<Organization> {
    return apiFetch<Organization>(`/organizations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * Update saldo kas & setara kas saja. Berbeda dengan `update` (admin only),
   * endpoint ini boleh dipakai user organisasi untuk organisasinya sendiri
   * maupun organisasi yang dinaunginya secara berjenjang.
   */
  updateCashBalance(id: number, cash_balance: number): Promise<Organization> {
    return apiFetch<Organization>(`/organizations/${id}/cash-balance`, {
      method: "PUT",
      body: JSON.stringify({ cash_balance }),
    });
  },

  remove(id: number): Promise<void> {
    return apiFetch<void>(`/organizations/${id}`, { method: "DELETE" });
  },
};
