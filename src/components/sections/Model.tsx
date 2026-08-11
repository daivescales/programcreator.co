import { IndexRow, MaskLines, StaggerList } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Spine from "@/components/ui/Spine";

const rows = [
  {
    number: "01",
    title: "Build the offer",
    body: "A digital product your audience has already told you they want. Positioned, priced, packaged, ready to sell.",
  },
  {
    number: "02",
    title: "Rebuild the page",
    body: "The page where the money is actually made. Real copy, real hierarchy, a checkout that doesn't leak on mobile.",
  },
  {
    number: "03",
    title: "Scale through your socials",
    body: "Hooks and funnel paths that route your existing attention into the product, then iterate on live data.",
  },
] as const;

export default function Model() {
  return (
    <Spine
      id="model"
      number="01"
      label="THE MODEL"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <Heading
        as="h2"
        text="You don't have a traffic problem. You have an *offer problem*."
        className="max-w-[16ch]"
      />

      <MaskLines
        delay={0.12}
        className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-pc-text"
      >
        {
          "You're already generating attention. Creator Product Scaling fixes what that attention lands on."
        }
      </MaskLines>

      <StaggerList className="mt-14 border-t border-pc-line">
        {rows.map((row) => (
          <IndexRow
            key={row.number}
            className="grid grid-cols-1 items-start gap-4 py-9 md:grid-cols-12 md:gap-6"
          >
            <span className="text-[13px] text-accent md:col-span-1">
              {row.number}
            </span>
            <h3
              data-index-label
              className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white transition-transform duration-200 group-hover:translate-x-1.5 md:col-span-4"
            >
              {row.title}
            </h3>
            <p className="max-w-[52ch] text-[17px] leading-[1.6] text-pc-text md:col-span-7">
              {row.body}
            </p>
          </IndexRow>
        ))}
      </StaggerList>
    </Spine>
  );
}
