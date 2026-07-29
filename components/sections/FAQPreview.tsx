import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const faqItems = [
  {
    question: "Do I need a huge following to work with you?",
    answer:
      "No. Engagement and trust matter more than raw numbers; a 15k audience that actually listens outperforms a 500k audience that scrolls past. The call is where we figure out whether your specific audience will buy.",
  },
  {
    question: "What exactly do you do versus what I do?",
    answer:
      "I build the product and the systems. You stay involved on identity, taste, and audience decisions, and you handle the content and the relationship with your audience. You'll understand every part of it by the end because you were in it.",
  },
  {
    question: "How long does a build take?",
    answer:
      "It depends on the product. Digital products and communities move fastest; physical apparel takes longer because of sampling and production. We set a real timeline on the call, not a fantasy one.",
  },
  {
    question: "Do you take equity or a revenue share?",
    answer:
      "Structure is agreed before anything starts and is covered on the call. You keep ownership of your brand and your audience in every arrangement.",
  },
  {
    question: "What does it cost?",
    answer:
      "It varies by what we're building and how much of it I'm handling. The application asks what you're able to invest so we don't waste each other's time on the call.",
  },
  {
    question: "What if I don't know what to build yet?",
    answer:
      "That's normal and it's the first thing we solve. Most people guess wrong about what their audience will buy, which is exactly why step one is the audit.",
  },
  {
    question: "Do you work with brands, not just creators?",
    answer:
      "Yes. Existing brands with an audience and no product ladder are a strong fit, as are personal brands that have outgrown sponsorships.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "You'll answer a set of questions about your brand and audience, then you get access to book a call directly with me. If it's not a fit, I'll tell you on the call instead of selling you something that won't work.",
  },
];

export default function FAQPreview() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            The things everyone asks first.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <Button href="/faq" variant="ghost">
              See all questions
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
