"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import {
  useDepreciation,
  useCreateDepreciation,
  useUpdateDepreciation,
  useDeleteDepreciation,
} from "@/hooks/useDepreciation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { formatCurrency } from "@/lib/utils";
import type { DepreciationOldAsset } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  asset_code: z.string().optional(),
  asset_name: z.string().min(1, "Nama aset wajib diisi"),
  acquisition_cost: z.coerce.number().positive("Nilai harus lebih dari 0"),
  useful_life: z.coerce.number().int().min(1, "Umur ekonomis minimal 1 tahun"),
  acquisition_year: z.coerce
    .number()
    .int()
    .min(1900, "Tahun tidak valid")
    .max(2100, "Tahun tidak valid"),
});

type FormValues = z.infer<typeof schema>;

function DepreciationForm({
  defaultValues,
  onSubmit,
  isLoading,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit: (v: FormValues) => void;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { useful_life: 5, acquisition_year: 2022, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Kode Aset</Label>
          <Input placeholder="contoh: LK-OLD-001" {...register("asset_code")} />
        </div>
        <div className="space-y-1.5">
          <Label>Nama Aset</Label>
          <Input placeholder="contoh: Komputer Desktop Lama" {...register("asset_name")} />
          {errors.asset_name && (
            <p className="text-xs text-destructive">{errors.asset_name.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Nilai Perolehan (Rp)</Label>
        <Input type="number" min={1} step={1} {...register("acquisition_cost")} />
        {errors.acquisition_cost && (
          <p className="text-xs text-destructive">{errors.acquisition_cost.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Umur Ekonomis (tahun)</Label>
          <Input type="number" min={1} {...register("useful_life")} />
          {errors.useful_life && (
            <p className="text-xs text-destructive">{errors.useful_life.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Tahun Perolehan</Label>
          <Input type="number" min={1900} max={2100} {...register("acquisition_year")} />
          {errors.acquisition_year && (
            <p className="text-xs text-destructive">
              {errors.acquisition_year.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default function DepreciationPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: assets, isLoading, isError } = useDepreciation(orgId);

  const createMutation = useCreateDepreciation(orgId);
  const deleteMutation = useDeleteDepreciation(orgId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<DepreciationOldAsset | null>(null);
  const updateMutation = useUpdateDepreciation(orgId, editItem?.id ?? 0);

  const totalDepYear = (assets ?? []).reduce((s, a) => s + a.dep_current_year, 0);

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(values, { onSuccess: () => setEditItem(null) });
  }

  function handleDelete(depId: number) {
    if (confirm("Hapus data aset lama ini?")) deleteMutation.mutate(depId);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Depresiasi Aset Lama</h1>
          {org && (
            <p className="text-sm text-muted-foreground">{org.name}</p>
          )}
        </div>
        {!org?.is_locked && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Aset Lama
          </Button>
        )}
      </div>

      {org?.is_locked && (
        <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Budget dikunci oleh <strong>{org.locked_by_username}</strong>. Data tidak dapat diubah.
          </AlertDescription>
        </Alert>
      )}

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Gagal memuat data depresiasi.</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <>
          {(!assets || assets.length === 0) ? (
            <div className="text-center py-16 text-muted-foreground">
              Belum ada data aset lama. Klik &quot;Tambah Aset Lama&quot; untuk mulai.
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Nama Aset</TableHead>
                      <TableHead className="text-right">Nilai Perolehan</TableHead>
                      <TableHead className="text-center">Umur (th)</TableHead>
                      <TableHead className="text-center">Th Perolehan</TableHead>
                      <TableHead className="text-right">Dep/Tahun</TableHead>
                      <TableHead className="text-right">Dep Th Ini</TableHead>
                      <TableHead className="text-right">Nilai Buku</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-mono text-xs">
                          {asset.asset_code ?? "-"}
                        </TableCell>
                        <TableCell>{asset.asset_name}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(asset.acquisition_cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {asset.useful_life}
                        </TableCell>
                        <TableCell className="text-center">
                          {asset.acquisition_year}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(asset.dep_per_year)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium">
                          {formatCurrency(asset.dep_current_year)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(asset.book_value)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => setEditItem(asset)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(asset.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="text-sm font-semibold">
                  Total Depresiasi Tahun Ini:{" "}
                  <span className="tabular-nums text-base">
                    {formatCurrency(totalDepYear)}
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Aset Lama (Depresiasi)</DialogTitle>
          </DialogHeader>
          <DepreciationForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Aset Lama</DialogTitle>
          </DialogHeader>
          {editItem && (
            <DepreciationForm
              defaultValues={{
                asset_code: editItem.asset_code ?? "",
                asset_name: editItem.asset_name,
                acquisition_cost: editItem.acquisition_cost,
                useful_life: editItem.useful_life,
                acquisition_year: editItem.acquisition_year,
              }}
              onSubmit={handleUpdate}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
