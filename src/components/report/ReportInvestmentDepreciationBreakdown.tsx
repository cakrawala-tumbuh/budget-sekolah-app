import { buildInvestmentDepreciationBreakdown } from "@/lib/report";
import { formatCurrency } from "@/lib/utils";
import type { BudgetSummary } from "@/lib/types";

interface ReportInvestmentDepreciationBreakdownProps {
  summary: BudgetSummary;
}

/**
 * Rincian Unit vs Alokasi Cabang/Pusat untuk investasi aset tetap, investasi
 * keuangan, depresiasi aset baru, dan depresiasi aset lama — masing-masing
 * ditampilkan sebagai baris tersendiri (bukan digabung menjadi satu angka),
 * tanpa rincian per item/aset.
 */
export function ReportInvestmentDepreciationBreakdown({
  summary,
}: ReportInvestmentDepreciationBreakdownProps) {
  const rows = buildInvestmentDepreciationBreakdown(summary).filter(
    (r) => r.unit !== 0 || r.cabang !== 0 || r.pusat !== 0,
  );
  if (rows.length === 0) return null;

  return (
    <div className="report-keep px-8 py-4">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#134e4a]">
        Rincian Investasi &amp; Depresiasi — Unit vs Alokasi Induk
      </h2>
      <p className="mb-3 text-xs text-[#475569]">
        Investasi Aset Tetap adalah pembelian aset milik unit sendiri (tidak
        menerima alokasi induk). Investasi Keuangan dan Depresiasi dapat berasal
        dari unit sendiri maupun alokasi kontribusi Cabang/Pusat.
      </p>
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#134e4a] text-white">
              <th className="px-3 py-2 text-left font-semibold">Uraian</th>
              <th className="px-3 py-2 text-right font-semibold">Unit</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Cabang</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Pusat</th>
              <th className="px-3 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
