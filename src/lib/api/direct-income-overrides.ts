import { apiFetch } from "./client";
import type { DirectIncomeOverride, DirectIncomeOverrideUpsert } from "@/lib/types";

export const directIncomeOverridesApi = {
  list(orgId: number): Promise<DirectIncomeOverride[]> {
    return apiFetch<DirectIncomeOverride[]>(
      `/organizations/${orgId}/direct-income-overrides`,
    );
  },

  upsert(
    orgId: number,
    expenseCategoryId: number,
    data: DirectIncomeOverrideUpsert,
  ): Promise<DirectIncomeOverride> {
    return apiFetch<DirectIncomeOverride>(
      `/organizations/${orgId}/direct-income-overrides/${expenseCategoryId}`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },

  remove(orgId: number, expenseCategoryId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${orgId}/direct-income-overrides/${expenseCategoryId}`,
      { method: "DELETE" },
    );
  },
};
