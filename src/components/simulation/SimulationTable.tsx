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

interface SimulationRow {
  account_code?: string;
  description?: string;
  uraian?: string;
  amount?: number;
  total?: number;
  anggaran?: number;
}

interface SimulationTableProps {
  rows: SimulationRow[];
  totalLabel?: string;
  totalAmount?: number;
}

export function SimulationTable({
  rows,
  totalLabel = "Total",
  totalAmount,
}: SimulationTableProps) {
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
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {row.account_code ?? "-"}
              </TableCell>
              <TableCell>{row.description ?? row.uraian ?? "-"}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(row.amount ?? row.total ?? row.anggaran ?? 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {totalAmount !== undefined && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                {totalLabel}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(totalAmount)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
