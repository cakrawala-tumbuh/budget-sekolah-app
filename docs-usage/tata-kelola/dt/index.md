# Decision Table (DT)

Kumpulan Decision Table tata kelola RAB yayasan pendidikan. Tiap DT memetakan kombinasi kondisi ke
tindakan/keputusan, dan dirujuk dari titik keputusan pada SOP/IK — bukan menuliskan ulang logika
if-else di narasi prosedur.

## Daftar Decision Table

Tabel di bawah memuat DT yang telah ditulis beserta `doc_id`, keputusan yang dibantu, dan dokumen
yang merujuknya.

| `doc_id` | Decision Table | Keputusan yang dibantu | Dirujuk oleh |
|---|---|---|---|
| `DT-80c8a72a` | [Ketersediaan Tipe Simulasi per Tipe Organisasi](dt-80c8a72a-ketersediaan-tipe-simulasi.md) | Simulasi mana yang boleh dijalankan per tipe organisasi | `SOP-d3d42a08`, `SOP-a8608e7a`, `SOP-3ded94ef` |
| `DT-b7d9cedd` | [Klasifikasi Komponen Biaya](dt-b7d9cedd-klasifikasi-komponen-biaya.md) | Kategori biaya masuk bucket UP/US/Direct Income/Non-Operasional | `OTS-6f1cf35a`, `SOP-d3d42a08` |
| `DT-e80fe01d` | [Tarif Kontribusi Default UP & US](dt-e80fe01d-tarif-kontribusi-default.md) | Persentase kontribusi awal UP/US ke Cabang/Pusat | `SOP-a8608e7a`, `SOP-3ded94ef` |
| `DT-e348eca6` | [Opsi Penanganan Defisit per Tingkat](dt-e348eca6-opsi-penanganan-defisit.md) | Tuas & prioritas penanganan defisit di tiap tingkat | `SOP-d3d42a08`, `SOP-a8608e7a`, `SOP-3ded94ef` |
