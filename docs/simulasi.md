# Simulasi & Laporan

Setelah data anggaran lengkap, jalankan **Simulasi** untuk melihat tarif UP/US,
pendapatan, biaya, dan posisi surplus/defisit.

## Membuka simulasi

- **Administrator** — menu **Simulasi** di sidebar, atau tombol **Lihat Simulasi** di
  halaman detail organisasi.
- **Pengguna Organisasi** — menu **Simulasi** langsung membuka simulasi organisasi Anda.

## Isi halaman simulasi

Halaman simulasi menampilkan beberapa tabel:

### Simulasi Uang Pangkal (UP)

- Daftar **komponen UP** beserta nilainya, termasuk komponen yang dialokasikan dari
  cabang dan pusat.
- **Depresiasi** (investasi baru + aset lama) yang ditambahkan ke biaya UP.
- **Tarif UP otomatis** = total biaya UP ÷ jumlah siswa baru.
- **Tarif UP final** — memakai *override* bila diisi, jika tidak memakai tarif otomatis.
- **Total pendapatan UP**.

### Simulasi Uang Sekolah (US)

- Daftar **komponen US** beserta komponen alokasi cabang/pusat.
- **Jumlah siswa** dan **jumlah bulan**.
- **Tarif US otomatis** = total biaya US ÷ siswa ÷ bulan.
- **Tarif US final** dan **total pendapatan US**.

### Simulasi Pendapatan

Rincian seluruh pos pendapatan, membandingkan nilai input dengan nilai otomatis.

### Simulasi Biaya

Rincian biaya **operasional** dan **non-operasional**, dipecah menjadi porsi **Yayasan**
dan **BOS**.

## Ringkasan Anggaran (Summary)

Tombol **Summary** di halaman detail organisasi menampilkan ringkasan RAB dalam dua basis:

| Basis | Memperhitungkan |
|-------|-----------------|
| **Kas (cash)** | Pendapatan kas, biaya kas, dan pengeluaran investasi penuh. |
| **Akrual (accrual)** | Pendapatan & biaya akrual, beban depresiasi (bukan investasi penuh). |

Untuk masing-masing basis ditampilkan **total pendapatan**, **total biaya**, dan
**surplus/defisit**. Tersedia juga versi angka **otomatis** (auto) sebagai pembanding.

!!! tip "Membaca surplus/defisit"
    - **Surplus** (positif) — pendapatan melebihi biaya.
    - **Defisit** (negatif) — biaya melebihi pendapatan; tinjau kembali asumsi siswa,
      tarif UP/US, atau komponen biaya.

## Konsolidasi

Untuk Cabang dan Pusat, simulasi memperhitungkan kontribusi dan alokasi dari unit-unit di
bawahnya, sehingga Administrator dapat melihat **gambaran anggaran konsolidasi** seluruh
yayasan.

---

Pertanyaan umum tersedia di [Tanya Jawab (FAQ)](faq.md).
