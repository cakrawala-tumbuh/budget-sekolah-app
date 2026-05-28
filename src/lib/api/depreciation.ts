import { apiFetch } from "./client";
import type {
  DepreciationOldAsset,
  DepreciationOldAssetCreate,
  DepreciationOldAssetUpdate,
} from "@/lib/types";

export const depreciationApi = {
  list(orgId: number): Promise<DepreciationOldAsset[]> {
    return apiFetch<DepreciationOldAsset[]>(`/organizations/${orgId}/depreciation`);
  },
  create(orgId: number, data: DepreciationOldAssetCreate): Promise<DepreciationOldAsset> {
    return apiFetch<DepreciationOldAsset>(`/organizations/${orgId}/depreciation`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(
    orgId: number,
    depId: number,
    data: DepreciationOldAssetUpdate,
  ): Promise<DepreciationOldAsset> {
    return apiFetch<DepreciationOldAsset>(
      `/organizations/${orgId}/depreciation/${depId}`,
      { method: "PUT", body: JSON.stringify(data) },
    );
  },
  remove(orgId: number, depId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${orgId}/depreciation/${depId}`, {
      method: "DELETE",
    });
  },
};
