"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { organizationsApi } from "@/lib/api/organizations";
import type { OrganizationCreate, OrganizationUpdate } from "@/lib/types";

export const organizationKeys = {
  all: ["organizations"] as const,
  detail: (id: number) => ["organizations", id] as const,
};

export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.all,
    queryFn: organizationsApi.list,
  });
}

export function useOrganization(id: number) {
  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => organizationsApi.get(id),
    enabled: !!id,
  });
}

export function useCreateOrganization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationCreate) => organizationsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}

export function useUpdateOrganization(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationUpdate) => organizationsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
      qc.invalidateQueries({ queryKey: organizationKeys.detail(id) });
    },
  });
}

export function useUpdateCashBalance(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (cash_balance: number) =>
      organizationsApi.updateCashBalance(id, cash_balance),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
      qc.invalidateQueries({ queryKey: organizationKeys.detail(id) });
    },
  });
}

export function useDeleteOrganization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => organizationsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}

export function useLockOrganization(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => organizationsApi.lock(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
      qc.invalidateQueries({ queryKey: organizationKeys.detail(id) });
    },
  });
}

export function useUnlockOrganization(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => organizationsApi.unlock(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
      qc.invalidateQueries({ queryKey: organizationKeys.detail(id) });
    },
  });
}
