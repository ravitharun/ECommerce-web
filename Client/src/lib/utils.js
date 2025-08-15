import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge class names with Tailwind's conflict resolution
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Check if a string is a valid URL
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
