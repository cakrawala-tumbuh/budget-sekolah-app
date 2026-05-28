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
import type { UPComponent } from "@/lib/types";

interface Props {
  components: UPComponent[];
  newStudentCount: number;
  totalUpCostWithDep: number;
  finalUpRate: number;
}

export function UPSimulationTable({
  components,
  newStudentCount,
  totalUpCostWithDep,
  finalUpRate,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Akun</TableHead>
            <TableHead>Komponen</TableHead>
            <TableHead className="text-right w-44">Anggaran</TableHead>
            <TableHead className="text-right w-44">Tarif / Siswa Baru</TableHead>
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
                {newStudentCount > 0
                  ? formatCurrency((row.total ?? 0) / newStudentCount)
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Biaya UP
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(totalUpCostWithDep)}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(finalUpRate)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
