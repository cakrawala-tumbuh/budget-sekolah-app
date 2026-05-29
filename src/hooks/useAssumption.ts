"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assumptionsApi } from "@/lib/api/assumptions";
import type { UnitAssumptionUpdate } from "@/lib/types";

const keys = {
  detail: (orgId: number) => ["assumption", orgId] as const,
};

export function useAssumption(orgId: number) {
  return useQuery({
    queryKey: keys.detail(orgId),
    queryFn: () => assumptionsApi.get(orgId),
    enabled: orgId > 0,
    retry: (failureCount, error: unknown) => {
      // Jangan retry jika 404 (asumsi belum diisi)
      if ((error as { status?: number })?.status === 404) return false;
      return failureCount < 2;
    },
  });
}

export function useUpsertAssumption(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitAssumptionUpdate) => assumptionsApi.update(orgId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.detail(orgId) });
    },
  });
}
