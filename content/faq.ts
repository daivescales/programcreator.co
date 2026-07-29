export type FAQItem = { question: string; answer: string };
export type FAQCategory = { id: string; title: string; items: FAQItem[] };

export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        question: "Do I need a huge following to work with you?",
        answer:
          "No. Engagement and trust matter more than raw follower counts. A smaller audience that actually listens and buys will outperform a large one that scrolls past. On the intro call we look at how your audience responds today — not vanity metrics — to decide whether a product business makes sense.",
      },
      {
        question: 'What counts as an "engaged" audience?',
        answer:
          "An engaged audience is one that responds when you ask them to: comments, DMs, saves, clicks, and especially purchases or waitlist signups when you float an idea. If people already ask you for recommendations, products, or advice, that is a strong signal. We evaluate engagement quality on the call using your real content and conversion history, not a fixed follower threshold.",
      },
      {
        question:
          "I have a brand but not a personal following. Am I a fit?",
        answer:
          "Yes, if the brand already has an audience that trusts it — email list, social presence, community, or storefront traffic — and you want a clearer product ladder or a stronger offer. Personal creators and brand owners are both in scope. What matters is that there is demand to build against, not that the face of the brand is a personal profile.",
      },
      {
        question: "What if I don't know what I want to build?",
        answer:
          "That is normal, and it is often the first thing we solve. Most people guess wrong about what their audience will pay for. The intro call and early audit are designed to match the product to the audience — clothing, an info product, a community, or something else — before we commit to a build.",
      },
      {
        question: "How do I apply and what happens after?",
        answer:
          "You submit a short application covering your brand, audience, and goals. If it looks promising, you get access to book an intro call with me directly. On that call we review fit and direction; if it is not a fit, I will say so rather than push a project that will not work. There is no payment required to apply.",
      },
    ],
  },
  {
    id: "the-work",
    title: "The Work",
    items: [
      {
        question: "What exactly do you build versus what I handle?",
        answer:
          "I lead the product build and the systems around it — positioning, offer structure, storefront or platform setup, production partners where needed, and launch readiness. You stay responsible for identity, taste, audience relationship, and content. By the end you should understand every part of the business because you were involved in the decisions that shaped it.",
      },
      {
        question: "How involved do I need to be?",
        answer:
          "This is done-with-you, not done-while-you-disappear. Expect regular input on brand direction, offers, creative approvals, and launch messaging. The exact cadence depends on the product, but you should plan to be reachable and decisive throughout the build. Partners who treat it as fully passive are not a fit.",
      },
      {
        question: "How long does a typical build take?",
        answer:
          "It depends on what we are building. Digital products and communities generally move faster; physical apparel takes longer because of sampling, production, and fulfillment setup. We set a realistic timeline on the call once scope is clear — not a marketing timeline that ignores production reality.",
      },
      {
        question: "Do you build the physical products yourself?",
        answer:
          "No. For clothing and merch I handle brand direction, product strategy, and setup with production and fulfillment partners. I do not manufacture goods in-house. You keep ownership of the brand relationship with those partners as agreed in writing before work starts.",
      },
      {
        question: "What platforms do you build on?",
        answer:
          "Platform choice follows the product and your audience, not a single default stack. That can include ecommerce storefronts, course or digital delivery tools, community platforms, and the checkout and email tools needed to sell and retain. We pick tools that fit the offer and that you can operate after launch.",
      },
      {
        question: "Do you handle the content and marketing too?",
        answer:
          "I support launch strategy, messaging, and the systems that make a launch work. Day-to-day content and the ongoing relationship with your audience remain yours — that is where your trust lives. If deeper marketing support becomes part of a specific engagement, it is scoped and agreed in writing first.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You leave with a live product and the systems to operate it. Post-launch support is scoped per engagement — some partnerships include a defined handoff and stabilization period; ongoing retainers are separate conversations. The goal is a real asset you own and can run, not indefinite dependence on me.",
      },
    ],
  },
  {
    id: "money-terms",
    title: "Money & Terms",
    items: [
      {
        question: "What does it cost to work with you?",
        answer:
          "Investment varies by product type, scope, and how much of the build I am leading. There is no published price list because a merch brand, a course, and a community are not the same project. Commercial terms are discussed on the call and agreed in writing before any work begins. Applying does not create a financial commitment.",
      },
      {
        question: "Why do you ask about investment on the application?",
        answer:
          "So we do not waste each other's time. If the budget available cannot support the kind of build you want, it is better to know before a call. The question is a filter for seriousness and fit, not a quote. Final numbers are only set after scope is clear and terms are agreed in writing.",
      },
      {
        question: "Do you take equity or a revenue share?",
        answer:
          "Deal structure depends on the engagement and is agreed before work starts. Some partnerships are fee-based; others may involve different commercial arrangements when that makes sense for both sides. Nothing is assumed from a call alone. Brand and audience ownership stay with you unless a written agreement says otherwise.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Sometimes, when the scope and timeline support it. Payment structure is part of the commercial conversation and is documented before work begins. There is no blanket plan that applies to every project. If a plan is offered, the terms will be explicit in writing.",
      },
      {
        question: "Who owns the brand and the assets we build?",
        answer:
          "You own your brand and audience. Ownership of deliverables, accounts, and IP created during the engagement is defined in the written agreement before work starts. The default intent is that you leave with a business asset you control. Exact terms are confirmed in writing — not assumed from a marketing page.",
      },
      {
        question: "Do you offer refunds or guarantees?",
        answer:
          "I do not guarantee income, sales, or specific results. Product businesses depend on your audience, your participation, and execution after launch. Refund and cancellation terms, if any, are set in the written agreement for that engagement. If we are not a fit, the right outcome is to say no before work starts — not to sell a guarantee that cannot be kept.",
      },
    ],
  },
  {
    id: "fit-logistics",
    title: "Fit & Logistics",
    items: [
      {
        question: "Do you work with creators outside the US?",
        answer:
          "Often yes, when collaboration across time zones is practical and the product can be built and fulfilled for your market. Physical products introduce more logistics complexity by region; digital products and communities are usually simpler. Fit is confirmed on the call based on your location, audience, and what we would build.",
      },
      {
        question: "How many clients do you take at once?",
        answer:
          "A small number. Capacity is limited on purpose so the work stays hands-on and the standard stays high. If there is not room for a new build, I will say so rather than overbook. Application volume does not change that constraint.",
      },
      {
        question: "What if we get on the call and it's not a fit?",
        answer:
          "Then we end it there. The intro call exists to evaluate fit honestly — audience, timing, budget, and scope. If it is not a match, I will tell you directly. There is no obligation to move forward after the call, and applying does not create one.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "When there is a legitimate need and the request is reasonable, NDAs can be part of the process before sensitive details are shared. Mutual NDAs are preferred when both sides are disclosing proprietary information. Standard terms are handled case by case before deeper discovery or kickoff.",
      },
      {
        question: "Can I work with you if I already sell something?",
        answer:
          "Yes. Existing products, storefronts, or offers are often a strong starting point — especially when sales are inconsistent, the offer is unclear, or the brand needs a stronger product ladder. We assess what to improve, rebuild, or add based on what your audience already responds to. Prior sales do not disqualify you; they usually give us better data.",
      },
    ],
  },
];
