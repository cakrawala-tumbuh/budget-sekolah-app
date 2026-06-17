"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import {
  useFinancialInvestments,
  useCreateFinancialInvestment,
  useUpdateFinancialInvestment,
  useDeleteFinancialInvestment,
} from "@/hooks/useFinancialInvestments";
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
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import type { FinancialInvestment, InstrumentType } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const INSTRUMENT_LABELS: Record<InstrumentType, string> = {
  SAHAM: "Saham",
  REKSA_DANA: "Reksa Dana",
  OBLIGASI: "Obligasi",
  DEPOSITO: "Deposito",
  LAINNYA: "Lainnya",
};

const INSTRUMENT_TYPES: InstrumentType[] = [
  "SAHAM",
  "REKSA_DANA",
  "OBLIGASI",
  "DEPOSITO",
  "LAINNYA",
];

const schema = z.object({
  instrument_type: z.enum(["SAHAM", "REKSA_DANA", "OBLIGASI", "DEPOSITO", "LAINNYA"]),
  name: z.string().min(1, "Nama instrumen wajib diisi"),
  amount: z.coerce.number().positive("Nilai harus lebih dari 0"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function FinancialInvestmentForm({
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      instrument_type: "REKSA_DANA",
      ...defaultValues,
    },
  });

  const instrumentType = watch("instrument_type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Jenis Instrumen</Label>
        <Select
          value={instrumentType}
          onValueChange={(v) => setValue("instrument_type", v as InstrumentType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis instrumen..." />
          </SelectTrigger>
          <SelectContent>
            {INSTRUMENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {INSTRUMENT_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.instrument_type && (
          <p className="text-xs text-destructive">{errors.instrument_type.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Nama Instrumen</Label>
        <Input
          placeholder="contoh: BRI Danareksa Equity Fund"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Nominal Investasi (Rp)</Label>
        <Input type="number" min={1} step={1} {...register("amount")} />
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Catatan</Label>
        <Textarea
          placeholder="Keterangan tambahan (opsional)"
          rows={2}
          {...register("notes")}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}

export default function FinancialInvestmentsPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: investments, isLoading, isError } = useFinancialInvestments(orgId);

  const createMutation = useCreateFinancialInvestment(orgId);
  const deleteMutation = useDeleteFinancialInvestment(orgId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<FinancialInvestment | null>(null);
  const updateMutation = useUpdateFinancialInvestment(orgId, editItem?.id ?? 0);

  const total = (investments ?? []).reduce((s, inv) => s + inv.amount, 0);

  function handleCreate(values: FormValues) {
    createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
  }

  function handleUpdate(values: FormValues) {
    if (!editItem) return;
    updateMutation.mutate(values, { onSuccess: () => setEditItem(null) });
  }

  function handleDelete(invId: number) {
    if (confirm("Hapus data investasi keuangan ini?")) deleteMutation.mutate(invId);
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
          <h1 className="text-2xl font-bold tracking-tight">Investasi Keuangan</h1>
          {org && (
            <p className="text-sm text-muted-foreground">
              {org.name} · Nominal dialokasikan ke unit anak sebagai beban UP
            </p>
          )}
        </div>
        {!org?.is_locked && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Investasi
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
          <AlertDescription>Gagal memuat data investasi keuangan.</AlertDescription>
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
              Belum ada data investasi keuangan. Klik &quot;Tambah Investasi&quot; untuk mulai.
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Nama Instrumen</TableHead>
                      <TableHead className="text-right">Nominal</TableHead>
                      <TableHead>Catatan</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {INSTRUMENT_LABELS[inv.instrument_type]}
                          </Badge>
                        </TableCell>
                        <TableCell>{inv.name}</TableCell>
                        <TableCell className="text-right tabular-nums font-medium">
                          {formatCurrency(inv.amount)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {inv.notes ?? "—"}
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

              <div className="mt-4 flex justify-end text-sm">
                <div>
                  Total Investasi Keuangan:{" "}
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(total)}
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
            <DialogTitle>Tambah Investasi Keuangan</DialogTitle>
          </DialogHeader>
          <FinancialInvestmentForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Investasi Keuangan</DialogTitle>
          </DialogHeader>
          {editItem && (
            <FinancialInvestmentForm
              defaultValues={{
                instrument_type: editItem.instrument_type,
                name: editItem.name,
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
