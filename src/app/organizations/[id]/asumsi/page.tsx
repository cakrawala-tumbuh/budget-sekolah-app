"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrganization } from "@/hooks/useOrganizations";
import { useAssumption, useUpsertAssumption } from "@/hooks/useAssumption";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ORG_TYPE_LABEL, formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

const gradeSchema = z.coerce.number().int().min(0, "Tidak boleh negatif").default(0);
const optionalRateSchema = z.union([
  z.literal(""),
  z.coerce.number().min(0, "Tidak boleh negatif"),
]).transform((v) => (v === "" ? null : v));

const schema = z.object({
  grade_1: gradeSchema,
  grade_2: gradeSchema,
  grade_3: gradeSchema,
  grade_4: gradeSchema,
  grade_5: gradeSchema,
  grade_6: gradeSchema,
  new_student_count: gradeSchema,
  returning_student_count: gradeSchema,
  staff_count: gradeSchema,
  override_up_rate: optionalRateSchema,
  override_us_rate: optionalRateSchema,
});

type FormValues = z.infer<typeof schema>;

export default function AsumsiPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: orgLoading } = useOrganization(orgId);
  const { data: assumption, isLoading: assumptionLoading } = useAssumption(orgId);
  const upsert = useUpsertAssumption(orgId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      grade_1: 0,
      grade_2: 0,
      grade_3: 0,
      grade_4: 0,
      grade_5: 0,
      grade_6: 0,
      new_student_count: 0,
      returning_student_count: 0,
      staff_count: 0,
      override_up_rate: "",
      override_us_rate: "",
    },
  });

  // Isi form saat data asumsi berhasil dimuat
  useEffect(() => {
    if (assumption) {
      reset({
        grade_1: assumption.grade_1,
        grade_2: assumption.grade_2,
        grade_3: assumption.grade_3,
        grade_4: assumption.grade_4,
        grade_5: assumption.grade_5,
        grade_6: assumption.grade_6,
        new_student_count: assumption.new_student_count,
        returning_student_count: assumption.returning_student_count,
        staff_count: assumption.staff_count,
        override_up_rate: assumption.override_up_rate ?? "",
        override_us_rate: assumption.override_us_rate ?? "",
      });
    }
  }, [assumption, reset]);

  const watchedGrades = watch([
    "grade_1",
    "grade_2",
    "grade_3",
    "grade_4",
    "grade_5",
    "grade_6",
  ]);
  const totalSiswa = watchedGrades.reduce(
    (sum, v) => sum + (Number(v) || 0),
    0
  );

  function onSubmit(values: FormValues) {
    upsert.mutate({
      grade_1: values.grade_1,
      grade_2: values.grade_2,
      grade_3: values.grade_3,
      grade_4: values.grade_4,
      grade_5: values.grade_5,
      grade_6: values.grade_6,
      new_student_count: values.new_student_count,
      returning_student_count: values.returning_student_count,
      staff_count: values.staff_count,
      override_up_rate: values.override_up_rate as number | null,
      override_us_rate: values.override_us_rate as number | null,
    });
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
            Halaman asumsi siswa hanya tersedia untuk organisasi bertipe UNIT.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${org.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Asumsi Siswa</h1>
            <Badge variant="outline">{ORG_TYPE_LABEL[org.org_type]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {org.name}
            {org.city && ` · ${org.city}`}
          </p>
        </div>
      </div>

      {assumptionLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sebaran Siswa per Kelas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Sebaran Siswa per Kelas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  [
                    { name: "grade_1", label: "Kelas 1" },
                    { name: "grade_2", label: "Kelas 2" },
                    { name: "grade_3", label: "Kelas 3" },
                    { name: "grade_4", label: "Kelas 4" },
                    { name: "grade_5", label: "Kelas 5" },
                    { name: "grade_6", label: "Kelas 6" },
                  ] as const
                ).map(({ name, label }) => (
                  <div key={name} className="space-y-1.5">
                    <Label>{label}</Label>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      {...register(name)}
                    />
                    {errors[name] && (
                      <p className="text-xs text-destructive">
                        {errors[name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm">
                <span className="text-muted-foreground">Total Siswa (otomatis)</span>
                <span className="font-semibold">
                  {totalSiswa.toLocaleString("id-ID")} siswa
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Ringkasan Siswa & Staf */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ringkasan Siswa & Staf</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Jumlah Siswa Baru</Label>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    placeholder="0"
                    {...register("new_student_count")}
                  />
                  {errors.new_student_count && (
                    <p className="text-xs text-destructive">
                      {errors.new_student_count.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Jumlah Siswa Lama</Label>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    placeholder="0"
                    {...register("returning_student_count")}
                  />
                  {errors.returning_student_count && (
                    <p className="text-xs text-destructive">
                      {errors.returning_student_count.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Jumlah Guru / Karyawan</Label>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    placeholder="0"
                    {...register("staff_count")}
                  />
                  {errors.staff_count && (
                    <p className="text-xs text-destructive">
                      {errors.staff_count.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Override Tarif UP & US */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Override Tarif UP / US</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Kosongkan agar tarif dihitung otomatis dari komponen biaya.
                Isi jika ingin mengesampingkan hasil kalkulasi.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Override Tarif UP (Rp)</Label>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    placeholder="Kosongkan = otomatis"
                    {...register("override_up_rate")}
                  />
                  {errors.override_up_rate && (
                    <p className="text-xs text-destructive">
                      {errors.override_up_rate.message}
                    </p>
                  )}
                  {assumption?.override_up_rate && (
                    <p className="text-xs text-muted-foreground">
                      Saat ini: {formatCurrency(assumption.override_up_rate)}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Override Tarif US (Rp)</Label>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    placeholder="Kosongkan = otomatis"
                    {...register("override_us_rate")}
                  />
                  {errors.override_us_rate && (
                    <p className="text-xs text-destructive">
                      {errors.override_us_rate.message}
                    </p>
                  )}
                  {assumption?.override_us_rate && (
                    <p className="text-xs text-muted-foreground">
                      Saat ini: {formatCurrency(assumption.override_us_rate)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tombol Simpan */}
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={upsert.isPending}
              className="min-w-32"
            >
              <Save className="h-4 w-4 mr-1.5" />
              {upsert.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
            {upsert.isSuccess && !isDirty && (
              <p className="text-sm text-green-600">Asumsi berhasil disimpan.</p>
            )}
            {upsert.isError && (
              <p className="text-sm text-destructive">
                Gagal menyimpan. Silakan coba lagi.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
