"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import { useIncomeCategories } from "@/hooks/useAdmin";
import {
  useIncomeEntries,
  useCreateIncomeEntry,
  useUpdateIncomeEntry,
  useDeleteIncomeEntry,
} from "@/hooks/useIncomeEntries";
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
import { formatCurrency } from "@/lib/utils";
import type { IncomeEntry, IncomeCategory } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  income_category_id: z.coerce.number().min(1, "Kategori wajib dipilih"),
  line_number: z.coerce.number().int().min(1, "Nomor baris minimal 1"),
  description: z.string().optional(),
  basis: z.string().optional(),
  amount: z.coerce.number().min(0, "Tidak boleh negatif").default(0),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const CALC_METHOD_LABEL: Record<string, string> = {
  MANUAL: "Manual",
  SIMULATED_UP: "Sim. UP",
  SIMULATED_US: "Sim. US",
  FROM_EXPENSE: "Dari Biaya",
  GRADE_BASED: "Per Kelas",
  SUM_FROM_BOS: "BOS",
};

function IncomeEntryForm({
  categories,
  defaultValues,
  onSubmit,
  isLoading,
}: {
  categories: IncomeCategory[];
  defaultValues?: Partial<FormValues>;
  onSubmit: (v: FormValues) => void;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 0, line_number: 1, ...defaultValues },
  });

  const catId = watch("income_category_id");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Kategori Pendapatan</Label>
        <Select
          value={catId ? String(catId) : ""}
          onValueChange={(v) => setValue("income_category_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori..." />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.code} — {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.income_category_id && (
          <p className="text-xs text-destructive">
            {errors.income_category_id.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>No. Baris</Label>
          <Input type="number" min={1} {...register("line_number")} />
          {errors.line_number && (
            <p className="text-xs text-destructive">{errors.line_number.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Uraian</Label>
        <Input placeholder="Deskripsi rincian pendapatan" {...register("description")} />
      </div>

      <div className="space-y-1.5">
        <Label>Dasar / Catatan Perhitungan</Label>
        <Input
          placeholder="contoh: 60 siswa × Rp 5.000.000"
          {...register("basis")}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Jumlah (Rp)</Label>
        <Input type="number" min={0} step={1} {...register("amount")} />
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Catatan</Label>
        <Input placeholder="Catatan tambahan (opsional)" {...register("notes")} />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

function groupByCategory(
  entries: IncomeEntry[],
  categories: IncomeCategory[],
) {
  const catMap = new Map(categories.map((c) => [c.id, c]));
  const grouped = new Map<number, { category: IncomeCategory; entries: IncomeEntry[] }>();

  for (const entry of entries) {
    const cat = catMap.get(entry.income_category_id);
    if (!cat) continue;
    if (!grouped.has(cat.id)) grouped.set(cat.id, { category: cat, entries: [] });
    grouped.get(cat.id)!.entries.push(entry);
  }

  return Array.from(grouped.values()).sort(
    (a, b) => a.category.sort_order - b.category.sort_order,
  );
}

export default function IncomeEntriesPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: categories, isLoading: loadingCats } = useIncomeCategories();
  const { data: entries, isLoading: loadingEntries, isError } = useIncomeEntries(orgId);

  const createMutation = useCreateIncomeEntry(orgId);
  const deleteMutation = useDeleteIncomeEntry(orgId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<IncomeEntry | null>(null);
  const updateMutation = useUpdateIncomeEntry(orgId, editItem?.id ?? 0);

  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  const manualCategories = (categories ?? []).filter((c) => c.calc_method === "MANUAL");
  const grouped = groupByCategory(entries ?? [], categories ?? []);
  const grandTotal = (entries ?? []).reduce((s, e) => s + e.amount, 0);

  function toggleCollapse(catId: number) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  }

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(
      {
        description: values.description,
        basis: values.basis,
        amount: values.amount,
        notes: values.notes,
      },
      { onSuccess: () => setEditItem(null) },
    );
  }

  function handleDelete(entryId: number) {
    if (confirm("Hapus entri pendapatan ini?")) deleteMutation.mutate(entryId);
  }

  const isLoading = loadingCats || loadingEntries;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Entri Pendapatan</h1>
          {org && (
            <p className="text-sm text-muted-foreground">{org.name}</p>
          )}
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Tambah Entri
        </Button>
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Gagal memuat data entri pendapatan.</AlertDescription>
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
          {grouped.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              Belum ada entri pendapatan. Klik &quot;Tambah Entri&quot; untuk mulai.
            </div>
          )}

          {grouped.map(({ category, entries: catEntries }) => {
            const catTotal = catEntries.reduce((s, e) => s + e.amount, 0);
            const isCollapsed = collapsed.has(category.id);
            return (
              <div key={category.id} className="mb-4 border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCollapse(category.id)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    <span className="font-mono text-muted-foreground">
                      {category.code}
                    </span>
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {CALC_METHOD_LABEL[category.calc_method] ?? category.calc_method}
                    </Badge>
                  </span>
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(catTotal)}
                  </span>
                </button>

                {!isCollapsed && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">No</TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead>Dasar</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead className="w-20"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="text-muted-foreground">
                            {entry.line_number}
                          </TableCell>
                          <TableCell>{entry.description ?? "-"}</TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-48 truncate">
                            {entry.basis ?? "-"}
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-medium">
                            {formatCurrency(entry.amount)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {entry.notes ?? "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setEditItem(entry)}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(entry.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            );
          })}

          {entries && entries.length > 0 && (
            <div className="mt-4 flex justify-end">
              <div className="text-sm font-semibold">
                Total Pendapatan Manual:{" "}
                <span className="tabular-nums text-base">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Entri Pendapatan</DialogTitle>
          </DialogHeader>
          <IncomeEntryForm
            categories={manualCategories}
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Entri Pendapatan</DialogTitle>
          </DialogHeader>
          {editItem && (
            <IncomeEntryForm
              categories={manualCategories}
              defaultValues={{
                income_category_id: editItem.income_category_id,
                line_number: editItem.line_number,
                description: editItem.description ?? "",
                basis: editItem.basis ?? "",
                amount: editItem.amount,
                notes: editItem.notes ?? "",
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
