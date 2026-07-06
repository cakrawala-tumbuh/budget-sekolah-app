import { cn, formatCurrency } from "@/lib/utils";
import type { BudgetSummary } from "@/lib/types";

interface ReportKpiCardsProps {
  summary: BudgetSummary;
}

function KpiCard({
  label,
  value,
  textColor,
  bgColor,
}: {
  label: string;
  value: number;
  textColor: string;
  bgColor: string;
}) {
  return (
    <div
      className={cn("report-keep rounded-lg border p-4", bgColor)}
      style={{ borderColor: "#e2e8f0" }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-[#475569]">{label}</p>
      <p className={cn("mt-1 text-lg font-bold tabular-nums", textColor)}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export function ReportKpiCards({ summary }: ReportKpiCardsProps) {
  const cashPositive = summary.cash_surplus_deficit >= 0;

  return (
    <div className="grid grid-cols-2 gap-3 px-8 py-6 md:grid-cols-4">
      <KpiCard
        label="Total Pendapatan"
        value={summary.total_cash_revenue}
        textColor="text-[#047857]"
        bgColor="bg-[#ecfdf5]"
      />
      <KpiCard
        label="Total Beban"
        value={summary.total_cash_expenses}
        textColor="text-[#be123c]"
        bgColor="bg-[#fff1f2]"
      />
      <KpiCard
        label={cashPositive ? "Surplus Kas" : "Defisit Kas"}
        value={summary.cash_surplus_deficit}
        textColor={cashPositive ? "text-[#15803d]" : "text-[#b91c1c]"}
        bgColor={cashPositive ? "bg-[#f0fdf4]" : "bg-[#fef2f2]"}
      />
      <KpiCard
        label="Saldo Kas Akhir"
        value={summary.ending_cash_balance}
        textColor="text-[#0f766e]"
        bgColor="bg-[#f0fdfa]"
      />
    </div>
  );
}
