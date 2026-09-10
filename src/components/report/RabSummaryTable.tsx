import type { ReportRow } from "@/lib/report";
import { formatCurrency } from "@/lib/utils";

interface RabSummaryTableProps {
  rows: ReportRow[];
}

/**
 * Merender satu sel nilai (`Budget KAS`/`Budget AKRUAL`) memakai `formatCurrency`
 * saat `value` bukan `null`, atau `—` saat `value` memang `null`. Sengaja
 * membandingkan dengan `!== null` (bukan uji `falsy`) agar nilai `0` tetap
 * dirender sebagai angka nol berformat rupiah, bukan tertukar sebagai kosong.
 */
function ValueCell({ value }: { value: number | null }) {
  return (
    <td className="w-44 px-3 py-1.5 text-right text-sm tabular-nums">
      {value !== null ? formatCurrency(value) : "—"}
    </td>
  );
}

function Row({ row }: { row: ReportRow }) {
  if (row.kind === "section") {
    return (
      <tr className="bg-[#0f766e] text-white">
        <td colSpan={3} className="px-3 py-2 text-sm font-semibold uppercase tracking-wide">
          {row.label}
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b bg-[#f0fdfa] font-medium" style={{ borderColor: "#e2e8f0" }}>
      <td className="px-3 py-1.5 text-sm">{row.label}</td>
      <ValueCell value={row.kas} />
      <ValueCell value={row.akrual} />
    </tr>
  );
}

/**
 * Tabel kerangka Laporan RAB Summary — presentational murni, tidak memanggil API
 * sendiri (mengikuti pola `ReportSummaryTable`). Menerima seluruh baris kelompok
 * dari `buildRabSummaryRows` (`kind` `"section"`/`"sub"`), dari Pendapatan sampai
 * Saldo Kas & Setara Kas, tanpa satu pun baris detail akun. Kolom nilai
 * (`Budget KAS`/`Budget AKRUAL`) menampilkan `formatCurrency(row.kas)` /
 * `formatCurrency(row.akrual)` saat nilainya bukan `null` (Keputusan Desain
 * issue #5) — baris `kind` `"section"` tetap `—` karena `kas`/`akrual`-nya
 * memang `null` di `buildReportRows`, tanpa perlakuan khusus. Ini sengaja
 * BERBEDA dari `ReportSummaryTable`, yang merender string kosong untuk nilai
 * `null`: di sini `—` adalah penanda sengaja-kosong, bukan kelalaian — jangan
 * diseragamkan. Bila `rows` kosong, menampilkan pesan kosong alih-alih tabel
 * tanpa baris.
 */
export function RabSummaryTable({ rows }: RabSummaryTableProps) {
  if (rows.length === 0) {
    return (
      <div className="px-8 py-6 text-sm text-muted-foreground">
        Tidak ada data untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="px-8 py-2">
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#e2e8f0" }}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#134e4a] text-white">
              <th className="px-3 py-2 text-left font-semibold">Uraian</th>
              <th className="w-44 px-3 py-2 text-right font-semibold">Budget KAS</th>
              <th className="w-44 px-3 py-2 text-right font-semibold">Budget AKRUAL</th>
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
