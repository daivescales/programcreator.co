import Marquee from "@/components/ui/Marquee";

const items = [
  "CLOTHING BRANDS",
  "DIGITAL PRODUCTS",
  "PAID COMMUNITIES",
  "LAUNCH STRATEGY",
  "STOREFRONT BUILDS",
  "OFFER POSITIONING",
  "FULFILLMENT SETUP",
  "AUDIENCE MONETIZATION",
];

export default function TrustStrip() {
  return (
    <section className="border-y border-white/8 bg-navy-950 py-5">
      <Marquee>
        {items.map((item) => (
          <span
            key={item}
            className="mx-6 inline-flex items-center gap-6 text-sm uppercase tracking-widest text-mist-500"
          >
            <span className="text-azure-400" aria-hidden>
              ◆
            </span>
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
