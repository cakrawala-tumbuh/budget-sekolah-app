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
  autoUsRate: number;
  finalUsRate: number;
}

export function USSimulationTable({
  components,
  cabangAllocatedComponents,
  pusatAllocatedComponents,
  totalStudents,
  totalOwnCost,
  totalUsCost,
  autoUsRate,
  finalUsRate,
}: Props) {
  const perStudentMonth = (value: number) =>
    totalStudents > 0 ? formatCurrency(value / (totalStudents * 12)) : "-";

  // Override aktif jika tarif final berbeda dari tarif otomatis (hasil kalkulasi).
  const hasOverride = Math.abs(finalUsRate - autoUsRate) > 0.5;
  const overrideRevenue = finalUsRate * totalStudents * 12;

  const hasCabang = cabangAllocatedComponents.length > 0;
  const hasPusat = pusatAllocatedComponents.length > 0;
  const hasAllocation = hasCabang || hasPusat;

  const totalCabang = cabangAllocatedComponents.reduce(
    (sum, r) => sum + (r.total ?? 0),
    0
  );
  const totalPusat = pusatAllocatedComponents.reduce(
    (sum, r) => sum + (r.total ?? 0),
    0
  );

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
          {/* Seksi: Biaya Unit */}
          <TableRow className="bg-muted/40">
            <TableCell colSpan={4} className="font-semibold text-sm">
              Biaya Unit
            </TableCell>
          </TableRow>
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
          <TableRow className="bg-muted/40 font-medium">
            <TableCell colSpan={2} className="text-sm">
              Total Biaya Unit
            </TableCell>
            <TableCell className="text-right tabular-nums text-sm">
              {formatCurrency(totalOwnCost)}
            </TableCell>
            <TableCell className="text-right tabular-nums text-sm">
              {perStudentMonth(totalOwnCost)}
            </TableCell>
          </TableRow>

          {/* Seksi: Alokasi Biaya Cabang */}
          {hasCabang && (
            <TableRow className="bg-amber-50 dark:bg-amber-950/30">
              <TableCell colSpan={4} className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                Alokasi Biaya Cabang
              </TableCell>
            </TableRow>
          )}
          {renderAllocRows(cabangAllocatedComponents, "cabang")}
          {hasCabang && (
            <TableRow className="bg-amber-50 dark:bg-amber-950/30 font-medium">
              <TableCell colSpan={2} className="text-sm text-amber-800 dark:text-amber-300">
                Total Alokasi Cabang
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums text-amber-800 dark:text-amber-300">
                {formatCurrency(totalCabang)}
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums text-amber-800 dark:text-amber-300">
                {perStudentMonth(totalCabang)}
              </TableCell>
            </TableRow>
          )}

          {/* Seksi: Alokasi Biaya Pusat */}
          {hasPusat && (
            <TableRow className="bg-sky-50 dark:bg-sky-950/30">
              <TableCell colSpan={4} className="font-semibold text-sm text-sky-800 dark:text-sky-300">
                Alokasi Biaya Pusat
              </TableCell>
            </TableRow>
          )}
          {renderAllocRows(pusatAllocatedComponents, "pusat")}
          {hasPusat && (
            <TableRow className="bg-sky-50 dark:bg-sky-950/30 font-medium">
              <TableCell colSpan={2} className="text-sm text-sky-800 dark:text-sky-300">
                Total Alokasi Pusat
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums text-sky-800 dark:text-sky-300">
                {formatCurrency(totalPusat)}
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums text-sky-800 dark:text-sky-300">
                {perStudentMonth(totalPusat)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          {/* Versi otomatis: total biaya ÷ (siswa × 12) = tarif otomatis */}
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total Biaya US — Tarif Otomatis
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(totalUsCost)}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(autoUsRate)}
            </TableCell>
          </TableRow>
          {/* Versi override: tarif override × siswa × 12 = pendapatan US */}
          {hasOverride && (
            <TableRow className="text-blue-600">
              <TableCell colSpan={2} className="font-semibold">
                Pendapatan US — Tarif Override Unit
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(overrideRevenue)}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(finalUsRate)}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
}
