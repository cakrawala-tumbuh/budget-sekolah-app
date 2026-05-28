import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import type { BudgetSummary } from "@/lib/types";

interface BudgetSummaryCardProps {
  summary: BudgetSummary;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  colorClass?: string;
}

function StatCard({ title, value, icon: Icon, colorClass = "" }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClass || "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

export function BudgetSummaryCard({ summary }: BudgetSummaryCardProps) {
  const isPositive = summary.cash_surplus_deficit >= 0;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        title="Total Pendapatan"
        value={formatCurrency(summary.total_cash_revenue)}
        icon={TrendingUp}
        colorClass="text-green-600"
      />
      <StatCard
        title="Total Pengeluaran"
        value={formatCurrency(summary.total_cash_expenses)}
        icon={TrendingDown}
        colorClass="text-red-600"
      />
      <StatCard
        title={isPositive ? "Surplus (Kas)" : "Defisit (Kas)"}
        value={formatCurrency(Math.abs(summary.cash_surplus_deficit))}
        icon={DollarSign}
        colorClass={isPositive ? "text-green-600" : "text-red-600"}
      />
      <StatCard
        title={summary.accrual_surplus_deficit >= 0 ? "Surplus (Akrual)" : "Defisit (Akrual)"}
        value={formatCurrency(Math.abs(summary.accrual_surplus_deficit))}
        icon={Users}
        colorClass={summary.accrual_surplus_deficit >= 0 ? "text-green-600" : "text-red-600"}
      />
    </div>
  );
}
