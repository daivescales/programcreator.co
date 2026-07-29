"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";

export default function CalEmbed({ calLink }: { calLink: string }) {
  const [useIframe, setUseIframe] = useState(false);
  const [Cal, setCal] = useState<ComponentType<{
    calLink: string;
    style?: CSSProperties;
    config?: Record<string, string>;
  }> | null>(null);

  const normalized = calLink
    .replace(/^https?:\/\/(www\.)?cal\.com\//, "")
    .replace(/\/$/, "")
    .replace(/\?.*$/, "");

  const iframeSrc = calLink
    ? `${calLink.includes("?") ? `${calLink}&` : `${calLink}?`}embed=true`
    : "";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const mod = await import("@calcom/embed-react");
        if (!cancelled) {
          setCal(() => mod.default);
          try {
            const cal = await mod.getCalApi();
            cal("ui", {
              theme: "dark",
              styles: { branding: { brandColor: "#6BA8FF" } },
              hideEventTypeDetails: false,
            });
          } catch {
            // UI config is optional
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setUseIframe(true);
      }
    }
    if (normalized) load();
    else setUseIframe(true);
    return () => {
      cancelled = true;
    };
  }, [normalized]);

  if (!calLink) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-surface p-8 text-center text-sm text-text-muted">
        Booking calendar appears here once NEXT_PUBLIC_CALCOM_LINK is set.
      </div>
    );
  }

  if (useIframe) {
    return (
      <iframe
        src={iframeSrc}
        title="Book a call with Daive"
        className="w-full border-0"
        style={{ minHeight: 700, height: 700 }}
        loading="lazy"
      />
    );
  }

  if (!Cal) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-text-faint">
        Loading calendar…
      </div>
    );
  }

  return (
    <Cal
      calLink={normalized}
      style={{ width: "100%", height: "100%", minHeight: 700, overflow: "scroll" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
