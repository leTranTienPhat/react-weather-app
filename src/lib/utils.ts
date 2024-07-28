import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_FORMAT_LONG } from "@/constants/variables";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (dateString?: string | Date, showDetail: boolean = false) => {
  if (!dateString) return "N/A";
  const dateFormatType = showDetail ? DEFAULT_DATE_FORMAT_LONG : DEFAULT_DATE_FORMAT;
  return format(new Date(dateString), dateFormatType);
};
