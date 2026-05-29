"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gradeConfigApi } from "@/lib/api/grade-config";
import type { GradeConfigUpdate } from "@/lib/types";

const keys = {
  detail: (orgId: number) => ["grade-config", orgId] as const,
};

export function useGradeConfig(orgId: number) {
  return useQuery({
    queryKey: keys.detail(orgId),
    queryFn: () => gradeConfigApi.get(orgId),
    enabled: orgId > 0,
    retry: (failureCount, error: unknown) => {
      if ((error as { status?: number })?.status === 404) return false;
      return failureCount < 2;
    },
  });
}

export function useUpsertGradeConfig(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: GradeConfigUpdate) => gradeConfigApi.upsert(orgId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.detail(orgId) });
    },
  });
}

export function useDeleteGradeConfig(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => gradeConfigApi.remove(orgId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.detail(orgId) });
    },
  });
}
