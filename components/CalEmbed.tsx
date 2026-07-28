"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";

type CalEmbedProps = {
  calLink: string;
};

function normalizeCalLink(link: string): string {
  if (!link) return "";
  return link
    .replace(/^https?:\/\/(www\.)?cal\.com\//, "")
    .replace(/\/$/, "")
    .replace(/\?.*$/, "");
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  const [useIframe, setUseIframe] = useState(false);
  const [CalComponent, setCalComponent] = useState<ComponentType<{
    calLink: string;
    style?: CSSProperties;
    config?: Record<string, string>;
  }> | null>(null);

  const normalized = normalizeCalLink(calLink);
  const iframeSrc = calLink
    ? `${calLink.includes("?") ? `${calLink}&` : `${calLink}?`}embed=true`
    : "";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const mod = await import("@calcom/embed-react");
        if (!cancelled) {
          setCalComponent(() => mod.default);
        }
      } catch (err) {
        console.error("Cal.com embed failed to load, falling back to iframe:", err);
        if (!cancelled) setUseIframe(true);
      }
    }

    if (normalized) {
      load();
    } else {
      setUseIframe(true);
    }

    return () => {
      cancelled = true;
    };
  }, [normalized]);

  if (!calLink) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-8 text-center">
        <p className="text-sm text-gray-800">
          Booking calendar will appear here once{" "}
          <code className="font-medium">NEXT_PUBLIC_CALCOM_LINK</code> is set in
          your environment.
        </p>
      </div>
    );
  }

  if (useIframe || !CalComponent) {
    if (useIframe) {
      return (
        <iframe
          src={iframeSrc}
          title="Book an intro call"
          className="w-full border-0"
          style={{ minHeight: 700, height: 700 }}
          loading="lazy"
        />
      );
    }

    return (
      <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-8">
        <p className="text-sm text-gray-600">Loading calendar...</p>
      </div>
    );
  }

  return (
    <CalComponent
      calLink={normalized}
      style={{ width: "100%", height: "100%", minHeight: 700, overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
