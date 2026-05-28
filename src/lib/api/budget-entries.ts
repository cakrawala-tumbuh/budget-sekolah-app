import { apiFetch } from "./client";
import type {
  BudgetEntry,
  BudgetEntryCreate,
  BudgetEntryUpdate,
  BudgetEntryBulkCreate,
} from "@/lib/types";

export const budgetEntriesApi = {
  list(orgId: number, categoryId?: number): Promise<BudgetEntry[]> {
    const qs = categoryId ? `?category_id=${categoryId}` : "";
    return apiFetch<BudgetEntry[]>(`/organizations/${orgId}/budget-entries${qs}`);
  },
  create(orgId: number, data: BudgetEntryCreate): Promise<BudgetEntry> {
    return apiFetch<BudgetEntry>(`/organizations/${orgId}/budget-entries`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  bulkCreate(orgId: number, data: BudgetEntryBulkCreate): Promise<BudgetEntry[]> {
    return apiFetch<BudgetEntry[]>(`/organizations/${orgId}/budget-entries/bulk`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(orgId: number, entryId: number, data: BudgetEntryUpdate): Promise<BudgetEntry> {
    return apiFetch<BudgetEntry>(
      `/organizations/${orgId}/budget-entries/${entryId}`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },
  remove(orgId: number, entryId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/budget-entries/${entryId}`, {
      method: "DELETE",
    });
  },
  removeByCategory(orgId: number, categoryId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${orgId}/budget-entries/by-category/${categoryId}`,
      { method: "DELETE" },
    );
  },
};
