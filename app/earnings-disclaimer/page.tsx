// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Earnings Disclaimer",
  description:
    "ProgramCreator makes no income guarantees. Any figures shown are examples, not typical results.",
};

const toc = [
  { id: "no-guarantees", label: "No income guarantees" },
  { id: "results-vary", label: "Results depend on many factors" },
  { id: "examples", label: "Examples are not typical" },
  { id: "forward-looking", label: "Forward-looking statements" },
  { id: "business-risk", label: "Business risk acknowledgment" },
  { id: "no-financial-advice", label: "No professional financial advice" },
  { id: "your-responsibility", label: "Your responsibility" },
  { id: "contact", label: "Contact" },
];

export default function EarningsDisclaimerPage() {
  return (
    <LegalLayout title="Earnings Disclaimer" lastUpdated="[DATE]" toc={toc}>
      <h2 id="no-guarantees">No income guarantees or projections</h2>
      <p>
        [BUSINESS LEGAL NAME] (&quot;ProgramCreator,&quot; &quot;we,&quot; &quot;us,&quot;
        or &quot;our&quot;) makes <strong className="text-mist-100">no guarantees</strong>{" "}
        regarding income, revenue, profit, audience growth, sales volume, or any other
        financial or business outcome. Nothing on programcreator.com, in our application
        materials, on intro calls, or in marketing communications should be interpreted
        as a promise, projection, or assurance that you will earn money or achieve any
        specific result.
      </p>
      <p>
        We expressly disclaim any representation that working with us will produce
        earnings comparable to any example discussed, displayed, or implied.
      </p>

      <h2 id="results-vary">Results depend on many factors</h2>
      <p>
        Outcomes vary dramatically based on factors largely outside our control,
        including but not limited to:
      </p>
      <ul>
        <li>The size, engagement, and purchasing behavior of your audience</li>
        <li>Your market niche, competition, and timing</li>
        <li>Your effort, consistency, and follow-through</li>
        <li>Product-market fit, pricing, positioning, and offer quality</li>
        <li>Platform algorithm changes, advertising costs, and economic conditions</li>
        <li>Capital, team capacity, and operational execution</li>
      </ul>
      <p>
        Two creators in similar niches can see entirely different results. There is no
        reliable way to predict what you will earn.
      </p>

      <h2 id="examples">Any figures shown are examples — not typical results</h2>
      <p>
        If the Site, a call, or any materials reference revenue figures, growth metrics,
        case studies, or hypothetical scenarios, those are{" "}
        <strong className="text-mist-100">illustrative examples only</strong>. They are{" "}
        <strong className="text-mist-100">not typical results</strong> and are not
        intended as a representation of what an average client or visitor can expect.
        Many people who explore product businesses earn little or nothing. Some lose
        money. Exceptional outcomes, if any, are outliers.
      </p>

      <h2 id="forward-looking">Forward-looking statements</h2>
      <p>
        Any statements about potential opportunities, timelines, or future performance
        are forward-looking and inherently uncertain. Actual results may differ
        materially. You should not place undue reliance on forward-looking statements.
      </p>

      <h2 id="business-risk">Business risk acknowledgment</h2>
      <p>
        Building a product business involves substantial risk. You may invest time and
        money without recovering those investments. Inventory, software, advertising,
        contractors, and opportunity costs can result in losses. By engaging with our
        Site or services, you acknowledge that you understand these risks and that you
        alone are responsible for deciding whether to proceed.
      </p>

      <h2 id="no-financial-advice">No professional financial advice</h2>
      <p>
        Nothing we publish or say constitutes financial, investment, tax, or legal
        advice. Consult qualified professionals licensed in [JURISDICTION] (or your
        applicable jurisdiction) before making financial or business decisions.
      </p>

      <h2 id="your-responsibility">Your responsibility for your own business decisions</h2>
      <p>
        You are solely responsible for your business decisions, including whether to
        apply, book a call, enter an engagement, launch a product, spend money, or
        change strategy. ProgramCreator is not liable for decisions you make based on
        Site content, conversations, or opinions shared during exploratory discussions.
        See also our <a href="/disclaimer">Disclaimer</a> and{" "}
        <a href="/terms">Terms of Service</a>.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this earnings disclaimer:
      </p>
      <p>
        [BUSINESS LEGAL NAME]
        <br />
        [BUSINESS ADDRESS]
        <br />
        Email: [CONTACT EMAIL]
        <br />
        [JURISDICTION]
      </p>
    </LegalLayout>
  );
}
