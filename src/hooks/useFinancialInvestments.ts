"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financialInvestmentsApi } from "@/lib/api/financial-investments";
import type { FinancialInvestmentCreate, FinancialInvestmentUpdate } from "@/lib/types";

const keys = {
  list: (orgId: number) => ["financial-investments", orgId] as const,
};

export function useFinancialInvestments(orgId: number) {
  return useQuery({
    queryKey: keys.list(orgId),
    queryFn: () => financialInvestmentsApi.list(orgId),
    enabled: orgId > 0,
  });
}

export function useCreateFinancialInvestment(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FinancialInvestmentCreate) =>
      financialInvestmentsApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useUpdateFinancialInvestment(orgId: number, invId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FinancialInvestmentUpdate) =>
      financialInvestmentsApi.update(orgId, invId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteFinancialInvestment(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (invId: number) => financialInvestmentsApi.remove(orgId, invId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}
