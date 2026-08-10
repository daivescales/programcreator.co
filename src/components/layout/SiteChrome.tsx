"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MINIMAL = ["/apply", "/book"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const minimal = MINIMAL.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-pc-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      {!minimal && <Navbar />}
      <main id="main-content" className={minimal ? undefined : "pt-[72px]"}>
        {children}
      </main>
      {!minimal && <Footer />}
    </>
  );
}
