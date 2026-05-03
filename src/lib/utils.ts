import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Date not available";
  }
  return format(date, "MMM d, yyyy");
}
