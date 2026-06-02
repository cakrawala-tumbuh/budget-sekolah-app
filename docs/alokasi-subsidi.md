# Alokasi & Subsidi

!!! note "Akses"
    Fitur ini hanya tampil untuk organisasi bertipe **CABANG** dan **PUSAT**, melalui
    halaman detail organisasi.

Cabang dan Pusat tidak memiliki siswa langsung, namun memikul biaya yang perlu
**dialokasikan** ke unit melalui kontribusi UP/US, atau menyalurkan **subsidi**.

## Alokasi UP (Uang Pangkal)

Menu **Alokasi UP** menentukan komponen biaya cabang/pusat yang masuk ke perhitungan
**Uang Pangkal** unit-unit di bawahnya.

- Pilih komponen/biaya yang ikut dialokasikan sebagai bagian UP.
- Sistem menjumlahkan komponen tersebut dan mendistribusikannya ke unit berdasarkan
  jumlah **siswa baru**.

## Alokasi US (Uang Sekolah)

Menu **Alokasi US** menentukan komponen biaya cabang/pusat yang masuk ke perhitungan
**Uang Sekolah** unit.

- Pilih komponen/biaya yang ikut dialokasikan sebagai bagian US.
- Sistem mendistribusikannya ke unit berdasarkan jumlah **total siswa**.

## Kontribusi antar organisasi

Persentase kontribusi (UP ke pusat/cabang, US ke pusat/cabang, dana pengembangan, dsb.)
mengatur berapa bagian yang mengalir dari unit ke induknya. Detail kontribusi per unit
menampilkan:

- Jumlah total siswa dan siswa baru unit.
- Persentase US dan UP (dapat di-*override* per unit).
- Nilai kontribusi US dan UP yang dihasilkan.

Hasil alokasi dianggap **valid** bila total kontribusi sesuai dengan total biaya dasar
yang dialokasikan.

## Subsidi ke Unit

Menu **Subsidi ke Unit** memungkinkan organisasi pemberi menyalurkan dana ke unit
penerima. Untuk tiap subsidi:

- **Unit penerima**.
- **Kategori biaya** (sisi pemberi — menjadi beban).
- **Kategori pendapatan** (sisi penerima — menjadi pendapatan).
- **Jumlah**.
- **Aktif/Non-aktif**.

Dengan demikian, satu transaksi subsidi otomatis tercatat sebagai **beban** di pemberi
dan **pendapatan** di penerima.

---

Setelah alokasi & subsidi diatur, jalankan [Simulasi](simulasi.md) untuk melihat dampaknya.
