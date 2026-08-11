import Link from "next/link";
import { MaskLines } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Spine from "@/components/ui/Spine";

const included = [
  "Content angles that drive traffic",
  "Ongoing conversion iteration",
  "Tracking set up properly",
  "Direct access to me rather than an account manager",
] as const;

function IncludedList() {
  return (
    <ul className="space-y-2.5">
      {included.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-1.5 h-[9px] w-[9px] shrink-0 bg-accent"
          />
          <span className="text-[15px] leading-snug text-pc-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PaidA() {
  return (
    <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold tracking-[-0.03em] text-pc-white">
      Revenue <span className="font-serif-italic text-accent-2">split</span>
    </p>
  );
}

function PaidB() {
  return (
    <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold tracking-[-0.03em] text-pc-white">
      Monthly <span className="font-serif-italic text-pc-white">retainer</span>
    </p>
  );
}

type LaneRow =
  | {
      label: string;
      kind: "text";
      a: string;
      b: string;
    }
  | {
      label: string;
      kind: "paid";
    }
  | {
      label: string;
      kind: "list";
    };

const rows: LaneRow[] = [
  {
    label: "Who it's for",
    kind: "text",
    a: "You have an audience. You do not have a product, or the one you have does not convert.",
    b: "You have inventory and traffic. The site is where the sale is dying.",
  },
  {
    label: "What I build",
    kind: "text",
    a: "Digital product from scratch, sales page, checkout flow, store page rebuild.",
    b: "Full storefront rebuild, product pages, checkout and cart recovery.",
  },
  {
    label: "How I'm paid",
    kind: "paid",
  },
  {
    label: "When I'm paid",
    kind: "text",
    a: "Only when it sells. No deposit, nothing upfront.",
    b: "Flat monthly fee, billed in advance.",
  },
  {
    label: "Why it works this way",
    kind: "text",
    a: "If it does not sell, I do not get paid. That is exactly why I am picky about who I take on.",
    b: "Physical brands carry real costs and thinner margins, so a split does not make sense. A retainer keeps the work continuous and the incentives clean.",
  },
  {
    label: "Both lanes include",
    kind: "list",
  },
];

function CellA({ row }: { row: LaneRow }) {
  if (row.kind === "paid") return <PaidA />;
  if (row.kind === "list") return <IncludedList />;
  return <>{row.a}</>;
}

function CellB({ row }: { row: LaneRow }) {
  if (row.kind === "paid") return <PaidB />;
  if (row.kind === "list") return <IncludedList />;
  return <>{row.b}</>;
}

export default function Lanes() {
  return (
    <Spine
      id="lanes"
      number="02"
      label="TWO LANES"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <Heading
        as="h2"
        text="Two lanes. The _same_ work."
        underlineVariant={2}
        className="max-w-[14ch]"
      />

      <MaskLines
        delay={0.12}
        className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-pc-text"
      >
        {
          "The job is identical in both. Turn attention into something people buy. The only thing that changes is how I get paid."
        }
      </MaskLines>

      <div className="mt-14 hidden overflow-hidden md:block">
        <table className="w-full border-collapse text-left" aria-label="Lane comparison">
          <thead>
            <tr className="border-b border-pc-line">
              <th className="w-[18%] py-6 pr-4" scope="col">
                <span className="sr-only">Category</span>
              </th>
              <th
                className="w-[41%] border-t-2 border-t-accent bg-white/[0.02] px-6 py-6"
                scope="col"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
                  Lane A
                </p>
                <p className="mt-2 text-[15px] text-pc-white">
                  Creators and digital brands
                </p>
              </th>
              <th className="w-[41%] px-6 py-6" scope="col">
                <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                  Lane B
                </p>
                <p className="mt-2 text-[15px] text-pc-white">
                  Physical product brands
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-pc-line">
                <th
                  scope="row"
                  className="py-6 pr-4 align-top text-[11px] uppercase tracking-[0.2em] text-pc-muted"
                >
                  {row.label}
                </th>
                <td className="bg-white/[0.02] px-6 py-6 align-top text-[15px] leading-[1.6] text-pc-text">
                  <CellA row={row} />
                </td>
                <td className="px-6 py-6 align-top text-[15px] leading-[1.6] text-pc-text">
                  <CellB row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-14 space-y-10 md:hidden">
        {(
          [
            {
              key: "a" as const,
              title: "Lane A",
              subtitle: "Creators and digital brands",
              featured: true,
            },
            {
              key: "b" as const,
              title: "Lane B",
              subtitle: "Physical product brands",
              featured: false,
            },
          ] as const
        ).map((lane) => (
          <div
            key={lane.key}
            className={
              lane.featured
                ? "border-t-2 border-t-accent bg-white/[0.02]"
                : "border-t border-pc-line"
            }
          >
            <div className="px-1 py-5">
              <p
                className={
                  lane.featured
                    ? "text-[11px] uppercase tracking-[0.2em] text-accent"
                    : "text-[11px] uppercase tracking-[0.2em] text-pc-muted"
                }
              >
                {lane.title}
              </p>
              <p className="mt-2 text-[15px] text-pc-white">{lane.subtitle}</p>
            </div>
            {rows.map((row) => (
              <div
                key={`${lane.key}-${row.label}`}
                className="border-t border-pc-line py-5"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                  {row.label}
                </p>
                <div className="mt-3 text-[15px] leading-[1.6] text-pc-text">
                  {lane.key === "a" ? <CellA row={row} /> : <CellB row={row} />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-10 text-left text-[15px] text-pc-muted">
        Not sure which lane you are in. That is what the call is for.{" "}
        <Link
          href="/apply"
          className="group relative inline-block text-accent"
        >
          Apply
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </Link>
      </p>
    </Spine>
  );
}
