"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetEntriesApi } from "@/lib/api/budget-entries";
import type { BudgetEntryCreate, BudgetEntryUpdate, BudgetEntryBulkMoveCategory } from "@/lib/types";

const keys = {
  list: (orgId: number) => ["budget-entries", orgId] as const,
};

export function useBudgetEntries(orgId: number, categoryId?: number) {
  return useQuery({
    queryKey: [...keys.list(orgId), categoryId],
    queryFn: () => budgetEntriesApi.list(orgId, categoryId),
    enabled: orgId > 0,
  });
}

export function useCreateBudgetEntry(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BudgetEntryCreate) => budgetEntriesApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useUpdateBudgetEntry(orgId: number, entryId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BudgetEntryUpdate) =>
      budgetEntriesApi.update(orgId, entryId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteBudgetEntry(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entryId: number) => budgetEntriesApi.remove(orgId, entryId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteBudgetEntriesByCategory(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) =>
      budgetEntriesApi.removeByCategory(orgId, categoryId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useBulkMoveBudgetEntryCategory(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BudgetEntryBulkMoveCategory) =>
      budgetEntriesApi.bulkMoveCategory(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}
