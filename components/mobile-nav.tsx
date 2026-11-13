"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icon";

export function MobileNav({ openLabel, closeLabel, links }: {
  openLabel: string;
  closeLabel: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) {
        setOpen(false);
        toggle.current?.focus();
      }
    }

    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [open]);

  function dismiss() {
    setOpen(false);
    toggle.current?.focus({ preventScroll: true });
  }

  return (
    <div className="mobile-nav" data-open={open}>
      <button
        className="mobile-nav-toggle"
        type="button"
        ref={toggle}
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      <div className="mobile-nav-backdrop" aria-hidden="true" onClick={dismiss} />
      <nav className="mobile-nav-panel" id={panelId} aria-label={openLabel} inert={!open}>
        {links.map(({ href, label }) => (
          <Link href={href} key={href} onClick={dismiss}>{label}</Link>
        ))}
      </nav>
    </div>
  );
}
