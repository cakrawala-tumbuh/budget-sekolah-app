"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import {
  useGradeConfig,
  useUpsertGradeConfig,
  useDeleteGradeConfig,
} from "@/hooks/useGradeConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORG_TYPE_LABEL } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  num_grades: z.coerce.number().int().min(1).max(6),
  grade_1_label: z.string().max(50).nullable().optional(),
  grade_2_label: z.string().max(50).nullable().optional(),
  grade_3_label: z.string().max(50).nullable().optional(),
  grade_4_label: z.string().max(50).nullable().optional(),
  grade_5_label: z.string().max(50).nullable().optional(),
  grade_6_label: z.string().max(50).nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

const GRADE_SLOTS = [1, 2, 3, 4, 5, 6] as const;

export default function GradeConfigPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: orgLoading } = useOrganization(orgId);
  const { data: config, isLoading: configLoading } = useGradeConfig(orgId);
  const upsert = useUpsertGradeConfig(orgId);
  const remove = useDeleteGradeConfig(orgId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      num_grades: 6,
      grade_1_label: null,
      grade_2_label: null,
      grade_3_label: null,
      grade_4_label: null,
      grade_5_label: null,
      grade_6_label: null,
    },
  });

  useEffect(() => {
    if (config) {
      reset({
        num_grades: config.num_grades,
        grade_1_label: config.grade_1_label ?? null,
        grade_2_label: config.grade_2_label ?? null,
        grade_3_label: config.grade_3_label ?? null,
        grade_4_label: config.grade_4_label ?? null,
        grade_5_label: config.grade_5_label ?? null,
        grade_6_label: config.grade_6_label ?? null,
      });
    }
  }, [config, reset]);

  const watchedNumGrades = watch("num_grades");

  function onSubmit(values: FormValues) {
    // Kosongkan label slot di luar num_grades
    const data: FormValues = { ...values };
    for (let i = values.num_grades + 1; i <= 6; i++) {
      (data as Record<string, unknown>)[`grade_${i}_label`] = null;
    }
    upsert.mutate(data);
  }

  function handleReset() {
    if (confirm('Reset ke default? Label akan kembali menjadi "Kelas 1"\u2013"Kelas N".')) {
      remove.mutate(undefined, {
        onSuccess: () => {
          reset({
            num_grades: 6,
            grade_1_label: null,
            grade_2_label: null,
            grade_3_label: null,
            grade_4_label: null,
            grade_5_label: null,
            grade_6_label: null,
          });
        },
      });
    }
  }

  if (orgLoading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
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

  if (org.org_type !== "UNIT") {
    return (
      <div className="p-4 md:p-8">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/organizations/${org.id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Link>
          </Button>
        </div>
        <Alert>
          <AlertDescription>
            Konfigurasi label kelas hanya tersedia untuk organisasi bertipe UNIT.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${org.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Konfigurasi Label Kelas</h1>
            <Badge variant="outline">{ORG_TYPE_LABEL[org.org_type]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {org.name}
            {org.city && ` · ${org.city}`}
          </p>
        </div>
      </div>

      {configLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Jumlah Tingkat Kelas</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={String(watchedNumGrades)}
                onValueChange={(v) =>
                  setValue("num_grades", Number(v), { shouldDirty: true })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} tingkat
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                Contoh: SD = 6, SMP/SMA = 3, TK = 2
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Label per Tingkat Kelas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Kosongkan untuk menggunakan label default &quot;Kelas N&quot;.
              </p>
              {GRADE_SLOTS.filter((slot) => slot <= watchedNumGrades).map((slot) => (
                <div key={slot} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-sm text-muted-foreground">
                    Slot {slot}
                  </span>
                  <div className="flex-1">
                    <Input
                      placeholder={`Kelas ${slot}`}
                      {...register(`grade_${slot}_label` as keyof FormValues)}
                    />
                    {errors[`grade_${slot}_label` as keyof FormValues] && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors[`grade_${slot}_label` as keyof FormValues]?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!isDirty || upsert.isPending}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              {upsert.isPending ? "Menyimpan…" : "Simpan"}
            </Button>
            {config && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={remove.isPending}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Default
              </Button>
            )}
          </div>

          {upsert.isSuccess && (
            <Alert>
              <AlertDescription>Konfigurasi label kelas berhasil disimpan.</AlertDescription>
            </Alert>
          )}
          {upsert.isError && (
            <Alert variant="destructive">
              <AlertDescription>
                {(upsert.error as { message?: string })?.message ?? "Gagal menyimpan."}
              </AlertDescription>
            </Alert>
          )}
        </form>
      )}
    </div>
  );
}
