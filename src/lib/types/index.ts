// Tipe-tipe domain utama untuk frontend Budget YPII

// ── Auth ──────────────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "ORG";

export interface AuthUser {
  id: number;
  username: string;
  role: UserRole;
  org_id: number | null;
  is_active: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// ── Organization ──────────────────────────────────────────────────────────────

export type OrgType = "UNIT" | "CABANG" | "PUSAT";

export interface Organization {
  id: number;
  code: string;
  name: string;
  org_type: OrgType;
  city: string | null;
  /** Saldo kas & setara kas awal organisasi */
  cash_balance: number;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationWithChildren extends Organization {
  children: Organization[];
}

export interface OrganizationCreate {
  code: string;
  name: string;
  org_type: OrgType;
  city?: string;
  cash_balance?: number;
  parent_id?: number;
}

export interface OrganizationUpdate {
  code?: string;
  name?: string;
  org_type?: OrgType;
  city?: string;
  cash_balance?: number;
  parent_id?: number;
}

export interface UnitAssumption {
  id: number;
  organization_id: number;
  grade_1: number;
  grade_2: number;
  grade_3: number;
  grade_4: number;
  grade_5: number;
  grade_6: number;
  new_student_count: number;
  returning_student_count: number;
  staff_count: number;
  total_students: number;
  override_up_rate: number | null;
  override_us_rate: number | null;
  override_activity_grade_1: number | null;
  override_activity_grade_2: number | null;
  override_activity_grade_3: number | null;
  override_activity_grade_4: number | null;
  override_activity_grade_5: number | null;
  override_activity_grade_6: number | null;
}

export interface UnitAssumptionUpdate {
  grade_1?: number;
  grade_2?: number;
  grade_3?: number;
  grade_4?: number;
  grade_5?: number;
  grade_6?: number;
  new_student_count?: number;
  returning_student_count?: number;
  staff_count?: number;
  override_up_rate?: number | null;
  override_us_rate?: number | null;
  override_activity_grade_1?: number | null;
  override_activity_grade_2?: number | null;
  override_activity_grade_3?: number | null;
  override_activity_grade_4?: number | null;
  override_activity_grade_5?: number | null;
  override_activity_grade_6?: number | null;
}

// ── Grade Config ──────────────────────────────────────────────────────────────

export interface GradeSlot {
  slot: number;
  label: string;
}

export interface GradeConfig {
  id: number;
  organization_id: number;
  num_grades: number;
  grade_1_label: string | null;
  grade_2_label: string | null;
  grade_3_label: string | null;
  grade_4_label: string | null;
  grade_5_label: string | null;
  grade_6_label: string | null;
  active_grades: GradeSlot[];
  created_at: string;
  updated_at: string;
}

export interface GradeConfigUpdate {
  num_grades?: number;
  grade_1_label?: string | null;
  grade_2_label?: string | null;
  grade_3_label?: string | null;
  grade_4_label?: string | null;
  grade_5_label?: string | null;
  grade_6_label?: string | null;
}

export interface GradeAllocation {
  id: number;
  budget_entry_id: number;
  grade_slot: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetEntry {
  id: number;
  organization_id: number;
  expense_category_id: number;
  line_number: number;
  description: string | null;
  basis: string | null;
  foundation: number;
  bos: number;
  total: number;
  notes: string | null;
  grade_allocations: GradeAllocation[];
  created_at: string;
  updated_at: string;
}

export interface BudgetEntryCreate {
  expense_category_id: number;
  line_number: number;
  description?: string;
  basis?: string;
  foundation?: number;
  bos?: number;
  notes?: string;
}

export interface BudgetEntryUpdate {
  description?: string;
  basis?: string;
  foundation?: number;
  bos?: number;
  notes?: string;
}

export interface BudgetEntryBulkCreate {
  entries: BudgetEntryCreate[];
}

export interface Investment {
  id: number;
  organization_id: number;
  investment_category_id: number;
  asset_code: string | null;
  asset_name: string;
  purchase_price: number;
  useful_life: number;
  start_month: number;
  dep_per_year: number;
  dep_current_year: number;
  end_book_value: number;
  created_at: string;
  updated_at: string;
}

export interface InvestmentCreate {
  investment_category_id: number;
  asset_code?: string;
  asset_name: string;
  purchase_price: number;
  useful_life: number;
  start_month: number;
}

export interface InvestmentUpdate {
  investment_category_id?: number;
  asset_code?: string;
  asset_name?: string;
  purchase_price?: number;
  useful_life?: number;
  start_month?: number;
}

export interface IncomeEntry {
  id: number;
  organization_id: number;
  income_category_id: number;
  line_number: number;
  description: string | null;
  basis: string | null;
  amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface IncomeEntryCreate {
  income_category_id: number;
  line_number: number;
  description?: string;
  basis?: string;
  amount?: number;
  notes?: string;
}

export interface IncomeEntryUpdate {
  description?: string;
  basis?: string;
  amount?: number;
  notes?: string;
}

export interface IncomeEntryBulkCreate {
  entries: IncomeEntryCreate[];
}

export interface DepreciationOldAsset {
  id: number;
  organization_id: number;
  asset_code: string | null;
  asset_name: string;
  acquisition_cost: number;
  useful_life: number;
  acquisition_year: number;
  dep_per_year: number;
  dep_current_year: number;
  book_value: number;
  created_at: string;
  updated_at: string;
}

export interface DepreciationOldAssetCreate {
  asset_code?: string;
  asset_name: string;
  acquisition_cost: number;
  useful_life: number;
  acquisition_year: number;
}

export interface DepreciationOldAssetUpdate {
  asset_code?: string;
  asset_name?: string;
  acquisition_cost?: number;
  useful_life?: number;
  acquisition_year?: number;
}

// --- Simulation Types ---

export interface UPComponent {
  account_code: string;
  description: string;
  total: number;
}

export interface UPSimulation {
  components: UPComponent[];
  cabang_allocated_components: UPComponent[];
  pusat_allocated_components: UPComponent[];
  total_up_cost: number;
  cabang_allocated_up_cost: number;
  pusat_allocated_up_cost: number;
  new_investment_dep: number;
  old_asset_dep: number;
  cabang_allocated_new_investment_dep: number;
  pusat_allocated_new_investment_dep: number;
  cabang_allocated_old_asset_dep: number;
  pusat_allocated_old_asset_dep: number;
  total_up_cost_with_dep: number;
  new_student_count: number;
  auto_up_rate: number;
  final_up_rate: number;
  total_up_revenue: number;
  auto_up_revenue: number;
}

export interface USComponent {
  account_code: string;
  description: string;
  total: number;
}

export interface USSimulation {
  components: USComponent[];
  cabang_allocated_components: USComponent[];
  pusat_allocated_components: USComponent[];
  total_us_cost: number;
  cabang_allocated_us_cost: number;
  pusat_allocated_us_cost: number;
  total_students: number;
  months: number;
  auto_us_rate: number;
  final_us_rate: number;
  total_us_revenue: number;
  auto_us_revenue: number;
}

export interface IncomeItem {
  account_code: string;
  description: string;
  total: number;
  auto_total: number;
}

export interface IncomeSimulation {
  items: IncomeItem[];
  total: number;
  total_auto: number;
}

export interface ExpenseItem {
  account_code: string;
  description: string;
  total_yayasan: number;
  total_bos: number;
  total: number;
}

export interface ExpenseSimulation {
  operational: ExpenseItem[];
  non_operational: ExpenseItem[];
  total_operational: number;
  total_non_operational: number;
  total: number;
}

export interface UnitAllocationDetail {
  from_organization_id: number;
  from_organization_name: string;
  total_students: number;
  new_students: number;
  pct_us: number;
  pct_up: number;
  contribution_us: number;
  contribution_up: number;
}

export interface AllocationSimulation {
  total_base_cost_us: number;
  total_base_cost_up: number;
  units: UnitAllocationDetail[];
  total_contribution_us: number;
  total_contribution_up: number;
  is_valid: boolean;
}

export interface DepreciationItem {
  asset_code: string | null;
  asset_name: string;
  acquisition_cost: number;
  useful_life: number;
  dep_per_year: number;
  current_year_dep: number;
  book_value: number;
  source: "new" | "existing";
}

export interface DepreciationSummary {
  items: DepreciationItem[];
  total_current_year_dep: number;
}

export interface BudgetSummary {
  organization_id: number;
  organization_name: string;
  org_type: string;
  budget_year: string;
  // Cash basis
  total_cash_revenue: number;
  total_cash_revenue_auto: number;
  total_cash_expenses: number;
  total_investments: number;
  cash_surplus_deficit: number;
  cash_surplus_deficit_auto: number;
  // Cash & cash equivalents position
  opening_cash_balance: number;
  ending_cash_balance: number;
  ending_cash_balance_auto: number;
  // Accrual basis
  total_accrual_revenue: number;
  total_accrual_revenue_auto: number;
  total_accrual_expenses: number;
  accrual_surplus_deficit: number;
  accrual_surplus_deficit_auto: number;
  // Detail
  income: IncomeSimulation;
  expenses: ExpenseSimulation;
  depreciation: DepreciationSummary;
}

// ── Admin – Master Data ───────────────────────────────────────────────────────

export type IncomeCalcMethod =
  | "MANUAL"
  | "SIMULATED_UP"
  | "SIMULATED_US"
  | "FROM_EXPENSE"
  | "GRADE_BASED"
  | "SUM_FROM_BOS";

export interface IncomeCategory {
  id: number;
  code: string;
  label: string;
  calc_method: IncomeCalcMethod;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface IncomeCategoryCreate {
  code: string;
  label: string;
  calc_method?: IncomeCalcMethod;
  sort_order?: number;
}

export interface IncomeCategoryUpdate {
  label?: string;
  calc_method?: IncomeCalcMethod;
  sort_order?: number;
}

export interface ExpenseCategory {
  id: number;
  code: string;
  label: string;
  is_operational: boolean;
  is_up_component: boolean;
  is_direct_income: boolean;
  maps_to_income_category_id: number | null;
  contribution_role: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ExpenseCategoryCreate {
  code: string;
  label: string;
  is_operational?: boolean;
  is_up_component?: boolean;
  is_direct_income?: boolean;
  maps_to_income_category_id?: number | null;
  contribution_role?: string | null;
  sort_order?: number;
}

export interface ExpenseCategoryUpdate {
  label?: string;
  is_operational?: boolean;
  is_up_component?: boolean;
  is_direct_income?: boolean;
  maps_to_income_category_id?: number | null;
  contribution_role?: string | null;
  sort_order?: number;
}

export interface InvestmentCategory {
  id: number;
  code: string;
  label: string;
  default_economic_life: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface InvestmentCategoryCreate {
  code: string;
  label: string;
  default_economic_life?: number;
  sort_order?: number;
}

export interface InvestmentCategoryUpdate {
  label?: string;
  default_economic_life?: number;
  sort_order?: number;
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
  org_id: number | null;
  is_active: boolean;
}

// ── Contribution Rates & Allocations ─────────────────────────────────────────

export interface ContributionRateSet {
  up_to_pusat: number;
  up_to_cabang: number;
  us_to_pusat: number;
  us_to_cabang: number;
  development_fund: number;
  deficit_reserve: number;
  social_care: number;
  teacher_study: number;
}

export interface ContributionRateRead extends ContributionRateSet {
  organization_id: number;
}

export interface ContributionAllocationCreate {
  from_organization_id: number;
  total_students: number;
  new_students: number;
  override_pct_us: number | null;
  override_pct_up: number | null;
}

export interface ContributionAllocationRead extends ContributionAllocationCreate {
  id: number;
  to_organization_id: number;
  from_organization_name: string | null;
}

// ── Parent Expense Allocations ────────────────────────────────────────────────

export interface ParentExpenseAllocationCreate {
  expense_category_id: number;
  affects_up: boolean;
  is_active: boolean;
}

export interface ParentExpenseAllocationUpdate {
  affects_up?: boolean;
  is_active?: boolean;
}

export interface ParentExpenseAllocationRead extends ParentExpenseAllocationCreate {
  id: number;
  parent_org_id: number;
  expense_category_code: string | null;
  expense_category_label: string | null;
}

// ── Subsidies ─────────────────────────────────────────────────────────────────

export interface SubsidyCreate {
  recipient_org_id: number;
  expense_category_id: number;
  income_category_id: number;
  amount: number;
  is_active: boolean;
}

export interface SubsidyUpdate {
  recipient_org_id?: number;
  expense_category_id?: number;
  income_category_id?: number;
  amount?: number;
  is_active?: boolean;
}

export interface SubsidyRead extends SubsidyCreate {
  id: number;
  provider_org_id: number;
  recipient_org_name: string | null;
  expense_category_code: string | null;
  expense_category_label: string | null;
  income_category_code: string | null;
  income_category_label: string | null;
}
