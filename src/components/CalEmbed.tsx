"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CalEmbedProps = {
  name?: string;
  email?: string;
  className?: string;
};

export default function CalEmbed({ name, email, className }: CalEmbedProps) {
  const [ready, setReady] = useState(false);
  const calLink = (
    process.env.NEXT_PUBLIC_CAL_LINK ||
    process.env.NEXT_PUBLIC_CALCOM_LINK ||
    site.calLink
  ).replace(/^https?:\/\/(www\.)?cal\.com\//, "");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: "pc" });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#3E8EF7" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const calUrl = `https://cal.com/${calLink}`;

  return (
    <div className={cn("relative min-h-[560px] w-full", className)}>
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse rounded-xl bg-pc-surface"
          aria-hidden
        />
      )}
      <Cal
        namespace="pc"
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: 560, overflow: "scroll" }}
        config={{
          layout: "month_view",
          theme: "light",
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
        }}
      />
      <p className="mt-3 text-center text-sm text-pc-muted">
        Embed blocked?{" "}
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pc-blue underline-offset-2 hover:underline"
        >
          Open Cal.com directly
        </a>
      </p>
    </div>
  );
}
