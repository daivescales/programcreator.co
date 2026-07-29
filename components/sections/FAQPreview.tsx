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
      "No. Trust and engagement matter far more than follower count; a small audience that listens beats a large one that scrolls past. The call is where we work out whether yours will buy.",
  },
  {
    question: "What do you do, and what do I do?",
    answer:
      "I build the product and the systems behind it. You stay involved on identity, taste, and your relationship with your audience — the parts only you can do.",
  },
  {
    question: "How long does it take?",
    answer:
      "Digital products and communities move fastest. Physical apparel takes longer because of sampling and production. We agree a real timeline on the call.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on what we're building and how much I'm handling. The application asks what you're able to invest so the call is useful for both of us.",
  },
  {
    question: "Who owns what we build?",
    answer:
      "You do. The brand, the audience, and the assets are yours. Terms are agreed in writing before any work starts.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "You'll book a call with me directly. If it's not a fit, I'll tell you on the call rather than sell you something that won't work.",
  },
];

export default function FAQPreview() {
  return (
    <Section variant="base">
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
              className="text-sm text-text-faint underline-offset-4 hover:text-sky-500 hover:underline"
            >
              Read all questions
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
