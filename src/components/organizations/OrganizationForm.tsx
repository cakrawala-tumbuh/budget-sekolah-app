"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrgType, Organization } from "@/lib/types";

const orgSchema = z.object({
  code: z.string().min(1, "Kode wajib diisi").max(20),
  name: z.string().min(1, "Nama wajib diisi").max(200),
  org_type: z.enum(["UNIT", "CABANG", "PUSAT"] as const),
  city: z.string().optional(),
  parent_id: z.coerce.number().optional(),
});

type OrgFormValues = z.infer<typeof orgSchema>;

interface OrganizationFormProps {
  defaultValues?: Partial<OrgFormValues>;
  onSubmit: (values: OrgFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function OrganizationForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Simpan",
}: OrganizationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      org_type: "UNIT",
      ...defaultValues,
    },
  });

  const orgType = watch("org_type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="code">Kode Organisasi</Label>
        <Input
          id="code"
          placeholder="Contoh: SD-MBL"
          {...register("code")}
          className={errors.code ? "border-destructive" : ""}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name">Nama Organisasi</Label>
        <Input
          id="name"
          placeholder="Contoh: SD Maria Bintang Laut"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Tipe Organisasi</Label>
        <Select
          value={orgType}
          onValueChange={(v) => setValue("org_type", v as OrgType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UNIT">Unit (Sekolah / Daycare)</SelectItem>
            <SelectItem value="CABANG">Cabang</SelectItem>
            <SelectItem value="PUSAT">Pusat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="city">Kota (opsional)</Label>
        <Input
          id="city"
          placeholder="Contoh: Bandung"
          {...register("city")}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  );
}
