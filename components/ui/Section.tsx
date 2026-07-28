import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "header";
};

export default function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={`py-16 sm:py-24 ${className}`}>
      {children}
    </Tag>
  );
}
