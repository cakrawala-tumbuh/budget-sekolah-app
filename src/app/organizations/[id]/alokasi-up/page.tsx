"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Users, Settings2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueries } from "@tanstack/react-query";
import { useOrganization, useOrganizations } from "@/hooks/useOrganizations";
import { useExpenseCategories } from "@/hooks/useAdmin";
import {
  useParentExpenseAllocations,
  useCreateParentExpenseAllocation,
  useDeleteParentExpenseAllocation,
  useContributionAllocations,
  useUpsertContributionAllocation,
} from "@/hooks/useContributions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assumptionsApi } from "@/lib/api/assumptions";
import type { ContributionAllocationCreate, UnitAssumption } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const addCategorySchema = z.object({
  expense_category_id: z.coerce.number().min(1, "Kategori wajib dipilih"),
});
type AddCategoryValues = z.infer<typeof addCategorySchema>;

const allocSchema = z.object({
  override_pct_up: z.string().optional(),
});
type AllocValues = z.infer<typeof allocSchema>;

function AllocUnitForm({
  unitName,
  assumption,
  currentOverride,
  onSubmit,
  isLoading,
  onClose,
}: {
  unitName: string;
  assumption: UnitAssumption | undefined;
  currentOverride: number | null | undefined;
  onSubmit: (v: AllocValues) => void;
  isLoading?: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm<AllocValues>({
    resolver: zodResolver(allocSchema),
    defaultValues: {
      override_pct_up: currentOverride != null ? String(currentOverride * 100) : "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Unit: <strong>{unitName}</strong>
      </p>
      <div className="rounded-md bg-muted p-3 space-y-1 text-sm">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide mb-2">
          Data dari Asumsi Unit
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-muted-foreground">Siswa Baru:</span>{" "}
            <strong>
              {assumption ? assumption.new_student_count.toLocaleString("id-ID") : "—"}
            </strong>
          </div>
          <div>
            <span className="text-muted-foreground">Total Siswa:</span>{" "}
            <strong>
              {assumption ? assumption.total_students.toLocaleString("id-ID") : "—"}
            </strong>
          </div>
        </div>
        {!assumption && (
          <p className="text-xs text-amber-600 mt-1">
            Asumsi belum diisi untuk unit ini. Jumlah siswa akan 0.
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label>Override Proporsi UP (%)</Label>
        <Input
          type="number"
          step="0.01"
          min={0}
          max={100}
          placeholder="Kosongkan = proporsional otomatis dari siswa baru"
          {...register("override_pct_up")}
        />
        <p className="text-xs text-muted-foreground">
          Kosongkan agar proporsi dihitung otomatis berdasarkan siswa baru.
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}

export default function AlokasiUPPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: loadingOrg } = useOrganization(orgId);
  const { data: allOrgs } = useOrganizations();
  const { data: expenseCategories, isLoading: loadingCats } = useExpenseCategories();
  const { data: peaList, isLoading: loadingPea } = useParentExpenseAllocations(orgId);
  const { data: allocations, isLoading: loadingAllocs } = useContributionAllocations(orgId);

  const createPea = useCreateParentExpenseAllocation(orgId);
  const deletePea = useDeleteParentExpenseAllocation(orgId);
  const upsertAlloc = useUpsertContributionAllocation(orgId);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState<number | null>(null);

  const {
    handleSubmit: handleCat,
    setValue: setCatVal,
    watch: watchCat,
    reset: resetCat,
    formState: { errors: catErrors },
  } = useForm<AddCategoryValues>({ resolver: zodResolver(addCategorySchema) });

  const selectedCatId = watchCat("expense_category_id");

  const upPeaList = peaList?.filter((p) => p.affects_up) ?? [];
  // Gunakan SEMUA peaList (bukan hanya affects_up) karena unique constraint di DB
  // adalah pada (parent_org_id, expense_category_id) — satu kategori hanya boleh satu kali.
  const usedCatIds = new Set(peaList?.map((p) => p.expense_category_id) ?? []);
  const availableCategories = expenseCategories?.filter((c) => !usedCatIds.has(c.id)) ?? [];

  // PUSAT → semua UNIT di seluruh sistem; CABANG → UNIT anak langsung
  const childUnits =
    org?.org_type === "PUSAT"
      ? (allOrgs?.filter((o) => o.org_type === "UNIT") ?? [])
      : (allOrgs?.filter((o) => o.parent_id === orgId && o.org_type === "UNIT") ?? []);

  // Muat asumsi semua unit anak secara paralel
  const assumptionResults = useQueries({
    queries: childUnits.map((unit) => ({
      queryKey: ["assumption", unit.id],
      queryFn: () => assumptionsApi.get(unit.id),
      retry: false,
    })),
  });

  const assumptionMap = new Map<number, UnitAssumption>(
    childUnits
      .map((unit, i) => [unit.id, assumptionResults[i]?.data] as [number, UnitAssumption | undefined])
      .filter((entry): entry is [number, UnitAssumption] => entry[1] !== undefined)
  );

  if (loadingOrg) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>Organisasi tidak ditemukan.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (org.org_type === "UNIT") {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Halaman ini hanya tersedia untuk organisasi CABANG atau PUSAT.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleAddCategory = async (v: AddCategoryValues) => {
    try {
      await createPea.mutateAsync({
        expense_category_id: v.expense_category_id,
        affects_up: true,
        is_active: true,
      });
      setShowAddCategory(false);
      resetCat();
    } catch {
      // error ditampilkan via createPea.error di bawah
    }
  };

  const handleSaveAlloc = async (unitId: number, v: AllocValues) => {
    const assumption = assumptionMap.get(unitId);
    const pctUp = v.override_pct_up ? parseFloat(v.override_pct_up) / 100 : null;
    const payload: ContributionAllocationCreate = {
      from_organization_id: unitId,
      total_students: assumption?.total_students ?? 0,
      new_students: assumption?.new_student_count ?? 0,
      override_pct_up: pctUp,
      override_pct_us:
        allocations?.find((a) => a.from_organization_id === unitId)?.override_pct_us ?? null,
    };
    await upsertAlloc.mutateAsync(payload);
    setEditingUnitId(null);
  };

  const handleSyncAll = async () => {
    for (const unit of childUnits) {
      const assumption = assumptionMap.get(unit.id);
      const existing = allocations?.find((a) => a.from_organization_id === unit.id);
      await upsertAlloc.mutateAsync({
        from_organization_id: unit.id,
        total_students: assumption?.total_students ?? 0,
        new_students: assumption?.new_student_count ?? 0,
        override_pct_up: existing?.override_pct_up ?? null,
        override_pct_us: existing?.override_pct_us ?? null,
      });
    }
  };

  const editingUnit = editingUnitId ? childUnits.find((u) => u.id === editingUnitId) : null;
  const editingAlloc = editingUnitId
    ? allocations?.find((a) => a.from_organization_id === editingUnitId)
    : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Alokasi UP</h1>
            <Badge variant="secondary">{org.name}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Konfigurasi komponen biaya Uang Pangkal yang dialokasikan ke unit-unit
            {org.org_type === "PUSAT" ? " di seluruh sistem" : " anak"}
          </p>
        </div>
      </div>

      {/* Kategori Biaya UP */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-blue-600" />
              Kategori Biaya (Komponen UP)
            </h2>
            <p className="text-sm text-muted-foreground">
              Kategori biaya dari organisasi ini yang akan dialokasikan ke unit sebagai komponen UP.
            </p>
          </div>
          <Button size="sm" onClick={() => setShowAddCategory(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Tambah Kategori
          </Button>
        </div>

        {loadingPea ? (
          <Skeleton className="h-32 w-full" />
        ) : upPeaList.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            Belum ada kategori biaya UP yang dikonfigurasi.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Akun</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upPeaList.map((pea) => (
                <TableRow key={pea.id}>
                  <TableCell className="font-mono text-sm">{pea.expense_category_code}</TableCell>
                  <TableCell>{pea.expense_category_label}</TableCell>
                  <TableCell>
                    <Badge variant={pea.is_active ? "default" : "secondary"}>
                      {pea.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deletePea.mutate(pea.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Proporsi per Unit */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Proporsi per Unit (Siswa Baru UP)
            </h2>
            <p className="text-sm text-muted-foreground">
              Jumlah siswa diambil otomatis dari data asumsi masing-masing unit.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSyncAll}
            disabled={upsertAlloc.isPending || childUnits.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Sinkronkan Semua
          </Button>
        </div>

        {childUnits.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            Belum ada unit terdaftar.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Siswa Baru</TableHead>
                <TableHead className="text-right">Total Siswa</TableHead>
                <TableHead className="text-right">Override UP (%)</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {childUnits.map((unit) => {
                const assumption = assumptionMap.get(unit.id);
                const alloc = allocations?.find((a) => a.from_organization_id === unit.id);
                return (
                  <TableRow key={unit.id}>
                    <TableCell>
                      <div className="font-medium">{unit.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{unit.code}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {assumption
                        ? assumption.new_student_count.toLocaleString("id-ID")
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      {assumption
                        ? assumption.total_students.toLocaleString("id-ID")
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      {alloc?.override_pct_up != null
                        ? `${(alloc.override_pct_up * 100).toFixed(1)}%`
                        : <span className="text-muted-foreground text-xs">Otomatis</span>}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUnitId(unit.id)}
                      >
                        {alloc ? "Edit" : "Atur"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Dialog Tambah Kategori */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Biaya UP</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCat(handleAddCategory)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Kategori Biaya</Label>
              <Select
                value={selectedCatId ? String(selectedCatId) : ""}
                onValueChange={(v) => setCatVal("expense_category_id", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.code} — {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {catErrors.expense_category_id && (
                <p className="text-xs text-destructive">
                  {catErrors.expense_category_id.message}
                </p>
              )}
              {createPea.error && (
                <p className="text-xs text-destructive">
                  {createPea.error.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowAddCategory(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={createPea.isPending}>
                {createPea.isPending ? "Menyimpan..." : "Tambah"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit Override */}
      <Dialog open={!!editingUnitId} onOpenChange={(open) => !open && setEditingUnitId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atur Proporsi UP</DialogTitle>
          </DialogHeader>
          {editingUnit && (
            <AllocUnitForm
              unitName={editingUnit.name}
              assumption={assumptionMap.get(editingUnit.id)}
              currentOverride={editingAlloc?.override_pct_up}
              onSubmit={(v) => handleSaveAlloc(editingUnit.id, v)}
              isLoading={upsertAlloc.isPending}
              onClose={() => setEditingUnitId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
