import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BrandLogoProps = {
  href?: string | null;
  onClick?: () => void;
  /** Full lockup (mark + word) or mark only. */
  variant?: "lockup" | "mark";
  className?: string;
  /** Rendered height in CSS pixels. */
  height?: number;
  priority?: boolean;
};

/** Intrinsic pixel size of public/brand/logo-lockup-nav.png */
const LOCKUP = { src: "/brand/logo-lockup-nav.png", w: 164, h: 36 } as const;
const MARK = { src: "/brand/logo-mark.png", w: 114, h: 114 } as const;

/**
 * Official ProgramCreator logo. Transparent PNGs over the navy site.
 */
export default function BrandLogo({
  href = "/",
  onClick,
  variant = "lockup",
  className,
  height = 28,
  priority = false,
}: BrandLogoProps) {
  const asset = variant === "mark" ? MARK : LOCKUP;
  const width = Math.round((asset.w / asset.h) * height);

  const image = (
    <Image
      src={asset.src}
      alt="ProgramCreator"
      width={width}
      height={height}
      priority={priority}
      className={cn("block h-auto w-auto max-w-none select-none", className)}
      style={{ height, width: "auto" }}
    />
  );

  if (href === null) return image;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex shrink-0 items-center"
      aria-label="ProgramCreator home"
    >
      {image}
    </Link>
  );
}
