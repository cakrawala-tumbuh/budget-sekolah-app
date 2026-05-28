import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return IDR.format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

export const ORG_TYPE_LABEL: Record<string, string> = {
  UNIT: "Unit",
  CABANG: "Cabang",
  PUSAT: "Pusat",
};

export const ORG_TYPE_COLOR: Record<string, string> = {
  UNIT: "bg-blue-100 text-blue-800",
  CABANG: "bg-amber-100 text-amber-800",
  PUSAT: "bg-green-100 text-green-800",
};
