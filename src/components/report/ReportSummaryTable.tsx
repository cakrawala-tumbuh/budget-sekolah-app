import { buildReportRows, type ReportRow } from "@/lib/report";
import { cn, formatCurrency } from "@/lib/utils";
import type { BudgetSummary } from "@/lib/types";

interface ReportSummaryTableProps {
  summary: BudgetSummary;
}

function Row({ row }: { row: ReportRow }) {
  if (row.kind === "section") {
    return (
      <tr className="bg-[#0f766e] text-white">
        <td colSpan={4} className="px-3 py-2 text-sm font-semibold uppercase tracking-wide">
          {row.label}
        </td>
      </tr>
    );
  }

  const selisih = row.kas !== null && row.akrual !== null ? row.kas - row.akrual : null;
  const surplusValue = row.kas !== null ? row.kas : (row.akrual ?? 0);
  const surplusPositive = surplusValue >= 0;

  return (
    <tr
      className={cn(
        "border-b",
        row.kind === "sub" && "bg-[#f0fdfa] font-medium",
        row.kind === "total" && "bg-[#ccfbf1] font-semibold",
        row.kind === "line" && "bg-white",
        row.kind === "surplus" &&
          (surplusPositive
            ? "bg-[#f0fdf4] font-bold text-[#15803d]"
            : "bg-[#fef2f2] font-bold text-[#b91c1c]"),
      )}
      style={{ borderColor: "#e2e8f0" }}
    >
      <td
        className={cn(
          "px-3 py-1.5 text-sm",
          row.kind === "line" && "pl-10 text-xs text-[#475569]",
        )}
      >
        {row.label}
      </td>
      <td className="w-44 px-3 py-1.5 text-right text-sm tabular-nums">
        {row.kas !== null ? formatCurrency(row.kas) : ""}
      </td>
      <td className="w-44 px-3 py-1.5 text-right text-sm tabular-nums">
        {row.akrual !== null ? formatCurrency(row.akrual) : ""}
      </td>
      <td
        className={cn(
          "w-36 px-3 py-1.5 text-right text-sm tabular-nums",
          selisih !== null && selisih > 0 && "text-[#b45309]",
        )}
      >
        {selisih !== null ? formatCurrency(selisih) : ""}
      </td>
    </tr>
  );
}

export function ReportSummaryTable({ summary }: ReportSummaryTableProps) {
  const rows = buildReportRows(summary);

  return (
    <div className="report-keep px-8 py-2">
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#134e4a] text-white">
              <th className="px-3 py-2 text-left font-semibold">Uraian</th>
              <th className="w-44 px-3 py-2 text-right font-semibold">Budget KAS</th>
              <th className="w-44 px-3 py-2 text-right font-semibold">Budget AKRUAL</th>
              <th className="w-36 px-3 py-2 text-right font-semibold">Selisih Kas−Akrual</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <Row key={`${row.kind}-${row.label}-${i}`} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
