"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { depreciationApi } from "@/lib/api/depreciation";
import type {
  DepreciationOldAssetCreate,
  DepreciationOldAssetUpdate,
} from "@/lib/types";

const keys = {
  list: (orgId: number) => ["depreciation", orgId] as const,
};

export function useDepreciation(orgId: number) {
  return useQuery({
    queryKey: keys.list(orgId),
    queryFn: () => depreciationApi.list(orgId),
    enabled: orgId > 0,
  });
}

export function useCreateDepreciation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: DepreciationOldAssetCreate) =>
      depreciationApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useUpdateDepreciation(orgId: number, depId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: DepreciationOldAssetUpdate) =>
      depreciationApi.update(orgId, depId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}

export function useDeleteDepreciation(orgId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (depId: number) => depreciationApi.remove(orgId, depId),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.list(orgId) }),
  });
}
