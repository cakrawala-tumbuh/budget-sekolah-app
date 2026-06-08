"use client";

import { useState } from "react";
import { Pencil, RotateCcw, Check, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { DirectIncomeSimulation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useUpsertDirectIncomeOverride,
  useDeleteDirectIncomeOverride,
} from "@/hooks/useDirectIncomeOverrides";

interface DirectIncomeTableProps {
  data: DirectIncomeSimulation;
  orgId: number;
}

export function DirectIncomeTable({ data, orgId }: DirectIncomeTableProps) {
  const upsert = useUpsertDirectIncomeOverride(orgId);
  const remove = useDeleteDirectIncomeOverride(orgId);

  const [editing, setEditing] = useState<number | null>(null); // expense_category_id
  const [editValue, setEditValue] = useState("");

  function startEdit(expCatId: number, currentTotal: number) {
    setEditing(expCatId);
    setEditValue(String(currentTotal));
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

  const grouped = data.items.reduce<
    Record<string, { code: string; label: string; items: typeof data.items; subtotal: number; autoSubtotal: number }>
  >((acc, item) => {
    const key = item.income_code;
    if (!acc[key]) {
      acc[key] = { code: item.income_code, label: item.income_label, items: [], subtotal: 0, autoSubtotal: 0 };
    }
    acc[key].items.push(item);
    acc[key].subtotal += item.total;
    acc[key].autoSubtotal += item.auto_total;
    return acc;
  }, {});

  const groups = Object.values(grouped);
  const isOverrideActive = data.total !== data.total_auto;

  return (
    <div className="overflow-x-auto space-y-2">
      {isOverrideActive && (
        <p className="text-xs text-muted-foreground">
          Nilai otomatis: {formatCurrency(data.total_auto)} — nilai final (dengan override): {formatCurrency(data.total)}
        </p>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Kode Biaya</TableHead>
            <TableHead>Uraian Biaya</TableHead>
            <TableHead className="text-right w-44">Otomatis (Rp)</TableHead>
            <TableHead className="text-right w-44">Final (Rp)</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                Tidak ada biaya bertipe Direct Income.
              </TableCell>
            </TableRow>
          ) : (
            groups.map((group) => (
              <>
                <TableRow key={`group-${group.code}`} className="bg-muted/50">
                  <TableCell colSpan={2} className="font-semibold text-sm py-2">
                    <span className="font-mono text-xs text-muted-foreground mr-2">
                      {group.code}
                    </span>
                    {group.label}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-sm py-2 text-muted-foreground">
                    {formatCurrency(group.autoSubtotal)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-sm py-2">
                    {formatCurrency(group.subtotal)}
                  </TableCell>
                  <TableCell />
                </TableRow>
                {group.items.map((item, i) => (
                  <TableRow key={`${group.code}-${i}`}>
                    <TableCell className="font-mono text-xs text-muted-foreground pl-8">
                      {item.expense_code}
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.expense_label}
                      {item.is_overridden && (
                        <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-400">
                          Override
                        </Badge>
                      )}
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
                          className="h-7 text-right w-36 inline-block"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(item.expense_category_id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                      ) : (
                        <span className={item.is_overridden ? "font-semibold text-amber-700" : ""}>
                          {formatCurrency(item.total)}
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
                              onClick={() => startEdit(item.expense_category_id, item.total)}
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
              </>
            ))
          )}
        </TableBody>
        {data.items.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total Pendapatan dari Biaya
              </TableCell>
              <TableCell className="text-right tabular-nums text-muted-foreground">
                {formatCurrency(data.total_auto)}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatCurrency(data.total)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
