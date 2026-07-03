import { apiFetch } from "./client";
import type {
  UPSimulation,
  USSimulation,
  IncomeSimulation,
  ExpenseSimulation,
  AllocationSimulation,
  DepreciationSummary,
  BosIncomeSimulation,
  DirectIncomeSimulation,
  BudgetSummary,
  ComparativeSummary,
} from "@/lib/types";

export type SimulationType =
  | "up"
  | "us"
  | "income"
  | "expenses"
  | "allocation"
  | "depreciation"
  | "summary";

function allocationQuery(includeParentAllocation: boolean): string {
  return includeParentAllocation ? "" : "?include_parent_allocation=false";
}

export const simulationApi = {
  getUP(orgId: number, includeParentAllocation = true): Promise<UPSimulation> {
    return apiFetch<UPSimulation>(
      `/organizations/${orgId}/simulation/up${allocationQuery(includeParentAllocation)}`,
    );
  },

  getUS(orgId: number, includeParentAllocation = true): Promise<USSimulation> {
    return apiFetch<USSimulation>(
      `/organizations/${orgId}/simulation/us${allocationQuery(includeParentAllocation)}`,
    );
  },

  getIncome(
    orgId: number,
    includeParentAllocation = true,
  ): Promise<IncomeSimulation> {
    return apiFetch<IncomeSimulation>(
      `/organizations/${orgId}/simulation/income${allocationQuery(includeParentAllocation)}`,
    );
  },

  getExpenses(
    orgId: number,
    includeParentAllocation = true,
  ): Promise<ExpenseSimulation> {
    return apiFetch<ExpenseSimulation>(
      `/organizations/${orgId}/simulation/expenses${allocationQuery(includeParentAllocation)}`,
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

  getDirectIncome(orgId: number): Promise<DirectIncomeSimulation> {
    return apiFetch<DirectIncomeSimulation>(
      `/organizations/${orgId}/simulation/direct-income`,
    );
  },

  getSummary(
    orgId: number,
    includeParentAllocation = true,
  ): Promise<BudgetSummary> {
    return apiFetch<BudgetSummary>(
      `/organizations/${orgId}/simulation/summary${allocationQuery(includeParentAllocation)}`,
    );
  },

  getComparativeSummary(orgId: number): Promise<ComparativeSummary> {
    return apiFetch<ComparativeSummary>(
      `/organizations/${orgId}/simulation/summary-comparative`,
    );
  },
};
