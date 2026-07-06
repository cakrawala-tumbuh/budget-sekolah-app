import { cn, formatCurrency, ORG_TYPE_LABEL } from "@/lib/utils";
import type { ComparativeSummary, OrgSummaryRow } from "@/lib/types";

interface ReportConsolidationProps {
  data: ComparativeSummary;
}

function MoneyCell({ value, tone }: { value: number; tone: "revenue" | "expenses" | "signed" }) {
  if (tone === "signed") {
    const positive = value >= 0;
    return (
      <td
        className={cn(
          "px-3 py-1.5 text-right text-sm font-semibold tabular-nums",
          positive ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#fef2f2] text-[#b91c1c]",
        )}
      >
        {formatCurrency(value)}
      </td>
    );
  }
  return (
    <td
      className={cn(
        "px-3 py-1.5 text-right text-sm tabular-nums",
        tone === "revenue" ? "text-[#047857]" : "text-[#be123c]",
      )}
    >
      {formatCurrency(value)}
    </td>
  );
}

function ConsolidationRow({ row, isParent }: { row: OrgSummaryRow; isParent?: boolean }) {
  const summary = row.summary_with_allocation;
  return (
    <tr className={cn("border-b", isParent && "bg-[#f0fdfa] font-semibold")} style={{ borderColor: "#e2e8f0" }}>
      <td className="px-3 py-1.5 text-sm">
        {summary.organization_name}
        <span className="ml-2 text-xs font-normal text-[#475569]">
          ({ORG_TYPE_LABEL[summary.org_type] ?? summary.org_type})
        </span>
      </td>
      <MoneyCell value={summary.total_cash_revenue} tone="revenue" />
      <MoneyCell value={summary.total_cash_expenses} tone="expenses" />
      <MoneyCell value={summary.cash_surplus_deficit} tone="signed" />
      <MoneyCell value={summary.accrual_surplus_deficit} tone="signed" />
    </tr>
  );
}

export function ReportConsolidation({ data }: ReportConsolidationProps) {
  const totalRevenue =
    data.organization.summary_with_allocation.total_cash_revenue +
    data.units.reduce((a, u) => a + u.summary_with_allocation.total_cash_revenue, 0);
  const totalExpenses =
    data.organization.summary_with_allocation.total_cash_expenses +
    data.units.reduce((a, u) => a + u.summary_with_allocation.total_cash_expenses, 0);
  const totalCashSD =
    data.organization.summary_with_allocation.cash_surplus_deficit +
    data.units.reduce((a, u) => a + u.summary_with_allocation.cash_surplus_deficit, 0);
  const totalAccrualSD =
    data.organization.summary_with_allocation.accrual_surplus_deficit +
    data.units.reduce((a, u) => a + u.summary_with_allocation.accrual_surplus_deficit, 0);

  return (
    <div className="print-break-before px-8 py-6">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#134e4a]">
        Konsolidasi Seluruh Unit
      </h2>
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#134e4a] text-white">
              <th className="px-3 py-2 text-left font-semibold">Organisasi</th>
              <th className="px-3 py-2 text-right font-semibold">Pendapatan</th>
              <th className="px-3 py-2 text-right font-semibold">Beban</th>
              <th className="px-3 py-2 text-right font-semibold">Surplus/Defisit Kas</th>
              <th className="px-3 py-2 text-right font-semibold">Surplus/Defisit Akrual</th>
            </tr>
          </thead>
          <tbody>
            <ConsolidationRow row={data.organization} isParent />
            {data.units.map((unit) => (
              <ConsolidationRow key={unit.summary_with_allocation.organization_id} row={unit} />
            ))}
            <tr className="bg-[#ccfbf1] font-bold">
              <td className="px-3 py-2 text-sm">TOTAL KONSOLIDASI</td>
              <MoneyCell value={totalRevenue} tone="revenue" />
              <MoneyCell value={totalExpenses} tone="expenses" />
              <MoneyCell value={totalCashSD} tone="signed" />
              <MoneyCell value={totalAccrualSD} tone="signed" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
