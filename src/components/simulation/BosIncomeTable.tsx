import { formatCurrency } from "@/lib/utils";
import type { BosIncomeSimulation } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BosIncomeTableProps {
  data: BosIncomeSimulation;
}

export function BosIncomeTable({ data }: BosIncomeTableProps) {
  const expenseItems = data.items.filter((i) => i.source === "expense");
  const investmentItems = data.items.filter((i) => i.source === "investment");

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Akun</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right w-44">Dana BoS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseItems.length > 0 && (
            <>
              <TableRow className="bg-muted/40">
                <TableCell colSpan={3} className="text-xs font-semibold uppercase text-muted-foreground py-2">
                  Komponen Biaya Operasional
                </TableCell>
              </TableRow>
              {expenseItems.map((item, i) => (
                <TableRow key={`exp-${i}`}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.code}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/20">
                <TableCell colSpan={2} className="text-sm font-medium">
                  Subtotal Biaya Operasional
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatCurrency(data.total_from_expenses)}
                </TableCell>
              </TableRow>
            </>
          )}

          {investmentItems.length > 0 && (
            <>
              <TableRow className="bg-muted/40">
                <TableCell colSpan={3} className="text-xs font-semibold uppercase text-muted-foreground py-2">
                  Komponen Investasi
                </TableCell>
              </TableRow>
              {investmentItems.map((item, i) => (
                <TableRow key={`inv-${i}`}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.code}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/20">
                <TableCell colSpan={2} className="text-sm font-medium">
                  Subtotal Investasi
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatCurrency(data.total_from_investments)}
                </TableCell>
              </TableRow>
            </>
          )}

          {data.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                Tidak ada dana BoS yang tercatat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {data.items.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total Pendapatan BoS
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
