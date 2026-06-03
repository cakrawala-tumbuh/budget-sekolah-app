# Konsep Dasar

Bagian ini menjelaskan istilah dan konsep yang dipakai di seluruh aplikasi. Memahaminya
akan memudahkan Anda menginput data dan membaca hasil simulasi.

## Struktur Organisasi

Organisasi dalam aplikasi dibagi menjadi tiga jenis (tipe) yang membentuk hierarki:

| Tipe | Keterangan |
|------|-----------|
| **PUSAT** | Tingkat pengelola tertinggi. Menerima kontribusi dari cabang/unit. |
| **CABANG** | Pengelola wilayah/sekolah, membawahi beberapa unit. |
| **UNIT** | Satuan pendidikan (mis. TK, SD, SMP, SMA) tempat siswa terdaftar. |

Setiap organisasi memiliki **kode** unik, **nama**, **kota** (opsional), **saldo kas &
setara kas** awal, dan dapat memiliki **induk** (parent) sehingga terbentuk struktur pohon
Pusat → Cabang → Unit.

## Peran Pengguna (Role)

| Peran | Akses |
|-------|-------|
| **ADMIN** (Administrator) | Akses penuh ke seluruh organisasi, data master, dan pengguna. |
| **ORG** (Organisasi) | Organisasi yang ditugaskan kepadanya **beserta seluruh organisasi yang dinaunginya secara berjenjang** (anak, cucu, dan seterusnya). Bersifat lihat saja — tidak dapat menambah/mengubah/menghapus organisasi. |

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

Beban cabang/pusat dialokasikan (**Alokasi UP/US**) ke unit di bawahnya secara
proporsional jumlah siswa (UP: siswa baru, US: total siswa). Bagi **unit**, porsi ini —
beban UP+US induk **ditambah depresiasi tahun berjalan induk** (investasi baru + aset
lama) — menjadi **setoran** yang dicatat sebagai penambah beban operasional unit.

Bagi **cabang/pusat**, total setoran seluruh unit menjadi **pendapatan kontribusi**
(akun `4630.xx`). Karena keduanya memakai angka yang sama, **setoran unit = kontribusi
yang diterima induk**, sehingga buku unit dan induk terkonsolidasi 1:1.

!!! note "Tarif kontribusi persentase"
    Field tarif kontribusi persen (`up_to_cabang`, dst.) tetap tersedia di data unit,
    namun **tidak lagi dipakai** untuk menghitung pendapatan induk — pendapatan induk
    kini sepenuhnya berbasis alokasi beban + depresiasi.

## Subsidi

Organisasi induk dapat memberi **subsidi** ke unit: beban di sisi pemberi menjadi
pendapatan di sisi penerima, untuk kategori biaya/pendapatan tertentu.

## Saldo Kas & Setara Kas

Tiap organisasi dapat mencatat **saldo kas & setara kas** awal (total saja, tanpa rincian).
Saldo ini menjadi dasar perhitungan **budget kas**:

> **Saldo Kas Akhir (Budget Kas) = Saldo Kas Awal + Surplus/Defisit Kas Tahun Ini**

Dengan begitu Summary tidak hanya menampilkan surplus/defisit tahun berjalan, tetapi juga
**proyeksi posisi kas akhir** organisasi. Saldo diisi/diubah lewat form organisasi
(Administrator) atau lewat halaman detail organisasi oleh pengguna Organisasi sendiri
(lihat [Mengubah Saldo Kas & Setara Kas](organisasi.md#mengubah-saldo-kas-setara-kas));
nilai bawaannya `0`.

## Basis Kas vs Akrual

Ringkasan anggaran (Summary) disajikan dalam dua basis:

- **Kas (cash)** — memperhitungkan arus kas, termasuk pengeluaran investasi.
- **Akrual (accrual)** — memperhitungkan beban depresiasi alih-alih pengeluaran investasi
  penuh, sesuai prinsip akuntansi akrual.

Masing-masing menampilkan **surplus/defisit**. Pada basis kas, surplus/defisit ini
ditambahkan ke saldo kas awal untuk memperoleh **saldo kas akhir (budget kas)**.

---

Lanjut ke [Manajemen Organisasi](organisasi.md).
