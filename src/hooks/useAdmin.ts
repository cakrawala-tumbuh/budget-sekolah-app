"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  incomeCategoriesApi,
  expenseCategoriesApi,
  investmentCategoriesApi,
  usersApi,
  databaseApi,
} from "@/lib/api/admin";
import type {
  IncomeCategoryCreate,
  IncomeCategoryUpdate,
  ExpenseCategoryCreate,
  ExpenseCategoryUpdate,
  InvestmentCategoryCreate,
  InvestmentCategoryUpdate,
} from "@/lib/types";

// ── Income Categories ─────────────────────────────────────────────────────────

const incomeCatKeys = {
  all: ["income-categories"] as const,
};

export function useIncomeCategories() {
  return useQuery({
    queryKey: incomeCatKeys.all,
    queryFn: incomeCategoriesApi.list,
  });
}

export function useCreateIncomeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IncomeCategoryCreate) => incomeCategoriesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeCatKeys.all }),
  });
}

export function useUpdateIncomeCategory(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IncomeCategoryUpdate) =>
      incomeCategoriesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeCatKeys.all }),
  });
}

export function useDeleteIncomeCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => incomeCategoriesApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeCatKeys.all }),
  });
}

export function useSeedIncomeCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: incomeCategoriesApi.seedDefaults,
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeCatKeys.all }),
  });
}

// ── Expense Categories ────────────────────────────────────────────────────────

const expenseCatKeys = {
  all: ["expense-categories"] as const,
};

export function useExpenseCategories() {
  return useQuery({
    queryKey: expenseCatKeys.all,
    queryFn: expenseCategoriesApi.list,
  });
}

export function useCreateExpenseCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseCategoryCreate) =>
      expenseCategoriesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseCatKeys.all }),
  });
}

export function useUpdateExpenseCategory(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseCategoryUpdate) =>
      expenseCategoriesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseCatKeys.all }),
  });
}

export function useDeleteExpenseCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => expenseCategoriesApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseCatKeys.all }),
  });
}

export function useSeedExpenseCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: expenseCategoriesApi.seedDefaults,
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseCatKeys.all }),
  });
}

// ── Investment Categories ─────────────────────────────────────────────────────

const investmentCatKeys = {
  all: ["investment-categories"] as const,
};

export function useInvestmentCategories() {
  return useQuery({
    queryKey: investmentCatKeys.all,
    queryFn: investmentCategoriesApi.list,
  });
}

export function useCreateInvestmentCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InvestmentCategoryCreate) =>
      investmentCategoriesApi.create(data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: investmentCatKeys.all }),
  });
}

export function useUpdateInvestmentCategory(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InvestmentCategoryUpdate) =>
      investmentCategoriesApi.update(id, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: investmentCatKeys.all }),
  });
}

export function useDeleteInvestmentCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => investmentCategoriesApi.remove(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: investmentCatKeys.all }),
  });
}

export function useSeedInvestmentCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: investmentCategoriesApi.seedDefaults,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: investmentCatKeys.all }),
  });
}

// ── Users ─────────────────────────────────────────────────────────────────────

const userKeys = {
  all: ["users"] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: usersApi.list,
  });
}

export function useResetOrgPassword() {
  return useMutation({
    mutationFn: (orgId: number) => usersApi.resetPassword(orgId),
  });
}

// ── Database ──────────────────────────────────────────────────────────────────

export function useBackupDatabase() {
  return useMutation({
    mutationFn: databaseApi.backup,
  });
}

export function useRestoreDatabase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => databaseApi.restore(file),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}
