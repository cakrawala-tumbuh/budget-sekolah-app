# Konsep Dasar

Bagian ini menjelaskan istilah dan konsep yang dipakai di seluruh aplikasi. Memahaminya
akan memudahkan Anda menginput data dan membaca hasil simulasi.

## Struktur Organisasi

Yayasan dibagi menjadi tiga jenis (tipe) organisasi yang membentuk hierarki:

| Tipe | Keterangan |
|------|-----------|
| **PUSAT** | Tingkat yayasan tertinggi. Menerima kontribusi dari cabang/unit. |
| **CABANG** | Pengelola wilayah/sekolah, membawahi beberapa unit. |
| **UNIT** | Satuan pendidikan (mis. TK, SD, SMP, SMA) tempat siswa terdaftar. |

Setiap organisasi memiliki **kode** unik, **nama**, **kota** (opsional), dan dapat
memiliki **induk** (parent) sehingga terbentuk struktur pohon Pusat → Cabang → Unit.

## Peran Pengguna (Role)

| Peran | Akses |
|-------|-------|
| **ADMIN** (Administrator) | Akses penuh ke seluruh organisasi, data master, dan pengguna. |
| **ORG** (Organisasi) | Hanya data milik organisasi yang ditugaskan kepadanya. |

## Uang Pangkal (UP) dan Uang Sekolah (US)

Dua komponen tarif utama yang dihitung aplikasi:

- **Uang Pangkal (UP)** — biaya satu kali untuk **siswa baru**. Dihitung dari komponen
  biaya UP ditambah depresiasi terkait, lalu dibagi jumlah siswa baru.
- **Uang Sekolah (US)** — biaya bulanan/tahunan untuk **seluruh siswa**. Dihitung dari
  komponen biaya US dibagi jumlah siswa dan jumlah bulan.

Aplikasi menghitung **tarif otomatis** (auto rate) dari data biaya. Anda dapat memasukkan
**tarif override** untuk memakai angka final yang berbeda dari hasil hitung otomatis.

## Asumsi Siswa

Untuk tiap **UNIT**, Anda mengisi sebaran jumlah siswa per kelas (grade), jumlah
**siswa baru**, **siswa lama**, dan **jumlah staf**. Angka inilah yang menjadi pembagi
dalam perhitungan tarif UP/US.

## Label Kelas (Grade Config)

Tiap unit dapat memakai jumlah tingkat berbeda (mis. SMP = 3 tingkat: Kelas 7–9; SD = 6
tingkat). **Label Kelas** mengatur berapa banyak tingkat aktif dan nama tiap tingkat.

## Biaya: Operasional vs Non-Operasional

- **Biaya Operasional** — biaya rutin penyelenggaraan pendidikan.
- **Biaya Non-Operasional** — biaya di luar operasional rutin.

Setiap baris biaya dapat dibagi sumber pendanaannya menjadi **Yayasan (foundation)** dan
**BOS**, serta dialokasikan per kelas (grade allocation).

## Investasi dan Depresiasi

- **Investasi** — pembelian aset baru (harga perolehan, umur ekonomis, bulan mulai).
  Aplikasi menghitung **depresiasi per tahun** dan **nilai buku akhir** otomatis.
- **Depresiasi Aset Lama** — aset yang sudah dimiliki sebelumnya; dipakai untuk
  menghitung beban depresiasi tahun berjalan.

## Kontribusi & Alokasi

Cabang dan Pusat dapat menerima **kontribusi** dari unit di bawahnya, dengan persentase
untuk UP dan US. Komponen biaya juga dapat dialokasikan (**Alokasi UP/US**) ke cabang/pusat.

## Subsidi

Organisasi induk dapat memberi **subsidi** ke unit: beban di sisi pemberi menjadi
pendapatan di sisi penerima, untuk kategori biaya/pendapatan tertentu.

## Basis Kas vs Akrual

Ringkasan anggaran (Summary) disajikan dalam dua basis:

- **Kas (cash)** — memperhitungkan arus kas, termasuk pengeluaran investasi.
- **Akrual (accrual)** — memperhitungkan beban depresiasi alih-alih pengeluaran investasi
  penuh, sesuai prinsip akuntansi akrual.

Masing-masing menampilkan **surplus/defisit**.

---

Lanjut ke [Manajemen Organisasi](organisasi.md).
