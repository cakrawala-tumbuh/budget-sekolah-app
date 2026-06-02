"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Pencil, HandCoins } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization, useOrganizations } from "@/hooks/useOrganizations";
import { useExpenseCategories, useIncomeCategories } from "@/hooks/useAdmin";
import {
  useSubsidies,
  useCreateSubsidy,
  useUpdateSubsidy,
  useDeleteSubsidy,
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
import { formatCurrency } from "@/lib/utils";
import type { SubsidyRead } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const subsidySchema = z.object({
  recipient_org_id: z.coerce.number().min(1, "Penerima wajib dipilih"),
  expense_category_id: z.coerce.number().min(1, "Kategori beban wajib dipilih"),
  income_category_id: z.coerce.number().min(1, "Kategori pendapatan wajib dipilih"),
  amount: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
});
type SubsidyValues = z.infer<typeof subsidySchema>;

export default function SubsidiPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: loadingOrg } = useOrganization(orgId);
  const { data: allOrgs } = useOrganizations();
  const { data: expenseCategories } = useExpenseCategories();
  const { data: incomeCategories } = useIncomeCategories();
  const { data: subsidies, isLoading: loadingSubs } = useSubsidies(orgId);

  const createSubsidy = useCreateSubsidy(orgId);
  const updateSubsidy = useUpdateSubsidy(orgId);
  const deleteSubsidy = useDeleteSubsidy(orgId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SubsidyRead | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubsidyValues>({
    resolver: zodResolver(subsidySchema),
    defaultValues: { amount: 0 },
  });

  // Penerima yang valid: CABANG → unit anaknya; PUSAT → semua CABANG/UNIT.
  const recipientOptions =
    org?.org_type === "PUSAT"
      ? (allOrgs?.filter((o) => o.org_type !== "PUSAT" && o.id !== orgId) ?? [])
      : (allOrgs?.filter((o) => o.parent_id === orgId && o.org_type === "UNIT") ?? []);

  const openCreate = () => {
    setEditing(null);
    reset({ recipient_org_id: 0, expense_category_id: 0, income_category_id: 0, amount: 0 });
    setDialogOpen(true);
  };

  const openEdit = (s: SubsidyRead) => {
    setEditing(s);
    reset({
      recipient_org_id: s.recipient_org_id,
      expense_category_id: s.expense_category_id,
      income_category_id: s.income_category_id,
      amount: s.amount,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (v: SubsidyValues) => {
    try {
      if (editing) {
        await updateSubsidy.mutateAsync({ subsidyId: editing.id, data: v });
      } else {
        await createSubsidy.mutateAsync({ ...v, is_active: true });
      }
      setDialogOpen(false);
      reset();
    } catch {
      // error ditampilkan via mutation.error di bawah
    }
  };

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

  const mutationError = createSubsidy.error || updateSubsidy.error;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Subsidi ke Unit</h1>
            <Badge variant="secondary">{org.name}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Beban subsidi di organisasi ini akan tercatat sebagai pendapatan di
            organisasi penerima
            {org.org_type === "PUSAT"
              ? " (Cabang atau Unit mana pun)"
              : " (Unit anak)"}
            .
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1" />
          Tambah Subsidi
        </Button>
      </div>

      {loadingSubs ? (
        <Skeleton className="h-32 w-full" />
      ) : !subsidies || subsidies.length === 0 ? (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          Belum ada subsidi yang dikonfigurasi.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Penerima</TableHead>
              <TableHead>Kategori Beban (Pemberi)</TableHead>
              <TableHead>Kategori Pendapatan (Penerima)</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subsidies.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.recipient_org_name}</TableCell>
                <TableCell>
                  <span className="font-mono text-xs">{s.expense_category_code}</span>{" "}
                  {s.expense_category_label}
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs">{s.income_category_code}</span>{" "}
                  {s.income_category_label}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(s.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant={s.is_active ? "default" : "secondary"}>
                    {s.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(s)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteSubsidy.mutate(s.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HandCoins className="h-5 w-5 text-emerald-600" />
              {editing ? "Edit Subsidi" : "Tambah Subsidi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Organisasi Penerima</Label>
              <Select
                value={watch("recipient_org_id") ? String(watch("recipient_org_id")) : ""}
                onValueChange={(v) => setValue("recipient_org_id", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih penerima..." />
                </SelectTrigger>
                <SelectContent>
                  {recipientOptions.map((o) => (
                    <SelectItem key={o.id} value={String(o.id)}>
                      {o.name} ({o.org_type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.recipient_org_id && (
                <p className="text-xs text-destructive">{errors.recipient_org_id.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Kategori Beban Pemberi Subsidi</Label>
              <Select
                value={watch("expense_category_id") ? String(watch("expense_category_id")) : ""}
                onValueChange={(v) => setValue("expense_category_id", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori beban..." />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories?.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.code} — {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expense_category_id && (
                <p className="text-xs text-destructive">{errors.expense_category_id.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Kategori Pendapatan Penerima Subsidi</Label>
              <Select
                value={watch("income_category_id") ? String(watch("income_category_id")) : ""}
                onValueChange={(v) => setValue("income_category_id", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori pendapatan..." />
                </SelectTrigger>
                <SelectContent>
                  {incomeCategories?.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.code} — {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.income_category_id && (
                <p className="text-xs text-destructive">{errors.income_category_id.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Jumlah (Rp)</Label>
              <Input type="number" step="1" min={0} {...register("amount")} />
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount.message}</p>
              )}
            </div>

            {mutationError && (
              <p className="text-xs text-destructive">{mutationError.message}</p>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button
                type="submit"
                disabled={createSubsidy.isPending || updateSubsidy.isPending}
              >
                {createSubsidy.isPending || updateSubsidy.isPending
                  ? "Menyimpan..."
                  : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
