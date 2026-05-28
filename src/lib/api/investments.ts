import { apiFetch } from "./client";
import type { Investment, InvestmentCreate, InvestmentUpdate } from "@/lib/types";

export const investmentsApi = {
  list(orgId: number): Promise<Investment[]> {
    return apiFetch<Investment[]>(`/organizations/${orgId}/investments`);
  },
  create(orgId: number, data: InvestmentCreate): Promise<Investment> {
    return apiFetch<Investment>(`/organizations/${orgId}/investments`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(orgId: number, invId: number, data: InvestmentUpdate): Promise<Investment> {
    return apiFetch<Investment>(
      `/organizations/${orgId}/investments/${invId}`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },
  remove(orgId: number, invId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/investments/${invId}`, {
      method: "DELETE",
    });
  },
};
