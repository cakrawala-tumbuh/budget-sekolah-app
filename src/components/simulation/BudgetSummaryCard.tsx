import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import type { BudgetSummary } from "@/lib/types";

interface BudgetSummaryCardProps {
  summary: BudgetSummary;
}

interface StatCardProps {
  title: string;
  /** Versi perhitungan otomatis */
  autoValue: string;
  autoColorClass?: string;
  /** Versi dengan pendapatan UP/US yang sudah dioverride di unit */
  overrideValue: string;
  overrideColorClass?: string;
  icon: React.ElementType;
}

function StatCard({
  title,
  autoValue,
  autoColorClass = "",
  overrideValue,
  overrideColorClass = "",
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Otomatis
          </p>
          <p className={`text-lg font-bold leading-tight ${autoColorClass}`}>{autoValue}</p>
        </div>
        <div className="border-t pt-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Override Unit
          </p>
          <p className={`text-lg font-bold leading-tight ${overrideColorClass}`}>
            {overrideValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BudgetSummaryCard({ summary }: BudgetSummaryCardProps) {
  const cashAutoPositive = summary.cash_surplus_deficit_auto >= 0;
  const cashOverridePositive = summary.cash_surplus_deficit >= 0;
  const accrualAutoPositive = summary.accrual_surplus_deficit_auto >= 0;
  const accrualOverridePositive = summary.accrual_surplus_deficit >= 0;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        title="Total Pendapatan"
        autoValue={formatCurrency(summary.total_cash_revenue_auto)}
        autoColorClass="text-green-600"
        overrideValue={formatCurrency(summary.total_cash_revenue)}
        overrideColorClass="text-green-600"
        icon={TrendingUp}
      />
      <StatCard
        title="Total Pengeluaran"
        autoValue={formatCurrency(summary.total_cash_expenses)}
        autoColorClass="text-red-600"
        overrideValue={formatCurrency(summary.total_cash_expenses)}
        overrideColorClass="text-red-600"
        icon={TrendingDown}
      />
      <StatCard
        title="Surplus / Defisit (Kas)"
        autoValue={`${cashAutoPositive ? "" : "-"}${formatCurrency(
          Math.abs(summary.cash_surplus_deficit_auto),
        )}`}
        autoColorClass={cashAutoPositive ? "text-green-600" : "text-red-600"}
        overrideValue={`${cashOverridePositive ? "" : "-"}${formatCurrency(
          Math.abs(summary.cash_surplus_deficit),
        )}`}
        overrideColorClass={cashOverridePositive ? "text-green-600" : "text-red-600"}
        icon={DollarSign}
      />
      <StatCard
        title="Surplus / Defisit (Akrual)"
        autoValue={`${accrualAutoPositive ? "" : "-"}${formatCurrency(
          Math.abs(summary.accrual_surplus_deficit_auto),
        )}`}
        autoColorClass={accrualAutoPositive ? "text-green-600" : "text-red-600"}
        overrideValue={`${accrualOverridePositive ? "" : "-"}${formatCurrency(
          Math.abs(summary.accrual_surplus_deficit),
        )}`}
        overrideColorClass={accrualOverridePositive ? "text-green-600" : "text-red-600"}
        icon={Users}
      />
    </div>
  );
}
