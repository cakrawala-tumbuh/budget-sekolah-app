import { apiFetch } from "./client";
import type {
  ContributionRateRead,
  ContributionRateSet,
  ContributionAllocationRead,
  ContributionAllocationCreate,
} from "@/lib/types";

export const contributionsApi = {
  getRates(orgId: number): Promise<ContributionRateRead> {
    return apiFetch<ContributionRateRead>(
      `/organizations/${orgId}/contribution-rates`,
    );
  },

  setRates(orgId: number, data: ContributionRateSet): Promise<ContributionRateRead> {
    return apiFetch<ContributionRateRead>(
      `/organizations/${orgId}/contribution-rates`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },

  listAllocations(orgId: number): Promise<ContributionAllocationRead[]> {
    return apiFetch<ContributionAllocationRead[]>(
      `/organizations/${orgId}/contribution-allocations`,
    );
  },

  upsertAllocation(
    orgId: number,
    data: ContributionAllocationCreate,
  ): Promise<ContributionAllocationRead> {
    return apiFetch<ContributionAllocationRead>(
      `/organizations/${orgId}/contribution-allocations`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },
};
