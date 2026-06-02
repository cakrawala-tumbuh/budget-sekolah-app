import { apiFetch } from "./client";
import type { SubsidyRead, SubsidyCreate, SubsidyUpdate } from "@/lib/types";

export const subsidiesApi = {
  list(orgId: number): Promise<SubsidyRead[]> {
    return apiFetch<SubsidyRead[]>(`/organizations/${orgId}/subsidies`);
  },

  create(orgId: number, data: SubsidyCreate): Promise<SubsidyRead> {
    return apiFetch<SubsidyRead>(`/organizations/${orgId}/subsidies`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(
    orgId: number,
    subsidyId: number,
    data: SubsidyUpdate,
  ): Promise<SubsidyRead> {
    return apiFetch<SubsidyRead>(
      `/organizations/${orgId}/subsidies/${subsidyId}`,
      { method: "PATCH", body: JSON.stringify(data) },
    );
  },

  remove(orgId: number, subsidyId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/subsidies/${subsidyId}`, {
      method: "DELETE",
    });
  },
};
