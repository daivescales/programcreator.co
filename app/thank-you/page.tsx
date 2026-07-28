import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import CalEmbed from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "Book Your Intro Call",
  description:
    "Thanks for applying to ProgramCreator. Book a short intro call to go over your answers and see what makes sense to build.",
};

export default function ThankYouPage() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || "";

  return (
    <Section className="!pt-20 sm:!pt-28 !pb-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            You&apos;re In. Let&apos;s Get You On The Calendar.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-800 sm:text-lg">
            Thanks for applying. Pick a time below for a short intro call —
            we&apos;ll go over your answers and see what makes the most sense to
            build.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-md border border-gray-200">
          <CalEmbed calLink={calLink} />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Can&apos;t find a time that works? Email [YOUR EMAIL].
        </p>
      </Container>
    </Section>
  );
}
