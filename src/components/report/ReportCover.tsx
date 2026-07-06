import { ORG_TYPE_LABEL } from "@/lib/utils";
import type { OrgType } from "@/lib/types";

interface ReportCoverProps {
  orgName: string;
  city: string | null;
  orgType: OrgType;
  budgetYear: string;
}

const YAYASAN_NAME = "YAYASAN PENYELENGGARAAN ILAHI INDONESIA (YPII)";

export function ReportCover({ orgName, city, orgType, budgetYear }: ReportCoverProps) {
  return (
    <div className="report-keep border-b-2 border-[#b45309] bg-gradient-to-br from-[#0f766e] to-[#134e4a] px-8 py-8 text-white">
      <p className="text-xs font-medium uppercase tracking-widest text-teal-100">
        {YAYASAN_NAME}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">
        RENCANA ANGGARAN BIAYA (RAB)
      </h1>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">{orgName}</p>
          {city && <p className="text-sm text-teal-100">{city}</p>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {ORG_TYPE_LABEL[orgType] ?? orgType}
          </span>
          <span className="text-sm font-medium text-teal-100">
            Tahun Anggaran {budgetYear}
          </span>
        </div>
      </div>
    </div>
  );
}
