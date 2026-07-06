interface SignatureBlockProps {
  role: string;
  placeholder: string;
}

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

export function ReportSignatures() {
  return (
    <div className="report-keep grid grid-cols-1 gap-8 px-8 py-8 sm:grid-cols-3">
      <SignatureBlock role="Disusun oleh" placeholder="Kepala Unit / Bendahara" />
      <SignatureBlock role="Diperiksa oleh" placeholder="Kepala Cabang" />
      <SignatureBlock role="Disahkan oleh" placeholder="Pengurus / Pembina Yayasan" />
    </div>
  );
}
