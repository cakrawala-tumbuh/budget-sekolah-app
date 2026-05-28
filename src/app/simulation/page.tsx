"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, ORG_TYPE_LABEL } from "@/lib/utils";
import type { Organization } from "@/lib/types";

const ORG_TYPE_STYLE: Record<string, string> = {
  UNIT: "border-l-4 border-l-blue-500",
  CABANG: "border-l-4 border-l-amber-500",
  PUSAT: "border-l-4 border-l-green-500",
};

const ORG_TYPE_BADGE: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  UNIT: "secondary",
  CABANG: "default",
  PUSAT: "outline",
};

function SimulationCard({ org }: { org: Organization }) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", ORG_TYPE_STYLE[org.org_type])}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-sm leading-tight">{org.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{org.code}</p>
            {org.city && (
              <p className="text-xs text-muted-foreground">{org.city}</p>
            )}
          </div>
          <Badge variant={ORG_TYPE_BADGE[org.org_type]}>
            {ORG_TYPE_LABEL[org.org_type] ?? org.org_type}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild size="sm" className="w-full">
          <Link href={`/organizations/${org.id}/simulation`}>
            <TrendingUp className="h-3.5 w-3.5" />
            Lihat Simulasi
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SimulationListPage() {
  const [search, setSearch] = useState("");
  const { data: organizations, isLoading, isError } = useOrganizations();

  const filtered = organizations?.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      (o.city?.toLowerCase().includes(search.toLowerCase()) ?? false),
  );

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Simulasi</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pilih organisasi untuk melihat simulasi anggaran
        </p>
      </div>

      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama, kode, atau kota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Gagal memuat data organisasi. Pastikan backend berjalan.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : filtered?.length === 0 ? (
        <p className="text-muted-foreground text-sm">Tidak ada organisasi ditemukan.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((org) => (
            <SimulationCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
