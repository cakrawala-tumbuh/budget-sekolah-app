"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { investmentsApi } from "@/lib/api/investments";
import type { InvestmentCreate, InvestmentUpdate } from "@/lib/types";

const keys = {
  list: (orgId: number) => ["investments", orgId] as const,
};

export function useInvestments(orgId: number) {
  return useQuery({
    queryKey: keys.list(orgId),
    queryFn: () => investmentsApi.list(orgId),
    enabled: orgId > 0,
  });
}

export function useCreateInvestment(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InvestmentCreate) => investmentsApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useUpdateInvestment(orgId: number, invId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InvestmentUpdate) =>
      investmentsApi.update(orgId, invId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteInvestment(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (invId: number) => investmentsApi.remove(orgId, invId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}
