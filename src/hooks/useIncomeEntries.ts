"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeEntriesApi } from "@/lib/api/income-entries";
import type { IncomeEntryCreate, IncomeEntryUpdate } from "@/lib/types";

const keys = {
  list: (orgId: number) => ["income-entries", orgId] as const,
};

export function useIncomeEntries(orgId: number, categoryId?: number) {
  return useQuery({
    queryKey: [...keys.list(orgId), categoryId],
    queryFn: () => incomeEntriesApi.list(orgId, categoryId),
    enabled: orgId > 0,
  });
}

export function useCreateIncomeEntry(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IncomeEntryCreate) => incomeEntriesApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useUpdateIncomeEntry(orgId: number, entryId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IncomeEntryUpdate) =>
      incomeEntriesApi.update(orgId, entryId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteIncomeEntry(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entryId: number) => incomeEntriesApi.remove(orgId, entryId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}
