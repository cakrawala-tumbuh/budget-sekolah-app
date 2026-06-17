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
  cabangAllocatedComponents: UPComponent[];
  pusatAllocatedComponents: UPComponent[];
  newStudentCount: number;
  totalOwnCost: number;
  newInvestmentDep: number;
  oldAssetDep: number;
  cabangAllocatedNewInvestmentDep: number;
  pusatAllocatedNewInvestmentDep: number;
  cabangAllocatedOldAssetDep: number;
  pusatAllocatedOldAssetDep: number;
  cabangFinancialInvestmentAllocated: number;
  pusatFinancialInvestmentAllocated: number;
  totalUpCostWithDep: number;
  autoUpRate: number;
  finalUpRate: number;
}

export function UPSimulationTable({
  components,
  cabangAllocatedComponents,
  pusatAllocatedComponents,
  newStudentCount,
  totalOwnCost,
  newInvestmentDep,
  oldAssetDep,
  cabangAllocatedNewInvestmentDep,
  pusatAllocatedNewInvestmentDep,
  cabangAllocatedOldAssetDep,
  pusatAllocatedOldAssetDep,
  cabangFinancialInvestmentAllocated,
  pusatFinancialInvestmentAllocated,
  totalUpCostWithDep,
  autoUpRate,
  finalUpRate,
}: Props) {
  const perStudent = (value: number) =>
    newStudentCount > 0 ? formatCurrency(value / newStudentCount) : "-";

  // Override aktif jika tarif final berbeda dari tarif otomatis (hasil kalkulasi).
  const hasOverride = Math.abs(finalUpRate - autoUpRate) > 0.5;
  const overrideRevenue = finalUpRate * newStudentCount;

  const hasExtra =
    newInvestmentDep > 0 ||
    oldAssetDep > 0 ||
    cabangAllocatedNewInvestmentDep > 0 ||
    pusatAllocatedNewInvestmentDep > 0 ||
    cabangAllocatedOldAssetDep > 0 ||
    pusatAllocatedOldAssetDep > 0 ||
    cabangFinancialInvestmentAllocated > 0 ||
    pusatFinancialInvestmentAllocated > 0 ||
    cabangAllocatedComponents.length > 0 ||
    pusatAllocatedComponents.length > 0;

  const renderAllocRows = (rows: UPComponent[], keyPrefix: string) =>
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
          {perStudent(row.total ?? 0)}
        </TableCell>
      </TableRow>
    ));

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
                {perStudent(row.total ?? 0)}
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
                {perStudent(totalOwnCost)}
              </TableCell>
            </TableRow>
          )}

          {/* Depresiasi aset unit sendiri */}
          {newInvestmentDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-NEW</TableCell>
              <TableCell>Depresiasi Investasi Baru</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(newInvestmentDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(newInvestmentDep)}
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
                {perStudent(oldAssetDep)}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi depresiasi investasi baru dari Cabang (terpisah dari Pusat) */}
          {cabangAllocatedNewInvestmentDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-NEW-CABANG</TableCell>
              <TableCell>Depresiasi Investasi Baru Cabang</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(cabangAllocatedNewInvestmentDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(cabangAllocatedNewInvestmentDep)}
              </TableCell>
            </TableRow>
          )}
          {pusatAllocatedNewInvestmentDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-NEW-PUSAT</TableCell>
              <TableCell>Depresiasi Investasi Baru Pusat</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(pusatAllocatedNewInvestmentDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(pusatAllocatedNewInvestmentDep)}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi depresiasi aset lama dari Cabang (terpisah dari Pusat) */}
          {cabangAllocatedOldAssetDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-OLD-CABANG</TableCell>
              <TableCell>Depresiasi Aset Lama Cabang</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(cabangAllocatedOldAssetDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(cabangAllocatedOldAssetDep)}
              </TableCell>
            </TableRow>
          )}
          {pusatAllocatedOldAssetDep > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">DEP-OLD-PUSAT</TableCell>
              <TableCell>Depresiasi Aset Lama Pusat</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(pusatAllocatedOldAssetDep)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(pusatAllocatedOldAssetDep)}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi investasi keuangan dari Cabang & Pusat */}
          {cabangFinancialInvestmentAllocated > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">FIN-INV-CABANG</TableCell>
              <TableCell>Investasi Keuangan Cabang (alokasi)</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(cabangFinancialInvestmentAllocated)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(cabangFinancialInvestmentAllocated)}
              </TableCell>
            </TableRow>
          )}
          {pusatFinancialInvestmentAllocated > 0 && (
            <TableRow className="text-muted-foreground italic">
              <TableCell className="font-mono text-xs">FIN-INV-PUSAT</TableCell>
              <TableCell>Investasi Keuangan Pusat (alokasi)</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(pusatFinancialInvestmentAllocated)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {perStudent(pusatFinancialInvestmentAllocated)}
              </TableCell>
            </TableRow>
          )}

          {/* Alokasi biaya dari Cabang (terpisah dari Pusat) */}
          {renderAllocRows(cabangAllocatedComponents, "cabang")}
          {renderAllocRows(pusatAllocatedComponents, "pusat")}
        </TableBody>
        <TableFooter>
          {/* Versi otomatis: total biaya ÷ siswa baru = tarif otomatis */}
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Biaya UP — Tarif Otomatis
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(totalUpCostWithDep)}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(autoUpRate)}
            </TableCell>
          </TableRow>
          {/* Versi override: tarif override × siswa baru = pendapatan UP */}
          {hasOverride && (
            <TableRow className="text-blue-600">
              <TableCell colSpan={2} className="font-semibold">
                Pendapatan UP — Tarif Override Unit
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(overrideRevenue)}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(finalUpRate)}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
}
