import { apiFetch } from "./client";
import type {
  IncomeCategory,
  IncomeCategoryCreate,
  IncomeCategoryUpdate,
  ExpenseCategory,
  ExpenseCategoryCreate,
  ExpenseCategoryUpdate,
  InvestmentCategory,
  InvestmentCategoryCreate,
  InvestmentCategoryUpdate,
  User,
} from "@/lib/types";

// ── Income Categories ─────────────────────────────────────────────────────────

export const incomeCategoriesApi = {
  list(): Promise<IncomeCategory[]> {
    return apiFetch<IncomeCategory[]>("/income-categories");
  },
  create(data: IncomeCategoryCreate): Promise<IncomeCategory> {
    return apiFetch<IncomeCategory>("/income-categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: number, data: IncomeCategoryUpdate): Promise<IncomeCategory> {
    return apiFetch<IncomeCategory>(`/income-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  remove(id: number): Promise<void> {
    return apiFetch<void>(`/income-categories/${id}`, { method: "DELETE" });
  },
  seedDefaults(): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/income-categories/seed-defaults", {
      method: "POST",
    });
  },
};

// ── Expense Categories ────────────────────────────────────────────────────────

export const expenseCategoriesApi = {
  list(): Promise<ExpenseCategory[]> {
    return apiFetch<ExpenseCategory[]>("/expense-categories");
  },
  create(data: ExpenseCategoryCreate): Promise<ExpenseCategory> {
    return apiFetch<ExpenseCategory>("/expense-categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: number, data: ExpenseCategoryUpdate): Promise<ExpenseCategory> {
    return apiFetch<ExpenseCategory>(`/expense-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  remove(id: number): Promise<void> {
    return apiFetch<void>(`/expense-categories/${id}`, { method: "DELETE" });
  },
  seedDefaults(): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/expense-categories/seed-defaults", {
      method: "POST",
    });
  },
};

// ── Investment Categories ─────────────────────────────────────────────────────

export const investmentCategoriesApi = {
  list(): Promise<InvestmentCategory[]> {
    return apiFetch<InvestmentCategory[]>("/investment-categories");
  },
  create(data: InvestmentCategoryCreate): Promise<InvestmentCategory> {
    return apiFetch<InvestmentCategory>("/investment-categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(
    id: number,
    data: InvestmentCategoryUpdate,
  ): Promise<InvestmentCategory> {
    return apiFetch<InvestmentCategory>(`/investment-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  remove(id: number): Promise<void> {
    return apiFetch<void>(`/investment-categories/${id}`, {
      method: "DELETE",
    });
  },
  seedDefaults(): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(
      "/investment-categories/seed-defaults",
      { method: "POST" },
    );
  },
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const usersApi = {
  list(): Promise<User[]> {
    return apiFetch<User[]>("/users");
  },
  resetPassword(
    orgId: number,
  ): Promise<{ username: string; new_password: string }> {
    return apiFetch<{ username: string; new_password: string }>(
      `/organizations/${orgId}/reset-password`,
      { method: "POST" },
    );
  },
};
