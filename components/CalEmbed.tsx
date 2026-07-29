"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";

type CalEmbedProps = {
  calLink: string;
};

type CalComponentProps = {
  calLink: string;
  style?: CSSProperties;
  config?: Record<string, string>;
};

function normalizeCalLink(link: string): string {
  if (!link) return "";
  return link
    .replace(/^https?:\/\/(www\.)?cal\.com\//, "")
    .replace(/\/$/, "")
    .replace(/\?.*$/, "");
}

function toIframeSrc(link: string): string {
  if (!link) return "";
  if (link.startsWith("http")) {
    return `${link.includes("?") ? `${link}&` : `${link}?`}embed=true`;
  }
  return `https://cal.com/${normalizeCalLink(link)}?embed=true`;
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  const [useIframe, setUseIframe] = useState(false);
  const [CalComponent, setCalComponent] = useState<ComponentType<CalComponentProps> | null>(
    null
  );

  const normalized = normalizeCalLink(calLink);
  const iframeSrc = toIframeSrc(calLink);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const mod = await import("@calcom/embed-react");
        if (cancelled) return;

        setCalComponent(() => mod.default);

        const cal = await mod.getCalApi();
        if (cancelled) return;

        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#2B5CE6" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
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
      <div className="flex min-h-[720px] items-center justify-center bg-navy-900 p-8 text-center">
        <p className="text-sm text-mist-300">
          Booking calendar will appear here once{" "}
          <code className="font-medium text-mist-100">NEXT_PUBLIC_CALCOM_LINK</code>{" "}
          is set in your environment.
        </p>
      </div>
    );
  }

  if (useIframe) {
    return (
      <iframe
        src={iframeSrc}
        title="Book an intro call"
        className="w-full border-0"
        style={{ minHeight: 720, height: 720 }}
        loading="lazy"
      />
    );
  }

  if (!CalComponent) {
    return (
      <div className="flex min-h-[720px] items-center justify-center bg-navy-900 p-8">
        <p className="text-sm text-mist-500">Loading calendar...</p>
      </div>
    );
  }

  return (
    <CalComponent
      calLink={normalized}
      style={{ width: "100%", height: "100%", minHeight: 720, overflow: "scroll" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
