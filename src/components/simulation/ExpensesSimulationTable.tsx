import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ExpenseItem } from "@/lib/types";

interface Props {
  operational: ExpenseItem[];
  nonOperational: ExpenseItem[];
  totalNonOperational: number;
  total: number;
}

export function ExpensesSimulationTable({
  operational,
  nonOperational,
  totalNonOperational,
  total,
}: Props) {
  // Backend mencampur biaya unit sendiri dengan alokasi dari induk di dalam
  // `operational`. Pisahkan berdasarkan prefix description yang ditulis backend.
  const ownOperational = operational.filter(
    (r) => !r.description?.startsWith("[Alokasi ")
  );
  const cabangItems = operational.filter((r) =>
    r.description?.startsWith("[Alokasi Cabang]")
  );
  const pusatItems = operational.filter((r) =>
    r.description?.startsWith("[Alokasi Pusat]")
  );

  const totalOwnOperational = ownOperational.reduce(
    (sum, r) => sum + (r.total ?? 0),
    0
  );
  const totalCabang = cabangItems.reduce((sum, r) => sum + (r.total ?? 0), 0);
  const totalPusat = pusatItems.reduce((sum, r) => sum + (r.total ?? 0), 0);

  const hasCabang = cabangItems.length > 0;
  const hasPusat = pusatItems.length > 0;

  const renderRows = (rows: ExpenseItem[], stripPrefix?: string) =>
    rows.map((row, i) => (
      <TableRow key={i}>
        <TableCell className="font-mono text-xs text-muted-foreground">
          {row.account_code?.replace("ALLOC:", "") ?? "-"}
        </TableCell>
        <TableCell>
          {stripPrefix
            ? (row.description?.replace(stripPrefix, "").trim() ?? "-")
            : (row.description ?? "-")}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {formatCurrency(row.total ?? 0)}
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Akun</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right w-44">Jumlah</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Seksi: Biaya Operasional (unit sendiri) */}
          <TableRow className="bg-muted/40">
            <TableCell colSpan={3} className="font-semibold text-sm">
              Biaya Operasional
            </TableCell>
          </TableRow>
          {renderRows(ownOperational)}
          <TableRow className="bg-muted/40 font-medium">
            <TableCell colSpan={2} className="text-sm">
              Total Biaya Operasional
            </TableCell>
            <TableCell className="text-right tabular-nums text-sm">
              {formatCurrency(totalOwnOperational)}
            </TableCell>
          </TableRow>

          {/* Seksi: Biaya Non-Operasional (unit sendiri) */}
          <TableRow className="bg-muted/40">
            <TableCell colSpan={3} className="font-semibold text-sm">
              Biaya Non-Operasional
            </TableCell>
          </TableRow>
          {renderRows(nonOperational)}
          <TableRow className="bg-muted/40 font-medium">
            <TableCell colSpan={2} className="text-sm">
              Total Biaya Non-Operasional
            </TableCell>
            <TableCell className="text-right tabular-nums text-sm">
              {formatCurrency(totalNonOperational)}
            </TableCell>
          </TableRow>

          {/* Seksi: Alokasi Biaya Cabang */}
          {hasCabang && (
            <>
              <TableRow className="bg-amber-50 dark:bg-amber-950/30">
                <TableCell colSpan={3} className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                  Alokasi Biaya Cabang
                </TableCell>
              </TableRow>
              {renderRows(cabangItems, "[Alokasi Cabang]")}
              <TableRow className="bg-amber-50 dark:bg-amber-950/30 font-medium">
                <TableCell colSpan={2} className="text-sm text-amber-800 dark:text-amber-300">
                  Total Alokasi Cabang
                </TableCell>
                <TableCell className="text-right text-sm tabular-nums text-amber-800 dark:text-amber-300">
                  {formatCurrency(totalCabang)}
                </TableCell>
              </TableRow>
            </>
          )}

          {/* Seksi: Alokasi Biaya Pusat */}
          {hasPusat && (
            <>
              <TableRow className="bg-sky-50 dark:bg-sky-950/30">
                <TableCell colSpan={3} className="font-semibold text-sm text-sky-800 dark:text-sky-300">
                  Alokasi Biaya Pusat
                </TableCell>
              </TableRow>
              {renderRows(pusatItems, "[Alokasi Pusat]")}
              <TableRow className="bg-sky-50 dark:bg-sky-950/30 font-medium">
                <TableCell colSpan={2} className="text-sm text-sky-800 dark:text-sky-300">
                  Total Alokasi Pusat
                </TableCell>
                <TableCell className="text-right text-sm tabular-nums text-sky-800 dark:text-sky-300">
                  {formatCurrency(totalPusat)}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Biaya
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
