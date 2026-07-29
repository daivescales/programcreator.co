export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "Do I need a big following?",
        answer:
          "No. Trust and engagement matter far more than follower count. A smaller audience that actually listens usually outperforms a large one that scrolls past. We work out fit on the call.",
      },
      {
        question: "What counts as an engaged audience?",
        answer:
          "People who reply, comment, DM, and show up consistently. If they already ask what you're selling or where to buy from you, that's a strong signal — size alone isn't.",
      },
      {
        question: "Are existing brands a fit, not just creators?",
        answer:
          "Yes. Brands with an audience and no clear product ladder — or personal brands that have outgrown sponsorships — are a strong fit.",
      },
      {
        question: "What if I don't know what to build?",
        answer:
          "That's normal. Most people guess wrong about what their audience will buy. Figuring that out is part of the first conversation, not something you need sorted before you apply.",
      },
      {
        question: "What happens after I apply?",
        answer:
          "You'll book a call with me directly. We go through your answers, and I tell you what I'd build and whether it's worth building. If it's not a fit, I'll say so on the call.",
      },
    ],
  },
  {
    title: "The Work",
    items: [
      {
        question: "What do you do, and what do I do?",
        answer:
          "I build the product and the systems behind it. You stay involved on identity, taste, and your relationship with your audience — the parts only you can do.",
      },
      {
        question: "How involved do I need to be?",
        answer:
          "Enough to make the decisions that need your voice and to show up for launch content. I lead the build, but this isn't fully hands-off — that's how products end up generic.",
      },
      {
        question: "How long does it take?",
        answer:
          "Digital products and communities move fastest. Physical apparel takes longer because of sampling and production. We agree a real timeline on the call, not a fantasy one.",
      },
      {
        question: "What platforms do you build on?",
        answer:
          "Whatever fits the product and your audience — storefronts, delivery platforms, community tools, and fulfilment partners as needed. We choose based on the build, not a fixed stack.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We look at what actually converted, fix what didn't, and expand what did. Exact ongoing support is scoped in the written agreement for your engagement.",
      },
    ],
  },
  {
    title: "Money & Terms",
    items: [
      {
        question: "What does it cost?",
        answer:
          "It depends on what we're building and how much I'm handling. The application asks what you're able to invest so the call is useful for both of us. Nothing is charged to apply.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Sometimes, depending on the build and the arrangement. Payment structure is discussed on the call and agreed in writing before any work begins.",
      },
      {
        question: "Do you take equity or a revenue share?",
        answer:
          "Structure is agreed before anything starts. You keep ownership of your brand and your audience. Specific commercial terms are set out in a separate written agreement.",
      },
      {
        question: "Who owns what we build?",
        answer:
          "You do. The brand, the audience, and the assets are yours. Ownership and deliverables are defined in writing before work starts.",
      },
      {
        question: "Are there guarantees? What if the call isn't a fit?",
        answer:
          "No income outcome is guaranteed — results depend on your audience, market, and effort. If the call isn't a fit, I'll tell you straight rather than sell you something that won't work. Client terms are always agreed in writing before work begins.",
      },
    ],
  },
];
