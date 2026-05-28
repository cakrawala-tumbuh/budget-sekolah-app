"use client";

import { useState } from "react";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useInvestmentCategories,
  useCreateInvestmentCategory,
  useUpdateInvestmentCategory,
  useDeleteInvestmentCategory,
  useSeedInvestmentCategories,
} from "@/hooks/useAdmin";
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
import type { InvestmentCategory } from "@/lib/types";

const schema = z.object({
  code: z.string().min(1, "Kode wajib diisi").max(20),
  label: z.string().min(1, "Label wajib diisi").max(200),
  default_economic_life: z.coerce.number().int().min(1).default(4),
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { default_economic_life: 4, sort_order: 0, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="code">Kode Akun</Label>
        <Input
          id="code"
          placeholder="contoh: 1330.01"
          disabled={isEdit}
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="label">Label</Label>
        <Input id="label" placeholder="contoh: Kendaraan" {...register("label")} />
        {errors.label && (
          <p className="text-xs text-destructive">{errors.label.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="default_economic_life">Umur Ekonomis Default (tahun)</Label>
        <Input
          id="default_economic_life"
          type="number"
          min={1}
          {...register("default_economic_life")}
        />
        {errors.default_economic_life && (
          <p className="text-xs text-destructive">
            {errors.default_economic_life.message}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sort_order">Urutan</Label>
        <Input id="sort_order" type="number" {...register("sort_order")} />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default function InvestmentCategoriesPage() {
  const { data, isLoading, isError } = useInvestmentCategories();
  const createMutation = useCreateInvestmentCategory();
  const deleteMutation = useDeleteInvestmentCategory();
  const seedMutation = useSeedInvestmentCategories();

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<InvestmentCategory | null>(null);
  const updateMutation = useUpdateInvestmentCategory(editItem?.id ?? 0);

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(
      {
        label: values.label,
        default_economic_life: values.default_economic_life,
        sort_order: values.sort_order,
      },
      { onSuccess: () => setEditItem(null) },
    );
  }

  function handleDelete(id: number) {
    if (confirm("Hapus kategori investasi ini?")) deleteMutation.mutate(id);
  }

  function handleSeed() {
    if (
      confirm(
        "Reset semua kategori investasi ke default YPII? Data yang sudah ada akan dihapus.",
      )
    ) {
      seedMutation.mutate();
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori Investasi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Master data kategori aset tetap (1330.xx)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSeed}
            disabled={seedMutation.isPending}
          >
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
          <AlertDescription>Gagal memuat data kategori investasi.</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Kode Akun</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="w-40 text-center">Umur Ekonomis Default</TableHead>
              <TableHead className="w-20 text-center">Urutan</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-mono text-sm">{cat.code}</TableCell>
                    <TableCell>{cat.label}</TableCell>
                    <TableCell className="text-center">
                      {cat.default_economic_life} tahun
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

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Investasi</DialogTitle>
          </DialogHeader>
          <CategoryForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kategori Investasi</DialogTitle>
          </DialogHeader>
          {editItem && (
            <CategoryForm
              defaultValues={{
                code: editItem.code,
                label: editItem.label,
                default_economic_life: editItem.default_economic_life,
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
