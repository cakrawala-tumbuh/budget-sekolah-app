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
import type { USComponent } from "@/lib/types";

interface Props {
  components: USComponent[];
  totalStudents: number;
  totalUsCost: number;
  finalUsRate: number;
}

export function USSimulationTable({
  components,
  totalStudents,
  totalUsCost,
  finalUsRate,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Akun</TableHead>
            <TableHead>Kelompok Biaya</TableHead>
            <TableHead className="text-right w-44">Total Anggaran</TableHead>
            <TableHead className="text-right w-44">Tarif / Siswa / Bln</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {row.account_code ?? "-"}
              </TableCell>
              <TableCell>{row.description ?? "-"}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(row.total ?? 0)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {totalStudents > 0
                  ? formatCurrency((row.total ?? 0) / (totalStudents * 12))
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Biaya US
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(totalUsCost)}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(finalUsRate)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
