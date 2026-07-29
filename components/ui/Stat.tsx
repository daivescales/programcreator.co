import { cn } from "@/lib/utils";

type StatProps = {
  value: string;
  label: string;
  className?: string;
};

export default function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("text-center md:text-left", className)}>
      <p className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-mist-500">{label}</p>
    </div>
  );
}
