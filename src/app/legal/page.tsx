import type { Metadata } from "next";
import IndexRow from "@/components/motion/IndexRow";
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
          <IndexRow
            key={doc.href}
            href={doc.href}
            index={doc.index}
            label={doc.label}
            meta={doc.meta}
          />
        ))}
      </div>
    </LegalLayout>
  );
}
