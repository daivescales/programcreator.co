"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LenisApi = {
  stop: () => void;
  start: () => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; immediate?: boolean; offset?: number }
  ) => void;
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisApi>({
  stop: () => undefined,
  start: () => undefined,
  scrollTo: () => undefined,
  lenis: null,
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let gsap: typeof import("gsap").default | null = null;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null =
      null;

    const setup = async () => {
      gsap = (await import("gsap")).default;
      const stMod = await import("gsap/ScrollTrigger");
      ScrollTrigger = stMod.ScrollTrigger;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.09,
        autoRaf: false,
        smoothWheel: true,
        respectReducedMotion: true,
      });

      if (cancelled) {
        lenis.destroy();
        lenis = null;
        return;
      }

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    };

    void setup();

    return () => {
      cancelled = true;
      if (gsap && tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      lenisRef.current = null;
      ScrollTrigger?.refresh();
    };
  }, [reduced]);

  const api = useMemo<LenisApi>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
      scrollTo: (target, options) => {
        lenisRef.current?.scrollTo(target, options);
      },
      get lenis() {
        return lenisRef.current;
      },
    }),
    []
  );

  return (
    <LenisContext.Provider value={api}>{children}</LenisContext.Provider>
  );
}
