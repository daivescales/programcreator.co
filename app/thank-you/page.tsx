import { Check } from "lucide-react";
import CalEmbed from "@/components/CalEmbed";
import Container from "@/components/ui/Container";

export default function ThankYouPage() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || "";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "daive@programcreator.com";

  return (
    <section className="bg-base px-6 py-20 text-center md:py-28">
      <Container>
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-sky-500/40 text-sky-500">
          <Check size={22} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          You&apos;re in.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          Thanks for applying. Pick a time below and we&apos;ll go through your
          answers together — I&apos;ll tell you exactly what I&apos;d build for
          your audience, and whether it&apos;s worth building. — Daive
        </p>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-line">
          <CalEmbed calLink={calLink} />
        </div>

        <p className="mt-6 text-sm text-text-faint">
          Can&apos;t find a time? Email{" "}
          <a href={`mailto:${contactEmail}`} className="text-sky-500 hover:text-sky-400">
            {contactEmail}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
