"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { copy, type Locale } from "../lib/site";
import { Icon } from "./icon";

const languages = [
  { locale: "pt", label: "Português" },
  { locale: "en", label: "English" },
] as const;

export function LanguageDropdown({ locale, paths }: { locale: Locale; paths?: Record<Locale, string> }) {
  const dropdown = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      const details = dropdown.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }

    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, []);

  function close() {
    if (dropdown.current) dropdown.current.open = false;
  }

  return (
    <details className="language-switch" ref={dropdown} onKeyDown={(event) => {
      if (event.key === "Escape" && dropdown.current?.open) {
        event.preventDefault();
        close();
        summary.current?.focus({ preventScroll: true });
      }
    }}>
      <summary ref={summary} aria-label={`${copy[locale].languageLabel}: ${locale === "pt" ? "Português" : "English"}`}>
        {locale.toUpperCase()}<Icon name="chevron-down" />
      </summary>
      <ul className="language-options">
        {languages.map(({ locale: option, label }) => {
          const { home, lang } = copy[option];
          return (
            <li key={option}>
              <Link href={paths?.[option] ?? home} hrefLang={lang} lang={lang} aria-current={option === locale ? "true" : undefined} onClick={(event) => {
                close();
                if (option === locale) {
                  event.preventDefault();
                  summary.current?.focus({ preventScroll: true });
                }
              }}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
