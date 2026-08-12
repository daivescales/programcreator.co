import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Legal",
  description: `Legal documents for ${site.name}: Terms, Privacy, Cookies, and Results Disclaimer.`,
};

const docs = [
  {
    href: "/terms",
    index: "01",
    label: "Terms of Service",
    meta: "How engagements work, fees, ownership, and what happens when payment stops.",
  },
  {
    href: "/privacy",
    index: "02",
    label: "Privacy Policy",
    meta: "What I collect from applications, why, and how long I keep it.",
  },
  {
    href: "/cookies",
    index: "03",
    label: "Cookie Policy",
    meta: "What this site stores in your browser, and what it does not.",
  },
  {
    href: "/disclaimer",
    index: "04",
    label: "Results and Earnings Disclaimer",
    meta: "No guaranteed outcomes. Past figures are examples, not predictions.",
  },
] as const;

export default function LegalIndexPage() {
  return (
    <LegalLayout title="Legal" currentPath="/legal">
      <div className="border-t border-pc-line">
        {docs.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="group grid grid-cols-[auto_1fr] gap-4 border-b border-pc-line py-7 transition-colors duration-[180ms] md:grid-cols-[auto_1fr_1.2fr] md:gap-8"
          >
            <span className="text-[13px] text-accent">{doc.index}</span>
            <span className="text-[17px] font-medium tracking-[-0.02em] text-pc-white transition-colors duration-[180ms] group-hover:text-accent">
              {doc.label}
            </span>
            <span className="col-span-2 max-w-[46ch] text-[15px] leading-relaxed text-pc-muted md:col-span-1">
              {doc.meta}
            </span>
          </Link>
        ))}
      </div>
    </LegalLayout>
  );
}
