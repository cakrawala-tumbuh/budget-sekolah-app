"use client";

import { useQuery } from "@tanstack/react-query";
import { simulationApi } from "@/lib/api/simulation";

export const simulationKeys = {
  up: (id: number) => ["simulation", id, "up"] as const,
  us: (id: number) => ["simulation", id, "us"] as const,
  income: (id: number) => ["simulation", id, "income"] as const,
  expenses: (id: number) => ["simulation", id, "expenses"] as const,
  allocation: (id: number) => ["simulation", id, "allocation"] as const,
  depreciation: (id: number) => ["simulation", id, "depreciation"] as const,
  bosIncome: (id: number) => ["simulation", id, "bos-income"] as const,
  directIncome: (id: number) => ["simulation", id, "direct-income"] as const,
  summary: (id: number) => ["simulation", id, "summary"] as const,
};

export function useUPSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.up(orgId),
    queryFn: () => simulationApi.getUP(orgId),
    enabled: !!orgId,
  });
}

export function useUSSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.us(orgId),
    queryFn: () => simulationApi.getUS(orgId),
    enabled: !!orgId,
  });
}

export function useIncomeSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.income(orgId),
    queryFn: () => simulationApi.getIncome(orgId),
    enabled: !!orgId,
  });
}

export function useExpenseSimulation(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.expenses(orgId),
    queryFn: () => simulationApi.getExpenses(orgId),
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

export function useBudgetSummary(orgId: number) {
  return useQuery({
    queryKey: simulationKeys.summary(orgId),
    queryFn: () => simulationApi.getSummary(orgId),
    enabled: !!orgId,
  });
}
