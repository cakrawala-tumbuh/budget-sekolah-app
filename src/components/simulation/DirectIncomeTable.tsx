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
  const grouped = data.items.reduce<
    Record<string, { code: string; label: string; items: typeof data.items; subtotal: number }>
  >((acc, item) => {
    const key = item.income_code;
    if (!acc[key]) {
      acc[key] = { code: item.income_code, label: item.income_label, items: [], subtotal: 0 };
    }
    acc[key].items.push(item);
    acc[key].subtotal += item.total;
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Biaya</TableHead>
            <TableHead>Uraian Biaya</TableHead>
            <TableHead className="text-right w-44">Nominal (Rp)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                Tidak ada biaya bertipe Direct Income.
              </TableCell>
            </TableRow>
          ) : (
            groups.map((group) => (
              <>
                <TableRow key={`group-${group.code}`} className="bg-muted/50">
                  <TableCell
                    colSpan={2}
                    className="font-semibold text-sm py-2"
                  >
                    <span className="font-mono text-xs text-muted-foreground mr-2">
                      {group.code}
                    </span>
                    {group.label}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-sm py-2">
                    {formatCurrency(group.subtotal)}
                  </TableCell>
                </TableRow>
                {group.items.map((item, i) => (
                  <TableRow key={`${group.code}-${i}`}>
                    <TableCell className="font-mono text-xs text-muted-foreground pl-8">
                      {item.expense_code}
                    </TableCell>
                    <TableCell className="text-sm">{item.expense_label}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))
          )}
        </TableBody>
        {data.items.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
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
