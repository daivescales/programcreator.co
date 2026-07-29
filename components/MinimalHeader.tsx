import Link from "next/link";
import { X } from "lucide-react";

export default function MinimalHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-widest"
        >
          <span className="text-white">PROGRAM</span>
          <span className="text-azure-400">CREATOR</span>
        </Link>
        <Link
          href="/"
          aria-label="Exit"
          className="inline-flex items-center gap-2 text-sm text-mist-500 hover:text-white"
        >
          <span className="hidden sm:inline">Exit</span>
          <X size={18} strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}
