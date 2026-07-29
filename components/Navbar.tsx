"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          <span className="text-white">Program</span>
          <span className="text-sky-500">Creator</span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/apply">Apply</Button>
        </div>

        <button
          type="button"
          className="p-2 text-white sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-base sm:hidden">
          <div className="flex h-16 items-center justify-between border-b border-line px-6">
            <Link href="/" className="text-base font-semibold tracking-tight">
              <span className="text-white">Program</span>
              <span className="text-sky-500">Creator</span>
            </Link>
            <button
              type="button"
              className="p-2 text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 px-6 py-16 text-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/apply" className="w-full max-w-xs">
              Apply
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
