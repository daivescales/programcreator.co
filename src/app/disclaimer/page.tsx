import type { Metadata } from "next";
import LegalLayout, {
  ContactEmail,
  LegalSection,
} from "@/components/legal/LegalLayout";
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
          Nothing on this site is a promise of income, revenue, sales or
          business results.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Results shown are examples">
        <p>
          Any figures, case studies or testimonials are what specific past
          clients achieved. They are not typical, not average and not a
          prediction of your outcome.
        </p>
      </LegalSection>

      <LegalSection number="03" title="What outcomes depend on">
        <p>
          Your audience, offer, pricing, market, consistency, existing traffic,
          and factors outside anyone&apos;s control.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Costs beyond my fee">
        <p>
          A revenue split covers my time. Advertising, tooling, platform fees
          and product costs remain yours, and results generally depend on being
          able to fund those.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Your responsibility">
        <p>
          Your own business decisions, your claims to your customers, your
          pricing, tax and legal compliance.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Not professional advice">
        <p>
          Nothing here is legal, financial, tax or investment advice.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Contact">
        <p>
          Questions: <ContactEmail />.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
