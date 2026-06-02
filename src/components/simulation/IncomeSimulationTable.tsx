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
import type { IncomeSimulation } from "@/lib/types";

interface IncomeSimulationTableProps {
  income: IncomeSimulation;
}

/**
 * Tabel simulasi pendapatan dengan dua versi nilai:
 * - Otomatis: pendapatan UP/US dari perhitungan otomatis.
 * - Override Unit: pendapatan UP/US memakai tarif override yang diisi di unit.
 *
 * Komponen pendapatan selain UP/US bernilai sama pada kedua versi.
 */
export function IncomeSimulationTable({ income }: IncomeSimulationTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Akun</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right w-44">Otomatis</TableHead>
            <TableHead className="text-right w-44">Override Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {income.items.map((row, i) => {
            const differs = Math.abs(row.auto_total - row.total) > 0.5;
            return (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {row.account_code ?? "-"}
                </TableCell>
                <TableCell>{row.description ?? "-"}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(row.auto_total)}
                </TableCell>
                <TableCell
                  className={`text-right tabular-nums ${differs ? "font-medium text-blue-600" : ""}`}
                >
                  {formatCurrency(row.total)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Pendapatan
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(income.total_auto)}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(income.total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
