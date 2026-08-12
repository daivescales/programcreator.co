export const site = {
  name: "ProgramCreator",
  founder: "Daive",
  handle: "@daivescales",
  url: "https://programcreator.co",
  // TODO: Daive, add your real business email here
  email: "",
  // TODO: Daive, replace with your real Cal.com link
  calLink: "daivescales/discovery",
  socials: {
    youtube: "https://www.youtube.com/@daivescales",
    instagram: "https://www.instagram.com/daivescales/",
    x: "https://x.com/daivescales",
    tiktok: "https://www.tiktok.com/@daivescales",
  },
} as const;

/** Returns the business email if set, otherwise null. Never invent one. */
export function contactEmail(): string | null {
  const value = site.email?.trim();
  return value && value.length > 0 ? value : null;
}
