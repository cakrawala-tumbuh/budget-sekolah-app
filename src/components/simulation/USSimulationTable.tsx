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
  allocatedComponents: USComponent[];
  totalStudents: number;
  totalOwnCost: number;
  totalUsCost: number;
  finalUsRate: number;
}

export function USSimulationTable({
  components,
  allocatedComponents,
  totalStudents,
  totalOwnCost,
  totalUsCost,
  finalUsRate,
}: Props) {
  const hasAllocation = allocatedComponents.length > 0;

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
                {totalStudents > 0
                  ? formatCurrency(totalOwnCost / (totalStudents * 12))
                  : "-"}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi dari Cabang/Pusat */}
          {allocatedComponents.map((row, i) => (
            <TableRow key={`alloc-${i}`} className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">
                {row.account_code?.replace("ALLOC:", "") ?? "-"}
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
