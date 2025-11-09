import { colorCombos } from "@/config/color-config";
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

export const percentToInverseIndex = (val: number, log?: boolean) => {
  const bucket = Math.min(4, Math.floor(val / 20)); // 0–4, cap at 4
  const inverse = 4 - bucket;
  if (log) {
    console.log(`ö percentToInverseIndex - ${val}:`, { bucket });
  }
  // console.log(`ö percentToInverseIndex - ${val} inverse:`, { inverse });
  return inverse; // reverse
};

export const percentToIndex = (val: number, log?: string) => {
  const returnVal = Math.min(4, Math.floor(val / 20));
  if (log) {
    console.log(`ö percentToIndex - ${log} - ${val}:`, { returnVal });
  }
  return returnVal;
};

export const getAvgString = (idx: number, isMagnitude?: boolean) => {
  const strings = !isMagnitude
    ? ["VERY POOR", "POOR", "MEDIUM", "GOOD", "VERY GOOD"]
    : ["VERY LOW", "LOW", "MEDIUM", "HIGH", "VERY HIGH"];
  return strings[idx] || "";
};

export const getTagColorConfig = (tag: string): ColorCombo => {
    const intVal = tag
      .slice(0, 3)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorConfig = colorCombos[intVal % colorCombos.length];
    return colorConfig;
  };