"use client";

import { useRef, useState } from "react";
import { Download, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { useBackupDatabase, useRestoreDatabase } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DatabasePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  const backupMutation = useBackupDatabase();
  const restoreMutation = useRestoreDatabase();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setRestoreSuccess(false);
  }

  function handleRestore() {
    if (!selectedFile) return;
    if (
      !confirm(
        `Restore database dari file "${selectedFile.name}"?\n\nSemua data saat ini akan digantikan. Pastikan Anda sudah memiliki backup terbaru.`,
      )
    )
      return;

    restoreMutation.mutate(selectedFile, {
      onSuccess: () => {
        setSelectedFile(null);
        setRestoreSuccess(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Database</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Backup dan restore database SQLite untuk pemulihan data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Backup Database
            </CardTitle>
            <CardDescription>
              Unduh salinan database aktif sebagai file .db. Backup dibuat
              secara konsisten menggunakan SQLite Online Backup API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Simpan file backup di tempat yang aman. File ini berisi semua
                data anggaran termasuk kata sandi terenkripsi.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => backupMutation.mutate()}
              disabled={backupMutation.isPending}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {backupMutation.isPending ? "Menyiapkan..." : "Unduh Backup"}
            </Button>
            {backupMutation.isError && (
              <p className="text-sm text-destructive">
                {(backupMutation.error as Error).message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Restore */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Restore Database
            </CardTitle>
            <CardDescription>
              Pulihkan database dari file backup .db. Semua data aktif akan
              digantikan oleh isi file backup.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Perhatian:</strong> Operasi ini tidak dapat dibatalkan.
                Seluruh data saat ini akan hilang.
              </AlertDescription>
            </Alert>

            {restoreSuccess && (
              <Alert className="border-green-500 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Database berhasil dipulihkan. Halaman akan memuat ulang data
                  secara otomatis.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".db"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border file:border-input file:text-sm file:font-medium
                  file:bg-background file:text-foreground
                  hover:file:bg-accent cursor-pointer"
              />
              {selectedFile && (
                <p className="text-xs text-muted-foreground">
                  File dipilih: <span className="font-medium">{selectedFile.name}</span>{" "}
                  ({(selectedFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </div>

            <Button
              variant="destructive"
              onClick={handleRestore}
              disabled={!selectedFile || restoreMutation.isPending}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {restoreMutation.isPending ? "Memulihkan..." : "Restore Database"}
            </Button>

            {restoreMutation.isError && (
              <p className="text-sm text-destructive">
                {(restoreMutation.error as Error).message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
