"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useOrganizations, useCreateOrganization, useDeleteOrganization } from "@/hooks/useOrganizations";
import { OrganizationCard } from "@/components/organizations/OrganizationCard";
import { OrganizationForm } from "@/components/organizations/OrganizationForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import type { OrgType } from "@/lib/types";

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Redirect ORG users to their own organization's simulation page
  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      if (user.org_id) {
        router.replace(`/organizations/${user.org_id}/simulation`);
      } else {
        router.replace("/");
      }
    }
  }, [user, router]);

  const { data: organizations, isLoading, isError } = useOrganizations();
  const createMutation = useCreateOrganization();
  const deleteMutation = useDeleteOrganization();

  // Don't render list for non-admin users while redirect is in progress
  if (user && user.role !== "ADMIN") return null;

  const filtered = organizations?.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      (o.city?.toLowerCase().includes(search.toLowerCase()) ?? false),
  );

  const handleCreate = (values: {
    code: string;
    name: string;
    org_type: OrgType;
    city?: string;
    cash_balance?: number;
    parent_id?: number;
  }) => {
    createMutation.mutate(values, {
      onSuccess: () => setOpen(false),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus organisasi ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Organisasi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {organizations ? `${organizations.length} organisasi terdaftar` : ""}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Tambah Organisasi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Organisasi Baru</DialogTitle>
            </DialogHeader>
            <OrganizationForm
              onSubmit={handleCreate}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
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
            Gagal memuat data organisasi. Pastikan backend berjalan di{" "}
            <code>{process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}</code>.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.length === 0 && (
            <p className="col-span-full text-center py-12 text-muted-foreground">
              Tidak ada organisasi ditemukan.
            </p>
          )}
          {filtered?.map((org) => (
            <OrganizationCard key={org.id} org={org} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
