import type { ReportRow } from "@/lib/report";

interface RabSummaryTableProps {
  rows: ReportRow[];
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
      <td className="w-44 px-3 py-1.5 text-right text-sm tabular-nums">—</td>
      <td className="w-44 px-3 py-1.5 text-right text-sm tabular-nums">—</td>
    </tr>
  );
}

/**
 * Tabel kerangka Laporan RAB Summary — presentational murni, tidak memanggil API
 * sendiri (mengikuti pola `ReportSummaryTable`). Menerima baris yang SUDAH
 * dipotong lewat `buildRabSummaryRows`, jadi hanya berisi baris kelompok
 * (`kind` `"section"`/`"sub"`). Kolom nilai (`Budget KAS`/`Budget AKRUAL`)
 * sengaja dirender `—` untuk semua baris pada iterasi ini (Keputusan Desain
 * issue #3) — angka menyusul di item backlog berikutnya. Bila `rows` kosong,
 * menampilkan pesan kosong alih-alih tabel tanpa baris.
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
