import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// assign numeric value to first 3 letters of a given string
export const strToNumVal = (str: string) =>
  (str || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 3)
    .split("")
    .reduce((t, c) => t + (c.charCodeAt(0) - 96), 0);
