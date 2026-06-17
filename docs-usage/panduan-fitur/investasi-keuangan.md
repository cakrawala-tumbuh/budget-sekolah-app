# Investasi Keuangan

Halaman **Investasi Keuangan** digunakan oleh organisasi **CABANG** dan **PUSAT** untuk mencatat instrumen investasi keuangan (saham, reksa dana, obligasi, deposito, dll.) beserta nominalnya. Nominal yang tercatat akan dialokasikan secara proporsional ke unit-unit anak sebagai komponen biaya dalam simulasi Uang Pangkal.

## Membuka Investasi Keuangan

1. Buka halaman detail organisasi (CABANG atau PUSAT).
2. Klik kartu **Investasi Keuangan** di bagian navigasi fitur.

!!! note "Khusus CABANG & PUSAT"
    Fitur ini hanya tersedia untuk organisasi bertipe CABANG dan PUSAT. Unit tidak memiliki akses ke halaman ini.

## Tampilan Halaman

Tabel menampilkan semua instrumen investasi keuangan yang telah dicatat:

| Kolom | Keterangan |
|---|---|
| **Jenis** | Tipe instrumen (Saham, Reksa Dana, Obligasi, Deposito, Lainnya) |
| **Nama Instrumen** | Nama produk investasi |
| **Nominal** | Nilai investasi dalam rupiah |
| **Catatan** | Keterangan tambahan (opsional) |

Di bawah tabel ditampilkan **Total Investasi Keuangan** — jumlah seluruh nominal yang tercatat.

## Menambah Investasi Keuangan

1. Klik tombol **+ Tambah Investasi**.
2. Isi form:
   - **Jenis Instrumen** — Pilih dari daftar: Saham, Reksa Dana, Obligasi, Deposito, atau Lainnya.
   - **Nama Instrumen** — Nama produk atau instrumen (mis. "BRI Danareksa Equity Fund").
   - **Nominal Investasi (Rp)** — Nilai investasi dalam rupiah.
   - **Catatan** — Keterangan tambahan (opsional).
3. Klik **Simpan**.

## Mengedit & Menghapus

Klik ikon pensil untuk mengedit atau ikon tempat sampah untuk menghapus. Konfirmasi pada dialog yang muncul.

## Hubungan dengan Simulasi UP

Total nominal investasi keuangan yang tercatat di CABANG atau PUSAT dialokasikan secara proporsional ke unit-unit yang dinaungi berdasarkan persentase siswa. Alokasi ini masuk sebagai komponen tambahan dalam simulasi **Uang Pangkal (UP)** setiap unit, sehingga ikut menaikkan tarif UP.

Pada tabel simulasi UP unit, alokasi ini ditampilkan di baris **Investasi Keuangan Cabang (alokasi)** atau **Investasi Keuangan Pusat (alokasi)** di bawah masing-masing heading **Alokasi Biaya Cabang** atau **Alokasi Biaya Pusat**.

!!! tip "Cara melihat dampaknya"
    Setelah menambah atau mengubah data investasi keuangan di CABANG/PUSAT, buka halaman **Simulasi Anggaran** di unit anak dan lihat tab **Uang Pangkal** — bagian Alokasi Biaya Cabang atau Alokasi Biaya Pusat akan memperlihatkan nilai yang telah diperbarui.
