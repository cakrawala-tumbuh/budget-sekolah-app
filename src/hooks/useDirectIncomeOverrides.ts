"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { directIncomeOverridesApi } from "@/lib/api/direct-income-overrides";
import { simulationKeys } from "@/hooks/useSimulation";
import type { DirectIncomeOverrideUpsert } from "@/lib/types";

const keys = {
  byOrg: (orgId: number) => ["direct-income-overrides", orgId] as const,
};

export function useDirectIncomeOverrides(orgId: number) {
  return useQuery({
    queryKey: keys.byOrg(orgId),
    queryFn: () => directIncomeOverridesApi.list(orgId),
    enabled: !!orgId,
  });
}

export function useUpsertDirectIncomeOverride(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      expenseCategoryId,
      data,
    }: {
      expenseCategoryId: number;
      data: DirectIncomeOverrideUpsert;
    }) => directIncomeOverridesApi.upsert(orgId, expenseCategoryId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.byOrg(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.directIncome(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.income(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.summary(orgId) });
    },
  });
}

export function useDeleteDirectIncomeOverride(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (expenseCategoryId: number) =>
      directIncomeOverridesApi.remove(orgId, expenseCategoryId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.byOrg(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.directIncome(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.income(orgId) });
      qc.invalidateQueries({ queryKey: simulationKeys.summary(orgId) });
    },
  });
}
