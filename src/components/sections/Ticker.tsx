import { Marquee } from "@/components/motion";

const PHRASES = [
  "Digital products",
  "Storefront rebuilds",
  "Offer positioning",
  "Sales pages",
  "Revenue split partnerships",
  "Clothing brands",
  "Conversion design",
] as const;

function PhraseTrack() {
  return (
    <>
      {PHRASES.map((phrase) => (
        <span key={phrase} className="inline-flex items-center gap-8">
          <span className="whitespace-nowrap text-[13px] uppercase tracking-[0.18em] text-pc-muted">
            {phrase}
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rotate-45 bg-accent"
          />
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="border-y border-pc-line bg-navy-900 py-5">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <Marquee className="gap-8" pauseOnHover>
          <PhraseTrack />
        </Marquee>
      </div>
    </div>
  );
}
