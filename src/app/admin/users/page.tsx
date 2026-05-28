"use client";

import { useState } from "react";
import { KeyRound, Copy, Check } from "lucide-react";
import { useUsers, useResetOrgPassword } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UsersPage() {
  const { data, isLoading, isError } = useUsers();
  const resetMutation = useResetOrgPassword();

  const [resetResult, setResetResult] = useState<{
    username: string;
    new_password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  function handleReset(orgId: number, orgName: string) {
    if (
      confirm(
        `Reset password untuk organisasi "${orgName}"? Password baru akan ditampilkan sekali dan tidak bisa dilihat lagi.`,
      )
    ) {
      resetMutation.mutate(orgId, {
        onSuccess: (res) => {
          setResetResult(res);
          setCopied(false);
        },
      });
    }
  }

  function handleCopy() {
    if (!resetResult) return;
    navigator.clipboard.writeText(resetResult.new_password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar seluruh pengguna sistem dan reset password organisasi
        </p>
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Gagal memuat data pengguna.</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="w-32">Peran</TableHead>
              <TableHead className="w-32 text-center">Status</TableHead>
              <TableHead className="w-32 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-muted-foreground">{user.id}</TableCell>
                    <TableCell className="font-mono text-sm">{user.username}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                      >
                        {user.role === "ADMIN" ? "Administrator" : "Organisasi"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.is_active ? (
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-300"
                        >
                          Aktif
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-red-700 border-red-300"
                        >
                          Nonaktif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        {user.org_id !== null && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleReset(user.org_id!, user.username)
                            }
                            disabled={resetMutation.isPending}
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                            Reset Password
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Reset Password Result Dialog */}
      <Dialog
        open={!!resetResult}
        onOpenChange={(o) => !o && setResetResult(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Berhasil Direset</DialogTitle>
          </DialogHeader>
          {resetResult && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Simpan password baru ini sekarang. Password tidak bisa dilihat
                  lagi setelah dialog ini ditutup.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-mono font-medium">{resetResult.username}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Password Baru</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
                    {resetResult.new_password}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    title="Salin password"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => setResetResult(null)}
              >
                Tutup
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
