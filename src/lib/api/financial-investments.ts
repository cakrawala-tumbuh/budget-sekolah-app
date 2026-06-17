import { apiFetch } from "./client";
import type {
  FinancialInvestment,
  FinancialInvestmentCreate,
  FinancialInvestmentUpdate,
} from "@/lib/types";

export const financialInvestmentsApi = {
  list(orgId: number): Promise<FinancialInvestment[]> {
    return apiFetch<FinancialInvestment[]>(
      `/organizations/${orgId}/financial-investments`
    );
  },
  create(orgId: number, data: FinancialInvestmentCreate): Promise<FinancialInvestment> {
    return apiFetch<FinancialInvestment>(
      `/organizations/${orgId}/financial-investments`,
      { method: "POST", body: JSON.stringify(data) }
    );
  },
  update(
    orgId: number,
    invId: number,
    data: FinancialInvestmentUpdate
  ): Promise<FinancialInvestment> {
    return apiFetch<FinancialInvestment>(
      `/organizations/${orgId}/financial-investments/${invId}`,
      { method: "PUT", body: JSON.stringify(data) }
    );
  },
  remove(orgId: number, invId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${orgId}/financial-investments/${invId}`,
      { method: "DELETE" }
    );
  },
};
