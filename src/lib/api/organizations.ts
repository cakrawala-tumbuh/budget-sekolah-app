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

  remove(id: number): Promise<void> {
    return apiFetch<void>(`/organizations/${id}`, { method: "DELETE" });
  },
};
