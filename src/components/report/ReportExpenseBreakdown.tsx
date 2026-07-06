import { buildExpenseBreakdown } from "@/lib/report";
import { formatCurrency } from "@/lib/utils";
import type { ExpenseItem } from "@/lib/types";

interface ReportExpenseBreakdownProps {
  items: ExpenseItem[];
  groups: { code: string; label: string }[];
  title: string;
  totalLabel: string;
}

/**
 * Rincian beban (operasional atau non-operasional) dengan empat nilai eksplisit
 * per kelompok biaya: Biaya Unit, Alokasi Cabang, Alokasi Pusat, dan Total —
 * sehingga pengguna tak perlu menghitung sendiri kontribusi induk.
 */
export function ReportExpenseBreakdown({
  items,
  groups,
  title,
  totalLabel,
}: ReportExpenseBreakdownProps) {
  const breakdown = buildExpenseBreakdown(items, groups);
  if (breakdown.rows.length === 0) return null;

  const hasAllocation = breakdown.totalCabang !== 0 || breakdown.totalPusat !== 0;

  return (
    <div className="report-keep px-8 py-4">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#134e4a]">
        {title}
      </h2>
      <p className="mb-3 text-xs text-[#475569]">
        {hasAllocation
          ? "Beban unit adalah biaya asli satuan pendidikan; alokasi Cabang/Pusat adalah kontribusi yang dibebankan dari induk."
          : "Unit ini tidak menerima alokasi biaya dari Cabang/Pusat — seluruh beban adalah beban unit."}
      </p>
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#134e4a] text-white">
              <th className="px-3 py-2 text-left font-semibold">Kelompok Biaya</th>
              <th className="px-3 py-2 text-right font-semibold">Biaya Unit</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Cabang</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Pusat</th>
              <th className="px-3 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.rows.map((r) => (
              <tr key={r.label} className="border-b bg-white" style={{ borderColor: "#e2e8f0" }}>
                <td className="px-3 py-1.5 text-sm">{r.label}</td>
                <td className="px-3 py-1.5 text-right text-sm tabular-nums text-[#0f172a]">
                  {formatCurrency(r.unit)}
                </td>
                <td className="px-3 py-1.5 text-right text-sm tabular-nums text-[#b45309]">
                  {r.cabang !== 0 ? formatCurrency(r.cabang) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right text-sm tabular-nums text-[#6d28d9]">
                  {r.pusat !== 0 ? formatCurrency(r.pusat) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right text-sm font-medium tabular-nums text-[#0f172a]">
                  {formatCurrency(r.total)}
                </td>
              </tr>
            ))}
            <tr className="bg-[#ccfbf1] font-semibold">
              <td className="px-3 py-2 text-sm">{totalLabel}</td>
              <td className="px-3 py-2 text-right text-sm tabular-nums">
                {formatCurrency(breakdown.totalUnit)}
              </td>
              <td className="px-3 py-2 text-right text-sm tabular-nums text-[#b45309]">
                {formatCurrency(breakdown.totalCabang)}
              </td>
              <td className="px-3 py-2 text-right text-sm tabular-nums text-[#6d28d9]">
                {formatCurrency(breakdown.totalPusat)}
              </td>
              <td className="px-3 py-2 text-right text-sm tabular-nums">
                {formatCurrency(breakdown.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
