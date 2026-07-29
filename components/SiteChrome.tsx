"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./PageTransition";
import MinimalHeader from "./MinimalHeader";

const MINIMAL_ROUTES = ["/apply", "/thank-you"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const minimal = MINIMAL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-azure-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      {minimal ? <MinimalHeader /> : <Navbar />}
      <PageTransition disabled={minimal}>
        <div id="main-content">{children}</div>
      </PageTransition>
      {!minimal && <Footer />}
      <CookieBanner />
    </>
  );
}
