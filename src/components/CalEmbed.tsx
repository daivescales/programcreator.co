"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type CalBookingSuccessPayload = {
  email?: string;
  bookedAt?: string;
  bookingRef?: string;
};

type CalEmbedProps = {
  name?: string;
  email?: string;
  className?: string;
  onBookingSuccess?: (payload: CalBookingSuccessPayload) => void;
};

function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return undefined;
}

function parseBookingEvent(event: unknown): CalBookingSuccessPayload {
  const root = (event ?? {}) as Record<string, unknown>;
  const detail = (root.detail ?? root.data ?? root) as Record<string, unknown>;
  const booking = (detail.booking ?? detail.data ?? detail) as Record<
    string,
    unknown
  >;

  const attendees = booking.attendees as
    | Array<Record<string, unknown>>
    | undefined;

  const email = pickString(
    attendees?.[0]?.email,
    booking.email,
    detail.email,
    root.email
  );

  const bookedAt = pickString(
    booking.startTime,
    booking.start,
    detail.startTime,
    detail.start,
    root.startTime
  );

  const bookingRef = pickString(
    booking.uid,
    booking.id,
    detail.uid,
    detail.id,
    root.uid
  );

  return { email, bookedAt, bookingRef };
}

export default function CalEmbed({
  name,
  email,
  className,
  onBookingSuccess,
}: CalEmbedProps) {
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
        theme: "dark",
        styles: { branding: { brandColor: "#4D9BFF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      if (onBookingSuccess) {
        cal("on", {
          action: "bookingSuccessful",
          callback: (e: unknown) => {
            onBookingSuccess(parseBookingEvent(e));
          },
        });
      }

      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [onBookingSuccess]);

  const calUrl = `https://cal.com/${calLink}`;

  return (
    <div className={cn("relative min-h-[560px] w-full", className)}>
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse rounded-panel bg-navy-750"
          aria-hidden
        />
      )}
      <Cal
        namespace="pc"
        calLink={calLink}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 560,
          overflow: "scroll",
        }}
        config={{
          layout: "month_view",
          theme: "dark",
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
        }}
      />
      <p className="mt-3 text-center text-sm text-pc-text">
        Embed blocked?{" "}
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          Open Cal.com directly
        </a>
      </p>
    </div>
  );
}
