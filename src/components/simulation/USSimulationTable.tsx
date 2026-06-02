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
  cabangAllocatedComponents: USComponent[];
  pusatAllocatedComponents: USComponent[];
  totalStudents: number;
  totalOwnCost: number;
  totalUsCost: number;
  finalUsRate: number;
}

export function USSimulationTable({
  components,
  cabangAllocatedComponents,
  pusatAllocatedComponents,
  totalStudents,
  totalOwnCost,
  totalUsCost,
  finalUsRate,
}: Props) {
  const perStudentMonth = (value: number) =>
    totalStudents > 0 ? formatCurrency(value / (totalStudents * 12)) : "-";

  const hasAllocation =
    cabangAllocatedComponents.length > 0 || pusatAllocatedComponents.length > 0;

  const renderAllocRows = (rows: USComponent[], keyPrefix: string) =>
    rows.map((row, i) => (
      <TableRow key={`${keyPrefix}-${i}`} className="text-muted-foreground italic">
        <TableCell className="font-mono text-xs">
          {row.account_code?.replace("ALLOC:", "") ?? "-"}
        </TableCell>
        <TableCell>{row.description ?? "-"}</TableCell>
        <TableCell className="text-right tabular-nums">
          {formatCurrency(row.total ?? 0)}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {perStudentMonth(row.total ?? 0)}
        </TableCell>
      </TableRow>
    ));

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
                {perStudentMonth(row.total ?? 0)}
              </TableCell>
            </TableRow>
          ))}

          {/* Subtotal komponen (hanya tampil jika ada alokasi) */}
          {hasAllocation && (
            <TableRow className="bg-muted/40 font-medium">
              <TableCell colSpan={2} className="text-sm">
                Total Komponen Biaya US
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {formatCurrency(totalOwnCost)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {perStudentMonth(totalOwnCost)}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi biaya dari Cabang (terpisah dari Pusat) */}
          {renderAllocRows(cabangAllocatedComponents, "cabang")}
          {renderAllocRows(pusatAllocatedComponents, "pusat")}
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
