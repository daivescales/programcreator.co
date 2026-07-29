import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sky-500">
        {eyebrow}
      </p>
      <h2 className="mb-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
