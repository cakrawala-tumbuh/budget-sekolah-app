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
  allocatedComponents: UPComponent[];
  newStudentCount: number;
  totalOwnCost: number;
  newInvestmentDep: number;
  oldAssetDep: number;
  totalUpCostWithDep: number;
  finalUpRate: number;
}

export function UPSimulationTable({
  components,
  allocatedComponents,
  newStudentCount,
  totalOwnCost,
  newInvestmentDep,
  oldAssetDep,
  totalUpCostWithDep,
  finalUpRate,
}: Props) {
  const hasExtra =
    newInvestmentDep > 0 || oldAssetDep > 0 || allocatedComponents.length > 0;

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

          {/* Subtotal komponen (hanya tampil jika ada item tambahan) */}
          {hasExtra && (
            <TableRow className="bg-muted/40 font-medium">
              <TableCell colSpan={2} className="text-sm">
                Total Komponen Biaya UP
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {formatCurrency(totalOwnCost)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {newStudentCount > 0
                  ? formatCurrency(totalOwnCost / newStudentCount)
                  : "-"}
              </TableCell>
            </TableRow>
          )}

          {/* Depresiasi */}
          {newInvestmentDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-NEW</TableCell>
              <TableCell>Depresiasi Investasi Baru</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(newInvestmentDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {newStudentCount > 0
                  ? formatCurrency(newInvestmentDep / newStudentCount)
                  : "-"}
              </TableCell>
            </TableRow>
          )}
          {oldAssetDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-OLD</TableCell>
              <TableCell>Depresiasi Aset Lama</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(oldAssetDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {newStudentCount > 0
                  ? formatCurrency(oldAssetDep / newStudentCount)
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
