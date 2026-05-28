import { apiFetch } from "./client";
import type {
  UnitAssumption,
  UnitAssumptionUpdate,
} from "@/lib/types";

export const assumptionsApi = {
  get(orgId: number): Promise<UnitAssumption> {
    return apiFetch<UnitAssumption>(`/organizations/${orgId}/assumption`);
  },

  update(orgId: number, data: UnitAssumptionUpdate): Promise<UnitAssumption> {
    return apiFetch<UnitAssumption>(`/organizations/${orgId}/assumption`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
