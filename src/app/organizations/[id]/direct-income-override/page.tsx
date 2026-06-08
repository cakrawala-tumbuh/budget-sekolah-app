"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, RotateCcw, Check, X } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import { useDirectIncomeSimulation } from "@/hooks/useSimulation";
import {
  useUpsertDirectIncomeOverride,
  useDeleteDirectIncomeOverride,
} from "@/hooks/useDirectIncomeOverrides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DirectIncomeOverridePage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: simulation, isLoading, isError } = useDirectIncomeSimulation(orgId);

  const upsert = useUpsertDirectIncomeOverride(orgId);
  const remove = useDeleteDirectIncomeOverride(orgId);

  const [editing, setEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(expCatId: number, currentValue: number) {
    setEditing(expCatId);
    setEditValue(String(currentValue));
  }

  function cancelEdit() {
    setEditing(null);
    setEditValue("");
  }

  function saveEdit(expCatId: number) {
    const amount = parseFloat(editValue);
    if (isNaN(amount) || amount < 0) return;
    upsert.mutate(
      { expenseCategoryId: expCatId, data: { override_amount: amount } },
      { onSuccess: () => { setEditing(null); setEditValue(""); } },
    );
  }

  function resetOverride(expCatId: number) {
    if (confirm("Hapus override? Nilai akan kembali ke otomatis.")) {
      remove.mutate(expCatId);
    }
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
          <h1 className="text-2xl font-bold tracking-tight">Override Direct Income</h1>
          {org && <p className="text-sm text-muted-foreground">{org.name}</p>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Gunakan halaman ini untuk menetapkan nilai pendapatan yang dipungut dari siswa bila
        berbeda dari nominal anggaran biaya. Nilai otomatis dihitung dari dana Yayasan pada
        entri biaya terkait. Bila override tidak diisi, nilai otomatis yang dipakai dalam simulasi.
      </p>

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Gagal memuat data Direct Income.</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : !simulation || simulation.items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          Belum ada kategori biaya yang dikonfigurasi sebagai Direct Income.
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Kode Biaya</TableHead>
                <TableHead>Uraian Biaya</TableHead>
                <TableHead className="text-right w-44">Otomatis (Rp)</TableHead>
                <TableHead className="text-right w-44">Override (Rp)</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {simulation.items.map((item) => (
                <TableRow key={item.expense_category_id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.expense_code}
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.expense_label}
                    {item.is_overridden && (
                      <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-400">
                        Override
                      </Badge>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      → {item.income_code} {item.income_label}
                    </p>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {formatCurrency(item.auto_total)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {editing === item.expense_category_id ? (
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8 text-right w-36 inline-block"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(item.expense_category_id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    ) : (
                      <span className={item.is_overridden ? "font-semibold text-amber-700" : "text-muted-foreground"}>
                        {item.is_overridden ? formatCurrency(item.total) : "—"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      {editing === item.expense_category_id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-green-600"
                            onClick={() => saveEdit(item.expense_category_id)}
                            disabled={upsert.isPending}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={cancelEdit}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Set override"
                            onClick={() => startEdit(item.expense_category_id, item.is_overridden ? item.total : item.auto_total)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          {item.is_overridden && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              title="Kembalikan ke otomatis"
                              onClick={() => resetOverride(item.expense_category_id)}
                              disabled={remove.isPending}
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
