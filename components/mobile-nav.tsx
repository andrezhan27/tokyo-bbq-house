"use client";

import Link from "next/link";
import { useRef } from "react";
import { Icon } from "./icon";

export function MobileNav({ label, links }: {
  label: string;
  links: { href: string; label: string; current: boolean }[];
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);

  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }

  return (
    <details className="mobile-nav" ref={menu} onKeyDown={(event) => {
      if (event.key === "Escape" && menu.current?.open) {
        closeMenu();
        toggle.current?.focus();
      }
    }}>
      <summary ref={toggle} aria-label={label}><Icon name="menu" /></summary>
      <nav aria-label={label}>
        {links.map((link) => (
          <Link href={link.href} key={link.href} aria-current={link.current ? "page" : undefined} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
