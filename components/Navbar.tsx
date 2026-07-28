"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
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
    <header className="sticky top-0 z-50 border-b border-black bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-[0.2em] text-black sm:text-base"
        >
          ProgramCreator
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide ${
                pathname === link.href
                  ? "font-medium text-black"
                  : "text-gray-800 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/apply" className="!py-2 !px-5 text-xs">
            Apply
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-black md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-black px-5">
            <Link
              href="/"
              className="font-display text-sm font-bold uppercase tracking-[0.2em]"
              onClick={() => setOpen(false)}
            >
              ProgramCreator
            </Link>
            <button
              type="button"
              className="p-2 text-black"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-5 py-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-3xl font-medium tracking-tight"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/apply" className="mt-4 w-full">
              Apply
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
