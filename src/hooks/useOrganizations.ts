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

export function useDeleteOrganization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => organizationsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}
