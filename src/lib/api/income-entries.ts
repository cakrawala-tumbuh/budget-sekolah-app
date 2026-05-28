import { apiFetch } from "./client";
import type {
  IncomeEntry,
  IncomeEntryCreate,
  IncomeEntryUpdate,
  IncomeEntryBulkCreate,
} from "@/lib/types";

export const incomeEntriesApi = {
  list(orgId: number, categoryId?: number): Promise<IncomeEntry[]> {
    const qs = categoryId ? `?category_id=${categoryId}` : "";
    return apiFetch<IncomeEntry[]>(`/organizations/${orgId}/income-entries${qs}`);
  },
  create(orgId: number, data: IncomeEntryCreate): Promise<IncomeEntry> {
    return apiFetch<IncomeEntry>(`/organizations/${orgId}/income-entries`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  bulkCreate(orgId: number, data: IncomeEntryBulkCreate): Promise<IncomeEntry[]> {
    return apiFetch<IncomeEntry[]>(`/organizations/${orgId}/income-entries/bulk`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(orgId: number, entryId: number, data: IncomeEntryUpdate): Promise<IncomeEntry> {
    return apiFetch<IncomeEntry>(
      `/organizations/${orgId}/income-entries/${entryId}`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },
  remove(orgId: number, entryId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/income-entries/${entryId}`, {
      method: "DELETE",
    });
  },
  removeByCategory(orgId: number, categoryId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${orgId}/income-entries/by-category/${categoryId}`,
      { method: "DELETE" },
    );
  },
};
