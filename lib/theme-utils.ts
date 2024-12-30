// lib/theme-utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const themeColors = {
    dark: {
        background: "bg-black-100",
        text: "text-white",
        border: "border-white/10",
        accent: "text-purple",
        secondary: "text-white-100",
        surface: "bg-[#13162D]",
        hover: "hover:bg-white/10",
    },
    light: {
        background: "bg-white",
        text: "text-black",
        border: "border-black/10",
        accent: "text-purple-600",
        secondary: "text-gray-600",
        surface: "bg-gray-50",
        hover: "hover:bg-black/5",
    }
} as const;