import { apiFetch } from "./client";
import type {
  ParentExpenseAllocationRead,
  ParentExpenseAllocationCreate,
  ParentExpenseAllocationUpdate,
} from "@/lib/types";

export const parentExpenseAllocationsApi = {
  list(orgId: number): Promise<ParentExpenseAllocationRead[]> {
    return apiFetch<ParentExpenseAllocationRead[]>(
      `/organizations/${orgId}/parent-expense-allocations`,
    );
  },

  create(
    orgId: number,
    data: ParentExpenseAllocationCreate,
  ): Promise<ParentExpenseAllocationRead> {
    return apiFetch<ParentExpenseAllocationRead>(
      `/organizations/${orgId}/parent-expense-allocations`,
      { method: "POST", body: JSON.stringify(data) },
    );
  },

  update(
    orgId: number,
    allocId: number,
    data: ParentExpenseAllocationUpdate,
  ): Promise<ParentExpenseAllocationRead> {
    return apiFetch<ParentExpenseAllocationRead>(
      `/organizations/${orgId}/parent-expense-allocations/${allocId}`,
      { method: "PATCH", body: JSON.stringify(data) },
    );
  },

  remove(orgId: number, allocId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${orgId}/parent-expense-allocations/${allocId}`,
      { method: "DELETE" },
    );
  },
};
