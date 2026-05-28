"use client";

import { useState } from "react";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useIncomeCategories,
  useCreateIncomeCategory,
  useUpdateIncomeCategory,
  useDeleteIncomeCategory,
  useSeedIncomeCategories,
} from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IncomeCategory, IncomeCalcMethod } from "@/lib/types";

const CALC_METHOD_LABELS: Record<IncomeCalcMethod, string> = {
  MANUAL: "Manual",
  SIMULATED_UP: "Simulasi UP",
  SIMULATED_US: "Simulasi US",
  FROM_EXPENSE: "Dari Biaya",
  GRADE_BASED: "Per Kelas",
  SUM_FROM_BOS: "Total BOS",
};

const schema = z.object({
  code: z.string().min(1, "Kode wajib diisi").max(20),
  label: z.string().min(1, "Label wajib diisi").max(200),
  calc_method: z.enum([
    "MANUAL",
    "SIMULATED_UP",
    "SIMULATED_US",
    "FROM_EXPENSE",
    "GRADE_BASED",
    "SUM_FROM_BOS",
  ] as const),
  sort_order: z.coerce.number().int().default(0),
});

type FormValues = z.infer<typeof schema>;

function CategoryForm({
  defaultValues,
  onSubmit,
  isLoading,
  isEdit,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit: (v: FormValues) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { calc_method: "MANUAL", sort_order: 0, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="code">Kode Akun</Label>
        <Input
          id="code"
          placeholder="contoh: 4110.01"
          disabled={isEdit}
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          placeholder="contoh: Uang Pangkal"
          {...register("label")}
        />
        {errors.label && (
          <p className="text-xs text-destructive">{errors.label.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label>Metode Kalkulasi</Label>
        <Select
          value={watch("calc_method")}
          onValueChange={(v) => setValue("calc_method", v as IncomeCalcMethod)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CALC_METHOD_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sort_order">Urutan</Label>
        <Input
          id="sort_order"
          type="number"
          {...register("sort_order")}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default function IncomeCategoriesPage() {
  const { data, isLoading, isError } = useIncomeCategories();
  const createMutation = useCreateIncomeCategory();
  const deleteMutation = useDeleteIncomeCategory();
  const seedMutation = useSeedIncomeCategories();

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<IncomeCategory | null>(null);
  const updateMutation = useUpdateIncomeCategory(editItem?.id ?? 0);

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(
      { label: values.label, calc_method: values.calc_method, sort_order: values.sort_order },
      { onSuccess: () => setEditItem(null) },
    );
  }

  function handleDelete(id: number) {
    if (confirm("Hapus kategori pendapatan ini?")) {
      deleteMutation.mutate(id);
    }
  }

  function handleSeed() {
    if (confirm("Reset semua kategori pendapatan ke default YPII? Data yang sudah ada akan dihapus.")) {
      seedMutation.mutate();
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori Pendapatan</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Master data kode akun pendapatan (4xxx)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeed} disabled={seedMutation.isPending}>
            <RefreshCw className="h-4 w-4" />
            Seed Default
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah
          </Button>
        </div>
      </div>

      {seedMutation.isSuccess && (
        <Alert className="mb-4">
          <AlertDescription>{seedMutation.data?.message}</AlertDescription>
        </Alert>
      )}

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Gagal memuat data kategori pendapatan.</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Kode Akun</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="w-40">Metode Kalkulasi</TableHead>
              <TableHead className="w-20 text-center">Urutan</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              : data?.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-mono text-sm">{cat.code}</TableCell>
                    <TableCell>{cat.label}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {CALC_METHOD_LABELS[cat.calc_method]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{cat.sort_order}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditItem(cat)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(cat.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Pendapatan</DialogTitle>
          </DialogHeader>
          <CategoryForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kategori Pendapatan</DialogTitle>
          </DialogHeader>
          {editItem && (
            <CategoryForm
              defaultValues={{
                code: editItem.code,
                label: editItem.label,
                calc_method: editItem.calc_method,
                sort_order: editItem.sort_order,
              }}
              onSubmit={handleUpdate}
              isLoading={updateMutation.isPending}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
