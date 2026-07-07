import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  const env = process.env.NEXT_PUBLIC_APP_URL;
  if (env) {
    try {
      return new URL(env).origin;
    } catch {
      return env;
    }
  }
  return "https://romarick.vercel.app";
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Date not available";
  }
  return format(date, "MMM d, yyyy");
}
