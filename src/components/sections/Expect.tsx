"use client";

import {
  KeyRound,
  MailOpen,
  MessageSquare,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { StaggerList } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { copy } from "@/lib/copy";

const icons: LucideIcon[] = [MailOpen, MessageSquare, KeyRound, Receipt];

export default function Expect() {
  return (
    <Section id="expect" tone="800">
      <SectionLabel number={copy.expect.number} label={copy.expect.label} />

      <Heading
        as="h2"
        text={copy.expect.heading}
        underlineVariant={2}
        className="mt-6 max-w-[18ch]"
      />

      <StaggerList className="mt-14 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
        {copy.expect.items.map((item, index) => {
          const Icon = icons[index] ?? MailOpen;
          return (
            <article key={item.title} className="group">
              <div className="flex size-7 items-center justify-center rounded-control border border-pc-line transition-colors duration-200 group-hover:border-accent">
                <Icon
                  size={14}
                  aria-hidden
                  className="text-accent transition-transform duration-200 group-hover:scale-[1.08]"
                />
              </div>
              <h3 className="t-h3 mt-4">{item.title}</h3>
              <p className="t-body mt-2">{item.body}</p>
            </article>
          );
        })}
      </StaggerList>
    </Section>
  );
}
