import { apiFetch } from "./client";
import type {
  UPSimulation,
  USSimulation,
  IncomeSimulation,
  ExpenseSimulation,
  AllocationSimulation,
  DepreciationSummary,
  BosIncomeSimulation,
  BudgetSummary,
} from "@/lib/types";

export type SimulationType =
  | "up"
  | "us"
  | "income"
  | "expenses"
  | "allocation"
  | "depreciation"
  | "summary";

export const simulationApi = {
  getUP(orgId: number): Promise<UPSimulation> {
    return apiFetch<UPSimulation>(`/organizations/${orgId}/simulation/up`);
  },

  getUS(orgId: number): Promise<USSimulation> {
    return apiFetch<USSimulation>(`/organizations/${orgId}/simulation/us`);
  },

  getIncome(orgId: number): Promise<IncomeSimulation> {
    return apiFetch<IncomeSimulation>(
      `/organizations/${orgId}/simulation/income`,
    );
  },

  getExpenses(orgId: number): Promise<ExpenseSimulation> {
    return apiFetch<ExpenseSimulation>(
      `/organizations/${orgId}/simulation/expenses`,
    );
  },

  getAllocation(orgId: number): Promise<AllocationSimulation> {
    return apiFetch<AllocationSimulation>(
      `/organizations/${orgId}/simulation/allocation`,
    );
  },

  getDepreciation(orgId: number): Promise<DepreciationSummary> {
    return apiFetch<DepreciationSummary>(
      `/organizations/${orgId}/simulation/depreciation`,
    );
  },

  getBosIncome(orgId: number): Promise<BosIncomeSimulation> {
    return apiFetch<BosIncomeSimulation>(
      `/organizations/${orgId}/simulation/bos-income`,
    );
  },

  getSummary(orgId: number): Promise<BudgetSummary> {
    return apiFetch<BudgetSummary>(
      `/organizations/${orgId}/simulation/summary`,
    );
  },
};
