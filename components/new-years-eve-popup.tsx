"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { copy, newYearsEve, restaurant, type Locale } from "../lib/site";
import { Icon } from "./icon";

const sessionKey = "tokyo-bbq-house:new-years-eve-2026";
const openingDelay = 2_000;
// Lisbon is on UTC at midnight on 1 January.
const expiresAt = Date.parse("2027-01-01T00:00:00+00:00");
const maxTimeout = 2_147_483_647;
let shownInDocument = false;

function openNewYearsMenu(popup: HTMLDialogElement | null) {
  if (!popup || popup.open || Date.now() >= expiresAt) return;

  popup.showModal();
  shownInDocument = true;
  try {
    sessionStorage.setItem(sessionKey, "shown");
  } catch {
    // The in-memory flag suppresses automatic opening when storage is unavailable.
  }
}

export function NewYearsEvePopup({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const onReservationPage = pathname === restaurant.reservationPath || `${pathname}/` === restaurant.reservationPath;
  const t = newYearsEve[locale];
  const price = new Intl.NumberFormat(copy[locale].lang, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const popup = dialog.current;
    if (!popup || Date.now() >= expiresAt) return;

    let expiryTimer: number | undefined;

    function checkExpiry() {
      window.clearTimeout(expiryTimer);
      const remaining = expiresAt - Date.now();
      setActive(remaining > 0);
      if (remaining <= 0) {
        if (popup?.open) popup.close();
      } else {
        expiryTimer = window.setTimeout(checkExpiry, Math.min(remaining, maxTimeout));
      }
    }

    checkExpiry();
    const openingTimer = window.setTimeout(() => {
      if (shownInDocument) return;

      try {
        if (sessionStorage.getItem(sessionKey)) return;
      } catch {
        // The in-memory flag also covers browsers that block session storage.
      }

      openNewYearsMenu(popup);
    }, openingDelay);

    document.addEventListener("visibilitychange", checkExpiry);
    window.addEventListener("pageshow", checkExpiry);
    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(expiryTimer);
      document.removeEventListener("visibilitychange", checkExpiry);
      window.removeEventListener("pageshow", checkExpiry);
    };
  }, []);

  return (
    <>
      {active && (
        <button
          type="button"
          className="new-year-banner"
          aria-haspopup="dialog"
          aria-controls="new-year-menu-dialog"
          onClick={() => openNewYearsMenu(dialog.current)}
        >
          {t.banner}<Icon name="arrow" />
        </button>
      )}
      {children}
      <dialog
        ref={dialog}
        id="new-year-menu-dialog"
        className="new-year-dialog"
        aria-labelledby="new-year-title"
        aria-describedby="new-year-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="new-year-panel">
          <button type="button" autoFocus className="new-year-close" aria-label={t.close} onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </button>
          <div className="new-year-content" tabIndex={0}>
            <header className="new-year-heading">
              <p className="eyebrow"><span /><time dateTime="2026-12-31">{t.date}</time></p>
              <h2 id="new-year-title">{t.title}</h2>
              <p id="new-year-description">{t.description}</p>
              <p className="new-year-time">
                {t.dinner} <time dateTime="2026-12-31T19:00:00Z">19:00</time>{" "}
                {t.dinnerEnd} <time dateTime="2027-01-01T00:30:00Z">00:30</time>.
              </p>
            </header>
            <dl className="new-year-prices">
              <div><dt>{t.adults}</dt><dd><strong>{price.format(80)}</strong> {t.perPerson}</dd></div>
              <div><dt>{t.children}</dt><dd><strong>{price.format(50)}</strong> {t.perPerson}</dd></div>
            </dl>
            <div className="new-year-menus">
              <section>
                <h3>{t.seafoodTitle}</h3>
                <ul>{t.seafood.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>{t.drinksTitle}</h3>
                <ul>{t.drinks.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>
            <p className="new-year-invitation">{t.invitation}</p>
          </div>
          <footer className="new-year-actions">
            {onReservationPage ? (
              <button type="button" className="button button-red" onClick={() => dialog.current?.close()}>
                <Icon name="calendar" />{copy[locale].book}
              </button>
            ) : (
              <Link className="button button-red" href={restaurant.reservationPath} onClick={() => dialog.current?.close()}>
                <Icon name="calendar" />{copy[locale].book}
              </Link>
            )}
          </footer>
        </div>
      </dialog>
    </>
  );
}
