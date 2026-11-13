import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { copy, restaurant, type Locale } from "../lib/site";
import { Gallery } from "./gallery";
import { Icon } from "./icon";
import { MobileNav } from "./mobile-nav";
import { YakinikuCarousel } from "./yakiniku-carousel";

export function siteMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return {
    title: `Tokyo BBQ House | ${locale === "pt" ? "Yakiniku em Lisboa" : "Yakiniku in Lisbon"}`,
    description: t.description,
    alternates: {
      languages: { "pt-PT": "/", en: "/en/" },
    },
    openGraph: { type: "website", locale: locale === "pt" ? "pt_PT" : "en_GB", siteName: "Tokyo BBQ House" },
    icons: "/photos/favicon.png",
  };
}

export function SiteFrame({ locale, reservation = false, children }: {
  locale: Locale;
  reservation?: boolean;
  children: ReactNode;
}) {
  const t = copy[locale];
  const links = ["historia", "menu", "galeria", "contacto"].map((section, index) => ({
    href: `${t.home}#${section}`,
    label: t.nav[index],
  }));
  return (
    <div className={reservation ? "reservation-layout" : undefined}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="nav-shell">
          <Link href={t.home} className="brand" aria-label="Tokyo BBQ House">
            <Image src="/photos/logo.png" alt="Tokyo BBQ House" width={123} height={38} priority />
          </Link>
          <nav className="desktop-nav" aria-label={t.openNavigation}>
            {links.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="nav-actions">
            <Link className="language" href={t.alternateHome} aria-label={t.switchLanguage} hrefLang={locale === "pt" ? "en" : "pt-PT"}>{locale === "pt" ? "EN" : "PT"}</Link>
            <Link className="button button-red nav-book" href={restaurant.reservationPath} aria-current={reservation ? "page" : undefined}><Icon name="calendar" />{t.book}</Link>
            <MobileNav openLabel={t.openNavigation} closeLabel={t.closeNavigation} links={links} />
          </div>
        </div>
      </header>
      <main id="main" className={reservation ? "reservation-main" : undefined}>{children}</main>
      {!reservation && <footer className="site-footer">
        <div className="container footer-inner">
          <Link href={t.home} aria-label="Tokyo BBQ House"><Image src="/photos/logo.png" alt="Tokyo BBQ House" width={106} height={33} /></Link>
          <p>Passeio das Tágides · 1990-280 Lisboa</p>
          <div className="footer-links">
            <a href={restaurant.instagram} aria-label="Instagram"><Icon name="instagram" /></a>
            <a href={`mailto:${restaurant.email}`} aria-label={t.email}><Icon name="mail" /></a>
            <a href={restaurant.call} aria-label={t.phone}><Icon name="phone" /></a>
          </div>
        </div>
      </footer>}
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <SiteFrame locale={locale}>
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/photos/hero.webp" alt="" fill preload sizes="100vw" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span />{t.heroLabel}</p>
            <h1 id="hero-title">Tokyo <br /><em>BBQ House</em></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="button-row">
              <Link className="button button-red" href={restaurant.reservationPath}><Icon name="calendar" />{t.book}</Link>
              <a className="button button-outline" href="#menu">{t.menu}<Icon name="arrow" /></a>
            </div>
          </div>
          <a className="hero-scroll" href="#historia"><Icon name="down" />{t.scroll}</a>
          <span className="hero-japanese" lang="ja" aria-hidden="true">焼肉</span>
        </div>
      </section>

      <aside className="booking-strip">
        <div className="container booking-inner">
          <p><span lang="ja" aria-hidden="true">焼肉</span>{t.bookingTitle}</p>
          <Link href={restaurant.reservationPath}><Icon name="calendar" />{t.book}<Icon name="arrow" /></Link>
        </div>
      </aside>

      <section className="experience light-section section-space" id="historia">
        <div className="container split experience-grid">
          <div className="experience-copy">
            <p className="eyebrow"><span />{t.experienceLabel}</p>
            <h2>{t.experienceTitle[0]}<br /><em>{t.experienceTitle[1]}</em></h2>
            <p className="lead">{t.experienceLead}</p>
            {t.experience.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="experience-images">
            <div className="experience-main"><Image src="/photos/restaurant.webp" alt={t.photoAlts[1]} fill sizes="(max-width: 750px) 75vw, 36vw" /></div>
            <div className="experience-inset"><Image src="/photos/table.webp" alt={t.photoAlts[6]} fill sizes="(max-width: 750px) 45vw, 22vw" /></div>
          </div>
        </div>
      </section>

      <section className="menu-section section-space" id="menu">
        <div className="container split menu-grid">
          <div className="menu-image"><Image src="/photos/menu.webp" alt={t.menuPhotoAlt} fill sizes="(max-width: 750px) 92vw, 50vw" /></div>
          <div className="menu-copy">
            <p className="eyebrow"><span />{t.foodLabel}</p>
            <h2>{t.foodTitle}</h2>
            <p>{t.food}</p>
            <dl className="prices">
              {[t.weekday, t.weekend].map((label, index) => <div key={label}><dt>{label}</dt><dd>{t.prices[index]}</dd></div>)}
            </dl>
            <p className="wagyu-note">{t.wagyu}</p>
            <a className="button button-red" href={restaurant.menu} target="_blank" rel="noreferrer">{t.menu}<Icon name="external" /></a>
          </div>
        </div>
      </section>

      <section className="guide-callout light-section" aria-labelledby="guide-title">
        <div className="container">
          <div className="guide-callout-header">
            <p className="eyebrow"><span />{t.guideLabel}</p>
            <h2 id="guide-title">{t.guideTitle}</h2>
            <p>{t.guideIntro}</p>
          </div>
          <YakinikuCarousel locale={locale} />
        </div>
      </section>

      <section className="section-space gallery-section" id="galeria">
        <div className="container">
          <p className="eyebrow"><span />{t.galleryLabel}</p>
          <h2>{t.galleryTitle}</h2>
          <Gallery locale={locale} />
        </div>
      </section>

      <section className="press-section light-section" id="press">
        <div className="container press-inner">
          <div><p className="eyebrow"><span />{t.pressLabel} · NiT</p><h2>{t.pressTitle}</h2></div>
          <a className="text-link" href={restaurant.press} target="_blank" rel="noreferrer">{t.pressLink}<Icon name="external" /></a>
        </div>
      </section>

      <section className="section-space visit-section" id="contacto">
        <div className="container split visit-grid">
          <div>
            <p className="eyebrow"><span />{t.visitLabel}</p>
            <h2>{t.visitTitle}</h2>
            <address>
              <div><Icon name="pin" /><p><span>{t.location}</span><a href={restaurant.directions} target="_blank" rel="noreferrer">Passeio das Tágides<br />1990-280 Lisboa, Portugal</a></p></div>
              <div><Icon name="phone" /><p><span>{t.phone}</span><a href={restaurant.call}>{restaurant.phone}</a></p></div>
              <div><Icon name="mail" /><p><span>{t.email}</span><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></p></div>
            </address>
            <div className="button-row">
              <Link className="button button-red" href={restaurant.reservationPath}><Icon name="calendar" />{t.book}</Link>
              <a className="button button-outline" href={restaurant.directions} target="_blank" rel="noreferrer">{t.directions}<Icon name="external" /></a>
            </div>
          </div>
          <div className="visit-image"><Image src="/photos/yakiniku/n2.webp" alt={t.visitPhotoAlt} fill sizes="(max-width: 750px) 92vw, 45vw" /></div>
        </div>
      </section>
    </SiteFrame>
  );
}
