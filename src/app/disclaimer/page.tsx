import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Results and Earnings Disclaimer",
  description: `Results and earnings disclaimer for ${site.name}.`,
};

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Results and Earnings Disclaimer"
      currentPath="/disclaimer"
    >
      <LegalSection number="01" title="No guarantee of earnings">
        <p>
          Nothing on this site is a promise or guarantee of income, revenue,
          sales or business results.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Results shown are examples">
        <p>
          Any figures, case studies, testimonials or results shown are examples
          of what specific past clients achieved. They are not typical, not
          average and not a prediction of your outcome.
        </p>
      </LegalSection>

      <LegalSection number="03" title="What outcomes depend on">
        <p>
          Your audience, your offer, your pricing, your market, your
          consistency, your existing traffic, and factors outside anyone&apos;s
          control.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Your responsibility">
        <p>
          You are responsible for your own business decisions, your own claims
          to your own customers, your pricing, your tax and your legal
          compliance.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Not professional advice">
        <p>
          Nothing here is legal, financial, tax or investment advice.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Forward looking statements">
        <p>
          Any statements about potential outcomes are opinion, not fact.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Contact">
        <p>
          Questions:{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
