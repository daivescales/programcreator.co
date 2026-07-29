"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MinimalHeader from "./MinimalHeader";
import ScrollToTop from "./ScrollToTop";

const MINIMAL = ["/apply", "/thank-you"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const minimal = MINIMAL.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-base"
      >
        Skip to content
      </a>
      <ScrollToTop />
      {minimal ? <MinimalHeader /> : <Navbar />}
      <main id="main-content">{children}</main>
      {!minimal && <Footer />}
    </>
  );
}
