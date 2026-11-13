import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { copy, restaurant, menuPath, type Locale } from "../lib/site";
import { Icon } from "./icon";
import { MenuReader } from "./menu-reader";
import "./menu-book.css";

export function menuMetadata(locale: Locale): Metadata {
  return {
    title: "Menu | Tokyo BBQ House Lisboa",
    description: locale === "pt"
      ? "Folheia o menu de yakiniku do Tokyo BBQ House: entradas, carnes para grelhar, peixe, sobremesas e bebidas."
      : "Browse the Tokyo BBQ House yakiniku menu: starters, cuts for the grill, seafood, desserts and drinks.",
    alternates: { languages: { "pt-PT": menuPath("pt"), en: menuPath("en") } },
    icons: "/photos/favicon.png",
  };
}

export function MenuBook({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const altLocale = locale === "pt" ? "en" : "pt";

  return (
    <div className="menu-experience">
      <a className="skip-link" href="#menu-main">{t.skip}</a>
      <header className="menu-header">
        <Link href={t.home} className="menu-home">
          <Icon name="left" /><span>{locale === "pt" ? "Início" : "Home"}</span>
        </Link>
        <Link href={t.home} className="menu-brand" aria-label="Tokyo BBQ House">
          <Image src="/photos/logo.png" alt="Tokyo BBQ House" width={111} height={34} priority />
        </Link>
        <div className="menu-header-actions">
          <Link className="menu-language" href={menuPath(altLocale)} hrefLang={copy[altLocale].lang} lang={copy[altLocale].lang}
            aria-label={altLocale === "en" ? "Read the menu in English" : "Ler o menu em português"}>
            {altLocale.toUpperCase()}
          </Link>
          <Link className="menu-booking" href={restaurant.reservationPath}>{t.book}<Icon name="external" /></Link>
        </div>
      </header>
      <main id="menu-main">
        <MenuReader locale={locale} />
      </main>
    </div>
  );
}
