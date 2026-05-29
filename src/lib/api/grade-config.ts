import { apiFetch } from "./client";
import type { GradeConfig, GradeConfigUpdate } from "@/lib/types";

export const gradeConfigApi = {
  get(orgId: number): Promise<GradeConfig> {
    return apiFetch<GradeConfig>(`/organizations/${orgId}/grade-config`);
  },

  upsert(orgId: number, data: GradeConfigUpdate): Promise<GradeConfig> {
    return apiFetch<GradeConfig>(`/organizations/${orgId}/grade-config`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove(orgId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/grade-config`, {
      method: "DELETE",
    });
  },
};
