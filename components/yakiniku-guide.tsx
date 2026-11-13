import Image from "next/image";
import Link from "next/link";
import { cutGroups } from "../lib/cuts";
import { copy, restaurant, type Locale } from "../lib/site";
import { Icon } from "./icon";
import { SiteFrame } from "./restaurant-site";

export function YakinikuGuide({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const language = locale === "pt" ? 0 : 1;

  return (
    <SiteFrame locale={locale} guide>
      <section className="guide-hero">
        <Image src="/photos/cuts.webp" alt="" fill preload sizes="100vw" />
        <div className="container">
          <Link className="text-link" href={t.home}><Icon name="left" />{t.guideBack}</Link>
          <p className="eyebrow"><span />{t.guideLabel}</p>
          <h1>{t.guideTitle}</h1>
          <p>{t.guideIntro}</p>
        </div>
      </section>
      <section className="light-section section-space">
        <div className="container cut-list">
          {cutGroups.map((group) => (
            <details key={group.name} className="cut-group">
              <summary><h2>{group.name}</h2><span aria-hidden="true"></span></summary>
              <div className="cut-details">
                <p>{group.description[language]}</p>
                {group.cuts && <dl>{group.cuts.map((cut) => <div key={cut.name}><dt>{cut.name}</dt><dd>{cut.description[language]}</dd></div>)}</dl>}
              </div>
            </details>
          ))}
          <Link className="button button-red" href={restaurant.reservationPath}><Icon name="calendar" />{t.book}</Link>
        </div>
      </section>
    </SiteFrame>
  );
}
