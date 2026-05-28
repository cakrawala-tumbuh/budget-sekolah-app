"use client";

import { useState } from "react";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useExpenseCategories,
  useCreateExpenseCategory,
  useUpdateExpenseCategory,
  useDeleteExpenseCategory,
  useSeedExpenseCategories,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ExpenseCategory } from "@/lib/types";

const schema = z.object({
  code: z.string().min(1, "Kode wajib diisi").max(20),
  label: z.string().min(1, "Label wajib diisi").max(200),
  is_operational: z.boolean().default(true),
  is_up_component: z.boolean().default(false),
  is_direct_income: z.boolean().default(false),
  contribution_role: z.string().optional().nullable(),
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_operational: true,
      is_up_component: false,
      is_direct_income: false,
      sort_order: 0,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="code">Kode Akun</Label>
        <Input
          id="code"
          placeholder="contoh: 5130.01"
          disabled={isEdit}
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="label">Label</Label>
        <Input id="label" placeholder="contoh: Pengembangan Guru" {...register("label")} />
        {errors.label && (
          <p className="text-xs text-destructive">{errors.label.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contribution_role">Peran Kontribusi</Label>
        <Input
          id="contribution_role"
          placeholder="contoh: up_to_pusat"
          {...register("contribution_role")}
        />
      </div>
      <div className="space-y-2">
        <Label>Flag</Label>
        <div className="space-y-2">
          {(
            [
              ["is_operational", "Operasional"],
              ["is_up_component", "Komponen UP"],
              ["is_direct_income", "Direct Income"],
            ] as [keyof FormValues, string][]
          ).map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!watch(field)}
                onChange={(e) => setValue(field, e.target.checked as never)}
                className="h-4 w-4 rounded border"
              />
              {label}
            </label>
          ))}
        </div>
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

export default function ExpenseCategoriesPage() {
  const { data, isLoading, isError } = useExpenseCategories();
  const createMutation = useCreateExpenseCategory();
  const deleteMutation = useDeleteExpenseCategory();
  const seedMutation = useSeedExpenseCategories();

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<ExpenseCategory | null>(null);
  const updateMutation = useUpdateExpenseCategory(editItem?.id ?? 0);

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    const { code: _code, ...rest } = values;
    updateMutation.mutate(rest, { onSuccess: () => setEditItem(null) });
  }

  function handleDelete(id: number) {
    if (confirm("Hapus kategori biaya ini?")) deleteMutation.mutate(id);
  }

  function handleSeed() {
    if (
      confirm(
        "Reset semua kategori biaya ke default YPII? Data yang sudah ada akan dihapus.",
      )
    ) {
      seedMutation.mutate();
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori Biaya</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Master data kode akun biaya (5xxx)
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
          <AlertDescription>Gagal memuat data kategori biaya.</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Kode Akun</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="w-24 text-center">Operasional</TableHead>
              <TableHead className="w-24 text-center">Komp. UP</TableHead>
              <TableHead className="w-24 text-center">Direct Inc.</TableHead>
              <TableHead className="w-32">Peran Kontribusi</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
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
                      {cat.is_operational ? (
                        <Badge variant="default" className="text-xs">Ya</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Tidak</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {cat.is_up_component ? (
                        <Badge variant="default" className="text-xs">Ya</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">–</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {cat.is_direct_income ? (
                        <Badge variant="default" className="text-xs">Ya</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">–</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {cat.contribution_role ?? "–"}
                    </TableCell>
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
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Kategori Biaya</DialogTitle>
          </DialogHeader>
          <CategoryForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Kategori Biaya</DialogTitle>
          </DialogHeader>
          {editItem && (
            <CategoryForm
              defaultValues={{
                code: editItem.code,
                label: editItem.label,
                is_operational: editItem.is_operational,
                is_up_component: editItem.is_up_component,
                is_direct_income: editItem.is_direct_income,
                contribution_role: editItem.contribution_role,
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
