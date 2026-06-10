"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import { useExpenseCategories } from "@/hooks/useAdmin";
import {
  useBudgetEntries,
  useCreateBudgetEntry,
  useUpdateBudgetEntry,
  useDeleteBudgetEntry,
} from "@/hooks/useBudgetEntries";
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
import type { BudgetEntry, ExpenseCategory } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  expense_category_id: z.coerce.number().min(1, "Kategori wajib dipilih"),
  line_number: z.coerce.number().int().min(1, "Nomor baris minimal 1"),
  description: z.string().optional(),
  basis: z.string().optional(),
  foundation: z.coerce.number().min(0, "Tidak boleh negatif").default(0),
  bos: z.coerce.number().min(0, "Tidak boleh negatif").default(0),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function EntryForm({
  categories,
  defaultValues,
  onSubmit,
  isLoading,
}: {
  categories: ExpenseCategory[];
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
    defaultValues: { foundation: 0, bos: 0, line_number: 1, ...defaultValues },
  });

  const catId = watch("expense_category_id");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Kategori Biaya</Label>
        <Select
          value={catId ? String(catId) : ""}
          onValueChange={(v) => setValue("expense_category_id", Number(v))}
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
        {errors.expense_category_id && (
          <p className="text-xs text-destructive">
            {errors.expense_category_id.message}
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
        <Input placeholder="Deskripsi rincian biaya" {...register("description")} />
      </div>

      <div className="space-y-1.5">
        <Label>Dasar / Catatan Perhitungan</Label>
        <Input placeholder="contoh: 5 item × Rp 2.000.000" {...register("basis")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Yayasan (Rp)</Label>
          <Input type="number" min={0} step={1} {...register("foundation")} />
          {errors.foundation && (
            <p className="text-xs text-destructive">{errors.foundation.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>BOS/BOP (Rp)</Label>
          <Input type="number" min={0} step={1} {...register("bos")} />
          {errors.bos && (
            <p className="text-xs text-destructive">{errors.bos.message}</p>
          )}
        </div>
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
  entries: BudgetEntry[],
  categories: ExpenseCategory[],
) {
  const catMap = new Map(categories.map((c) => [c.id, c]));
  const grouped = new Map<number, { category: ExpenseCategory; entries: BudgetEntry[] }>();

  for (const entry of entries) {
    const cat = catMap.get(entry.expense_category_id);
    if (!cat) continue;
    if (!grouped.has(cat.id)) grouped.set(cat.id, { category: cat, entries: [] });
    grouped.get(cat.id)!.entries.push(entry);
  }

  return Array.from(grouped.values()).sort(
    (a, b) => a.category.sort_order - b.category.sort_order,
  );
}

export default function NonOpBudgetEntriesPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: allCategories, isLoading: loadingCats } = useExpenseCategories();
  const { data: entries, isLoading: loadingEntries, isError } = useBudgetEntries(orgId);

  const createMutation = useCreateBudgetEntry(orgId);
  const deleteMutation = useDeleteBudgetEntry(orgId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<BudgetEntry | null>(null);
  const updateMutation = useUpdateBudgetEntry(orgId, editItem?.id ?? 0);

  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  // Only non-operational categories
  const nonOpCategories = (allCategories ?? []).filter((c) => !c.is_operational);

  // Filter entries to only non-op categories
  const nonOpCategoryIds = new Set(nonOpCategories.map((c) => c.id));
  const nonOpEntries = (entries ?? []).filter((e) =>
    nonOpCategoryIds.has(e.expense_category_id),
  );

  const grouped = groupByCategory(nonOpEntries, nonOpCategories);
  const grandTotal = nonOpEntries.reduce((s, e) => s + e.total, 0);

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
        expense_category_id: values.expense_category_id,
        description: values.description,
        basis: values.basis,
        foundation: values.foundation,
        bos: values.bos,
        notes: values.notes,
      },
      { onSuccess: () => setEditItem(null) },
    );
  }

  function handleDelete(entryId: number) {
    if (confirm("Hapus entri biaya ini?")) deleteMutation.mutate(entryId);
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
          <h1 className="text-2xl font-bold tracking-tight">Biaya Non-Operasional</h1>
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
          <AlertDescription>Gagal memuat data entri biaya.</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <>
          {grouped.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              Belum ada entri biaya non-operasional. Klik &quot;Tambah Entri&quot; untuk mulai.
            </div>
          )}

          {grouped.map(({ category, entries: catEntries }) => {
            const catTotal = catEntries.reduce((s, e) => s + e.total, 0);
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
                    {category.contribution_role && (
                      <Badge variant="outline" className="text-xs">
                        {category.contribution_role}
                      </Badge>
                    )}
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
                        <TableHead className="text-right">Yayasan</TableHead>
                        <TableHead className="text-right">BOS</TableHead>
                        <TableHead className="text-right">Total</TableHead>
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
                          <TableCell className="text-right tabular-nums">
                            {formatCurrency(entry.foundation)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatCurrency(entry.bos)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-medium">
                            {formatCurrency(entry.total)}
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

          {nonOpEntries.length > 0 && (
            <div className="mt-4 flex justify-end">
              <div className="text-sm font-semibold">
                Total Biaya Non-Operasional:{" "}
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
            <DialogTitle>Tambah Entri Biaya Non-Operasional</DialogTitle>
          </DialogHeader>
          <EntryForm
            categories={nonOpCategories}
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Entri Biaya Non-Operasional</DialogTitle>
          </DialogHeader>
          {editItem && (
            <EntryForm
              categories={nonOpCategories}
              defaultValues={{
                expense_category_id: editItem.expense_category_id,
                line_number: editItem.line_number,
                description: editItem.description ?? "",
                basis: editItem.basis ?? "",
                foundation: editItem.foundation,
                bos: editItem.bos,
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
