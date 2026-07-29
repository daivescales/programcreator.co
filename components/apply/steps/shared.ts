import { cn } from "@/lib/utils";

export const inputClass = cn(
  "w-full border-0 border-b-2 border-mist-700 bg-transparent py-3 text-2xl text-white",
  "placeholder:text-mist-700 transition-colors duration-200",
  "focus:border-azure-400 focus:outline-none focus-visible:outline-none"
);

export const choiceRowClass = (selected: boolean) =>
  cn(
    "group flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-200",
    selected
      ? "border-azure-400 bg-azure-500/10"
      : "border-white/10 hover:border-azure-400 hover:bg-azure-500/10"
  );

export function letterForIndex(index: number): string {
  return String.fromCharCode(65 + index);
}
