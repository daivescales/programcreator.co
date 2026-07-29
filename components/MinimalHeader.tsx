import Link from "next/link";

export default function MinimalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          <span className="text-white">Program</span>
          <span className="text-sky-500">Creator</span>
        </Link>
        <Link href="/" className="text-sm text-text-faint hover:text-white">
          Exit
        </Link>
      </div>
    </header>
  );
}
