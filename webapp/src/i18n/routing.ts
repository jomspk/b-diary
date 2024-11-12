import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const DEFAULT_LOCALE = "ja";
export const AVAIRABLE_LOCALE = [DEFAULT_LOCALE, "en", "th"];
export type Locale = "ja" | "en" | "th";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ja", "en", "th"],

  // Used when no locale matches
  defaultLocale: "ja",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
