"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contributionsApi } from "@/lib/api/contributions";
import { parentExpenseAllocationsApi } from "@/lib/api/parent-expense-allocations";
import type {
  ContributionRateSet,
  ContributionAllocationCreate,
  ParentExpenseAllocationCreate,
  ParentExpenseAllocationUpdate,
} from "@/lib/types";

// ── Contribution Rates ────────────────────────────────────────────────────────

const rateKeys = {
  detail: (orgId: number) => ["contribution-rates", orgId] as const,
};

export function useContributionRates(orgId: number) {
  return useQuery({
    queryKey: rateKeys.detail(orgId),
    queryFn: () => contributionsApi.getRates(orgId),
    enabled: !!orgId,
  });
}

export function useSetContributionRates(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ContributionRateSet) =>
      contributionsApi.setRates(orgId, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: rateKeys.detail(orgId) }),
  });
}

// ── Contribution Allocations ──────────────────────────────────────────────────

const allocKeys = {
  list: (orgId: number) => ["contribution-allocations", orgId] as const,
};

export function useContributionAllocations(orgId: number) {
  return useQuery({
    queryKey: allocKeys.list(orgId),
    queryFn: () => contributionsApi.listAllocations(orgId),
    enabled: !!orgId,
  });
}

export function useUpsertContributionAllocation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ContributionAllocationCreate) =>
      contributionsApi.upsertAllocation(orgId, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: allocKeys.list(orgId) }),
  });
}

// ── Parent Expense Allocations ────────────────────────────────────────────────

const peaKeys = {
  list: (orgId: number) => ["parent-expense-allocations", orgId] as const,
};

export function useParentExpenseAllocations(orgId: number) {
  return useQuery({
    queryKey: peaKeys.list(orgId),
    queryFn: () => parentExpenseAllocationsApi.list(orgId),
    enabled: !!orgId,
  });
}

export function useCreateParentExpenseAllocation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ParentExpenseAllocationCreate) =>
      parentExpenseAllocationsApi.create(orgId, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: peaKeys.list(orgId) }),
  });
}

export function useUpdateParentExpenseAllocation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ allocId, data }: { allocId: number; data: ParentExpenseAllocationUpdate }) =>
      parentExpenseAllocationsApi.update(orgId, allocId, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: peaKeys.list(orgId) }),
  });
}

export function useDeleteParentExpenseAllocation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (allocId: number) =>
      parentExpenseAllocationsApi.remove(orgId, allocId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: peaKeys.list(orgId) }),
  });
}
