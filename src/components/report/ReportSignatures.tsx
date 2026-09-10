interface SignatureBlockProps {
  role: string;
  placeholder: string;
}

/**
 * Satu kotak tanda tangan pada Laporan RAB: peran di atas, garis kosong untuk
 * tanda tangan manual, jabatan dalam kurung di bawah garis, lalu baris tanggal.
 *
 * @param role - Label peran (mis. `"Disusun Oleh"`) yang ditampilkan di atas garis.
 * @param placeholder - Jabatan pejabat yang mengisi peran ini (mis. `"Kepala Sekolah"`),
 *   ditampilkan dalam kurung di bawah garis tanda tangan.
 */
function SignatureBlock({ role, placeholder }: SignatureBlockProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-[#475569]">{role}</p>
      <div className="mt-14 w-full border-t-2 border-[#b45309]" />
      <p className="mt-1 text-sm font-medium text-[#0f172a]">( {placeholder} )</p>
      <p className="mt-3 text-xs text-[#475569]">Tanggal: ____________________</p>
    </div>
  );
}

/**
 * Jalur persetujuan Laporan RAB, urutan mengikat sesuai tata kelola yayasan:
 * Disusun Oleh (Kepala Sekolah) → Ditinjau Oleh (Penanggung Jawab Cabang) →
 * Disetujui Oleh (Ketua Yayasan) → Disahkan Oleh (Pembina). Satu sumber
 * kebenaran untuk urutan & pasangan peran/jabatan yang dirender oleh
 * {@link ReportSignatures}.
 */
const SIGNATURE_BLOCKS: SignatureBlockProps[] = [
  { role: "Disusun Oleh", placeholder: "Kepala Sekolah" },
  { role: "Ditinjau Oleh", placeholder: "Penanggung Jawab Cabang" },
  { role: "Disetujui Oleh", placeholder: "Ketua Yayasan" },
  { role: "Disahkan Oleh", placeholder: "Pembina" },
];

/**
 * Blok tanda tangan Laporan RAB: empat kotak berurutan ({@link SIGNATURE_BLOCKS})
 * yang tetap utuh dalam satu halaman saat dicetak (`report-keep`) dan tersusun
 * dalam grid dua kolom di layar sempit, empat kolom di layar lebar. Tidak
 * menerima props — data organisasi/pejabat tidak diambil dari sini; setiap
 * kotak tetap kosong untuk ditandatangani manual.
 */
export function ReportSignatures() {
  return (
    <div className="report-keep grid grid-cols-2 gap-8 px-8 py-8 sm:grid-cols-4">
      {SIGNATURE_BLOCKS.map((block) => (
        <SignatureBlock key={block.role} role={block.role} placeholder={block.placeholder} />
      ))}
    </div>
  );
}
