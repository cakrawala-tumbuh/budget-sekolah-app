"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import { useInvestmentCategories } from "@/hooks/useAdmin";
import {
  useInvestments,
  useCreateInvestment,
  useUpdateInvestment,
  useDeleteInvestment,
} from "@/hooks/useInvestments";
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
import type { Investment, InvestmentCategory } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const schema = z.object({
  investment_category_id: z.coerce.number().min(1, "Kategori wajib dipilih"),
  asset_code: z.string().optional(),
  asset_name: z.string().min(1, "Nama aset wajib diisi"),
  purchase_price: z.coerce.number().positive("Nilai harus lebih dari 0"),
  bos: z.coerce.number().min(0, "Dana BoS tidak boleh negatif").default(0),
  useful_life: z.coerce.number().int().min(1, "Umur ekonomis minimal 1 tahun"),
  start_month: z.coerce.number().int().min(1).max(12),
});

type FormValues = z.infer<typeof schema>;

function InvestmentForm({
  categories,
  defaultValues,
  onSubmit,
  isLoading,
}: {
  categories: InvestmentCategory[];
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
    defaultValues: { useful_life: 4, start_month: 7, bos: 0, ...defaultValues },
  });

  const catId = watch("investment_category_id");
  const startMonth = watch("start_month");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Kategori Aset</Label>
        <Select
          value={catId ? String(catId) : ""}
          onValueChange={(v) => {
            setValue("investment_category_id", Number(v));
            const cat = categories.find((c) => c.id === Number(v));
            if (cat) setValue("useful_life", cat.default_economic_life);
          }}
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
        {errors.investment_category_id && (
          <p className="text-xs text-destructive">
            {errors.investment_category_id.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Kode Aset</Label>
          <Input placeholder="contoh: KT-001" {...register("asset_code")} />
        </div>
        <div className="space-y-1.5">
          <Label>Nama Aset</Label>
          <Input placeholder="contoh: Laptop Acer Aspire 5" {...register("asset_name")} />
          {errors.asset_name && (
            <p className="text-xs text-destructive">{errors.asset_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Harga Perolehan (Rp)</Label>
          <Input type="number" min={1} step={1} {...register("purchase_price")} />
          {errors.purchase_price && (
            <p className="text-xs text-destructive">{errors.purchase_price.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Dana BoS (Rp)</Label>
          <Input type="number" min={0} step={1} {...register("bos")} />
          {errors.bos && (
            <p className="text-xs text-destructive">{errors.bos.message}</p>
          )}
        </div>
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
          <Label>Bulan Mulai Pakai</Label>
          <Select
            value={startMonth ? String(startMonth) : "7"}
            onValueChange={(v) => setValue("start_month", Number(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}. {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default function InvestmentsPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: categories } = useInvestmentCategories();
  const { data: investments, isLoading, isError } = useInvestments(orgId);

  const createMutation = useCreateInvestment(orgId);
  const deleteMutation = useDeleteInvestment(orgId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Investment | null>(null);
  const updateMutation = useUpdateInvestment(orgId, editItem?.id ?? 0);

  const catMap = new Map((categories ?? []).map((c) => [c.id, c]));

  const totalDepYear = (investments ?? []).reduce(
    (s, inv) => s + inv.dep_current_year,
    0,
  );
  const totalPrice = (investments ?? []).reduce(
    (s, inv) => s + inv.purchase_price,
    0,
  );
  const totalBos = (investments ?? []).reduce(
    (s, inv) => s + (inv.bos ?? 0),
    0,
  );

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(values, { onSuccess: () => setEditItem(null) });
  }

  function handleDelete(invId: number) {
    if (confirm("Hapus data investasi ini?")) deleteMutation.mutate(invId);
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
          <h1 className="text-2xl font-bold tracking-tight">Investasi Aset Tetap</h1>
          {org && (
            <p className="text-sm text-muted-foreground">{org.name}</p>
          )}
        </div>
        {!org?.is_locked && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Aset
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
          <AlertDescription>Gagal memuat data investasi.</AlertDescription>
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
          {(!investments || investments.length === 0) ? (
            <div className="text-center py-16 text-muted-foreground">
              Belum ada data investasi. Klik &quot;Tambah Aset&quot; untuk mulai.
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Nama Aset</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Harga Beli</TableHead>
                      <TableHead className="text-right">Dana BoS</TableHead>
                      <TableHead className="text-center">Umur</TableHead>
                      <TableHead className="text-center">Bln Mulai</TableHead>
                      <TableHead className="text-right">Dep/Tahun</TableHead>
                      <TableHead className="text-right">Dep Th Ini</TableHead>
                      <TableHead className="text-right">Nilai Akhir</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-mono text-xs">
                          {inv.asset_code ?? "-"}
                        </TableCell>
                        <TableCell>{inv.asset_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {catMap.get(inv.investment_category_id)?.label ?? "-"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(inv.purchase_price)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {inv.bos > 0 ? (
                            <span className="text-blue-600 dark:text-blue-400">
                              {formatCurrency(inv.bos)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {inv.useful_life} th
                        </TableCell>
                        <TableCell className="text-center">
                          {MONTHS[inv.start_month - 1]}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(inv.dep_per_year)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium">
                          {formatCurrency(inv.dep_current_year)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(inv.end_book_value)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => setEditItem(inv)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(inv.id)}
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

              <div className="mt-4 flex justify-end gap-8 text-sm">
                <div>
                  Total Harga Beli:{" "}
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                {totalBos > 0 && (
                  <div>
                    Total Dana BoS:{" "}
                    <span className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                      {formatCurrency(totalBos)}
                    </span>
                  </div>
                )}
                <div>
                  Total Depresiasi Tahun Ini:{" "}
                  <span className="font-semibold tabular-nums">
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
            <DialogTitle>Tambah Aset Tetap Baru</DialogTitle>
          </DialogHeader>
          <InvestmentForm
            categories={categories ?? []}
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Aset Tetap</DialogTitle>
          </DialogHeader>
          {editItem && (
            <InvestmentForm
              categories={categories ?? []}
              defaultValues={{
                investment_category_id: editItem.investment_category_id,
                asset_code: editItem.asset_code ?? "",
                asset_name: editItem.asset_name,
                purchase_price: editItem.purchase_price,
                bos: editItem.bos ?? 0,
                useful_life: editItem.useful_life,
                start_month: editItem.start_month,
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
