import { formatCurrency } from "@/lib/utils";
import type { DirectIncomeSimulation } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DirectIncomeTableProps {
  data: DirectIncomeSimulation;
}

export function DirectIncomeTable({ data }: DirectIncomeTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Biaya</TableHead>
            <TableHead>Uraian Biaya</TableHead>
            <TableHead className="w-36">Kode Pendapatan</TableHead>
            <TableHead>Kategori Pendapatan</TableHead>
            <TableHead className="text-right w-44">Nominal (Rp)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                Tidak ada biaya bertipe Direct Income.
              </TableCell>
            </TableRow>
          ) : (
            data.items.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {item.expense_code}
                </TableCell>
                <TableCell>{item.expense_label}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {item.income_code}
                </TableCell>
                <TableCell>{item.income_label}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatCurrency(item.total)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {data.items.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-semibold">
                Total Pendapatan dari Biaya
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(data.total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
