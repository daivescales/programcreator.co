import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const items = [
  {
    question: "Do I need a big following?",
    answer:
      "No. Trust and engagement matter far more than follower count. A small audience that listens outsells a large one that scrolls past.",
  },
  {
    question: "Does this only work for online creators?",
    answer:
      "No. It works for anyone with an audience, including local and in-person businesses. The product just looks different — bookings and repeat customers instead of a digital checkout.",
  },
  {
    question: "What do you do, and what do I do?",
    answer:
      "I build the product and the systems behind it. You stay involved on identity, taste, and your relationship with your audience — the parts only you can do.",
  },
  {
    question: "How long does it take?",
    answer:
      "Software and digital products move fastest. Physical products take longer because of sampling and production. We agree a real timeline on the call.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on what we're building and how much I'm handling. The application asks what you're able to invest so the call is useful for both of us.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "No. All fees are non-refundable, because work, time, and third-party costs are committed from day one. Everything is agreed in writing before anything starts, so there are no surprises.",
  },
  {
    question: "Who owns what we build?",
    answer:
      "You do. The brand, the audience, and the assets are yours. Terms are agreed in writing before work begins.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "You'll be taken straight to my calendar to book a call with me. If it's not a fit, I'll tell you on the call rather than sell you something that won't work.",
  },
];

export default function FAQPreview() {
  return (
    <Section variant="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="The things people ask first."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={items} />
          </div>
          <div className="mt-8">
            <Link
              href="/faq"
              className="text-sm text-text-muted underline-offset-4 hover:text-sky-500 hover:underline"
            >
              Read all questions
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
