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
  totalOperational: number;
  totalNonOperational: number;
  total: number;
}

export function ExpensesSimulationTable({
  operational,
  nonOperational,
  totalOperational,
  totalNonOperational,
  total,
}: Props) {
  const renderRows = (rows: ExpenseItem[]) =>
    rows.map((row, i) => (
      <TableRow key={i}>
        <TableCell className="font-mono text-xs text-muted-foreground">
          {row.account_code ?? "-"}
        </TableCell>
        <TableCell>{row.description ?? "-"}</TableCell>
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
          {/* Seksi: Biaya Operasional */}
          <TableRow className="bg-muted/40">
            <TableCell colSpan={3} className="font-semibold text-sm">
              Biaya Operasional
            </TableCell>
          </TableRow>
          {renderRows(operational)}
          <TableRow className="bg-muted/40 font-medium">
            <TableCell colSpan={2} className="text-sm">
              Total Biaya Operasional
            </TableCell>
            <TableCell className="text-right tabular-nums text-sm">
              {formatCurrency(totalOperational)}
            </TableCell>
          </TableRow>

          {/* Seksi: Biaya Non-Operasional */}
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
