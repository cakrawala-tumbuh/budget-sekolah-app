"use client";

import { useQuery } from "@tanstack/react-query";
import { simulationApi } from "@/lib/api/simulation";

export const simulationKeys = {
  up: (id: number, includeParentAllocation = true) =>
    ["simulation", id, "up", includeParentAllocation] as const,
  us: (id: number, includeParentAllocation = true) =>
    ["simulation", id, "us", includeParentAllocation] as const,
  income: (id: number, includeParentAllocation = true) =>
    ["simulation", id, "income", includeParentAllocation] as const,
  expenses: (id: number, includeParentAllocation = true) =>
    ["simulation", id, "expenses", includeParentAllocation] as const,
  allocation: (id: number) => ["simulation", id, "allocation"] as const,
  depreciation: (id: number) => ["simulation", id, "depreciation"] as const,
  bosIncome: (id: number) => ["simulation", id, "bos-income"] as const,
  directIncome: (id: number) => ["simulation", id, "direct-income"] as const,
  summary: (id: number, includeParentAllocation = true) =>
    ["simulation", id, "summary", includeParentAllocation] as const,
};

export function useUPSimulation(orgId: number, includeParentAllocation = true) {
  return useQuery({
    queryKey: simulationKeys.up(orgId, includeParentAllocation),
    queryFn: () => simulationApi.getUP(orgId, includeParentAllocation),
    enabled: !!orgId,
  });
}

export function useUSSimulation(orgId: number, includeParentAllocation = true) {
  return useQuery({
    queryKey: simulationKeys.us(orgId, includeParentAllocation),
    queryFn: () => simulationApi.getUS(orgId, includeParentAllocation),
    enabled: !!orgId,
  });
}

export function useIncomeSimulation(orgId: number, includeParentAllocation = true) {
  return useQuery({
    queryKey: simulationKeys.income(orgId, includeParentAllocation),
    queryFn: () => simulationApi.getIncome(orgId, includeParentAllocation),
    enabled: !!orgId,
  });
}

export function useExpenseSimulation(orgId: number, includeParentAllocation = true) {
  return useQuery({
    queryKey: simulationKeys.expenses(orgId, includeParentAllocation),
    queryFn: () => simulationApi.getExpenses(orgId, includeParentAllocation),
    enabled: !!orgId,
  });
}

export function useAllocationSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.allocation(orgId),
    queryFn: () => simulationApi.getAllocation(orgId),
    enabled: !!orgId,
  });
}

export function useDepreciationSummary(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.depreciation(orgId),
    queryFn: () => simulationApi.getDepreciation(orgId),
    enabled: !!orgId,
  });
}

export function useBosIncomeSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.bosIncome(orgId),
    queryFn: () => simulationApi.getBosIncome(orgId),
    enabled: !!orgId,
  });
}

export function useDirectIncomeSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.directIncome(orgId),
    queryFn: () => simulationApi.getDirectIncome(orgId),
    enabled: !!orgId,
  });
}

export function useBudgetSummary(orgId: number, includeParentAllocation = true) {
  return useQuery({
    queryKey: simulationKeys.summary(orgId, includeParentAllocation),
    queryFn: () => simulationApi.getSummary(orgId, includeParentAllocation),
    enabled: !!orgId,
  });
}
