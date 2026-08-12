import Link from "next/link";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import { copy } from "@/lib/copy";
import { contactEmail } from "@/lib/site-config";

export default function Footer() {
  const email = contactEmail();

  return (
    <footer className="bg-navy-900 pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-wordmark text-[17px] tracking-[-0.02em] text-pc-white">
              Program<span className="text-accent">Creator</span>
            </p>
            <p className="t-body mt-4 max-w-[32ch]">{copy.footer.tagline}</p>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="group relative mt-4 inline-block text-[15px] text-accent"
              >
                {email}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ) : (
              <p className="mt-4 text-[15px] text-pc-soft">
                {copy.footer.emailComingSoon}
              </p>
            )}
            <SocialLinks variant="text" className="mt-7" />
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="t-label">{copy.footer.indexHeading}</p>
            <ul className="mt-4 space-y-3">
              {copy.footer.indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-200 hover:translate-x-[3px] hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="t-label">{copy.footer.legalHeading}</p>
            <ul className="mt-4 space-y-3">
              {copy.footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-200 hover:translate-x-[3px] hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-pc-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-pc-soft">{copy.footer.bottomLeft}</p>
          <p className="text-[13px] text-pc-soft">{copy.footer.bottomRight}</p>
        </div>
      </Container>
    </footer>
  );
}
