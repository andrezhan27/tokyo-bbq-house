"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { menuPages, menuSections, type MenuLeaf } from "../lib/menu";
import { copy, restaurant, type Locale } from "../lib/site";
import { Icon } from "./icon";

const words = {
  pt: {
    title: "Menu", sub: "Yakiniku japonês", open: "Abrir menu", previous: "Anterior", next: "Seguinte",
    contents: "Índice", close: "Fechar", cover: "Capa", back: "Contracapa", page: "Página",
    chapters: "Capítulos", home: "Voltar à capa", turn: "Desliza ou usa as setas para folhear",
    edition: "PARQUE DAS NAÇÕES · LISBOA", menu: "Carta da casa",
    checkDrinks: "A equipa pode indicar as opções e os preços das bebidas.",
    thanks: "Até já, à mesa.", seeAgain: "Obrigado pela visita.",
  },
  en: {
    title: "Menu", sub: "Japanese yakiniku", open: "Open menu", previous: "Previous", next: "Next",
    contents: "Contents", close: "Close", cover: "Cover", back: "Back cover", page: "Page",
    chapters: "Chapters", home: "Back to cover", turn: "Swipe or use the arrows to turn pages",
    edition: "PARQUE DAS NAÇÕES · LISBON", menu: "The house menu",
    checkDrinks: "Ask our team about drink options and prices.",
    thanks: "See you at the table.", seeAgain: "Thank you for visiting.",
  },
};

const last = menuPages.length - 1;
const query = "(min-width: 820px) and (min-aspect-ratio: 5/4)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getSpread = () => window.matchMedia(query).matches;
const getServerSpread = () => false;
const leftOf = (n: number) => n === 0 ? 0 : n - (n + 1) % 2;
const pad = (n: number) => String(n).padStart(2, "0");
const turnDuration = 320;
const useSmallPhoto = "(max-width: 520px) and (max-resolution: 2dppx)";

type Jump = (target: number) => void;
type Turn = { from: number; to: number; direction: 1 | -1; spread: boolean };
type PageProps = {
  index: number;
  locale: Locale;
  jump: Jump;
  side?: "left" | "right";
  visual?: boolean;
};

function Contents({ locale, jump, active, visual }: { locale: Locale; jump: Jump; active?: number; visual?: boolean }) {
  return (
    <ol className="menu-chapters">
      {menuSections.map(({ id, name, page }, i) => {
        const current = active !== undefined && menuPages[active];
        return (
          <li key={id}>
            {visual ? <span className="menu-chapter-link"><i>{pad(i + 1)}</i>{name[locale]}<b>{pad(page)}</b></span> :
              <button className="menu-chapter-link" type="button" onClick={() => jump(page)}
                aria-current={current && current.kind === "dishes" && current.section === id ? "location" : undefined}>
                <i>{pad(i + 1)}</i>{name[locale]}<b>{pad(page)}</b>
              </button>}
          </li>
        );
      })}
    </ol>
  );
}

function DishPhoto({ id }: { id: string }) {
  return (
    <picture className="menu-dish-photo">
      <source media={useSmallPhoto} srcSet={`/photos/menu/${id}-small.webp`} />
      <Image src={`/photos/menu/${id}.webp`} width={640} height={480} alt="" loading="eager" draggable={false} />
    </picture>
  );
}

function Leaf({ index, locale, jump, side, visual }: PageProps) {
  const t = words[locale];
  const leaf: MenuLeaf | undefined = menuPages[index];
  const classes = `menu-leaf menu-leaf--${leaf?.kind ?? "empty"}${side ? ` menu-leaf--${side}` : ""}`;
  if (!leaf) return <div className={classes} aria-hidden="true" />;

  if (leaf.kind === "cover") {
    return (
      <div className={classes}>
        <div className="menu-cover-art">
          <Image src="/photos/menu/grill-cover.webp" alt="" width={736} height={736} priority={!visual} className="menu-cover-photo" draggable={false} />
        </div>
        <div className="menu-cover-trim" aria-hidden="true" />
        <div className="menu-cover-copy">
          <div className="menu-cover-top"><span>{t.title}</span><span>Lisboa · PT</span></div>
          <div className="menu-cover-title">
            <p>{t.sub}</p>
            {visual ? <div className="menu-cover-heading">Tokyo BBQ House</div> : <h1 className="menu-cover-heading">Tokyo BBQ House</h1>}
          </div>
          <div className="menu-cover-bottom">
            {visual ? <span className="menu-open">{t.open}<Icon name="right" /></span> :
              <button type="button" className="menu-open" onClick={() => jump(1)}>{t.open}<Icon name="right" /></button>}
            <span className="menu-cover-kanji" lang="ja" aria-hidden="true">焼肉</span>
          </div>
        </div>
      </div>
    );
  }

  if (leaf.kind === "back") {
    return (
      <div className={classes}>
        <div className="menu-leaf-header"><span>{t.menu}</span><span>Tokyo BBQ House</span></div>
        <div className="menu-back-content">
          <span lang="ja" aria-hidden="true">焼肉</span>
          <h2>{t.thanks}</h2>
          <p>{t.seeAgain}</p>
          {!visual && <Link href={restaurant.reservationPath} className="menu-back-book">{copy[locale].book}<Icon name="right" /></Link>}
        </div>
        <div className="menu-leaf-footer"><span>{t.edition}</span><span>{pad(index)}</span></div>
      </div>
    );
  }

  if (leaf.kind === "contents") {
    return (
      <div className={classes}>
        <div className="menu-leaf-header"><span>{t.menu}</span><span>Tokyo BBQ House</span></div>
        <div className="menu-contents-copy">
          <p>{t.sub}</p>
          <h2>{t.contents}</h2>
        </div>
        <Contents locale={locale} jump={jump} visual={visual} />
        <div className="menu-leaf-footer"><span>{t.edition}</span><span>{pad(index)}</span></div>
      </div>
    );
  }

  if (leaf.kind !== "dishes") return null;

  return (
    <section className={classes} aria-label={leaf.name[locale]}>
      <div className="menu-leaf-header"><span>{t.menu}</span><span lang="ja" aria-hidden="true">{leaf.marker}</span></div>
      <div className="menu-section-heading">
        <h2>{leaf.name[locale]}</h2>
        {leaf.parts > 1 && <span aria-hidden="true">{pad(leaf.part)} / {pad(leaf.parts)}</span>}
      </div>
      <ul className="menu-dishes">
        {leaf.items.map(({ id, name }) => (
          <li key={id}><DishPhoto id={id} /><p>{name[locale]}</p></li>
        ))}
      </ul>
      {leaf.section === "drinks" && <p className="menu-drinks-note">{t.checkDrinks}</p>}
      <div className="menu-leaf-footer"><span>Tokyo BBQ House</span><span>{pad(index)}</span></div>
    </section>
  );
}

export function MenuReader({ locale }: { locale: Locale }) {
  const t = words[locale];
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [showContents, setShowContents] = useState(false);
  const spread = useSyncExternalStore(subscribe, getSpread, getServerSpread);
  const active = spread ? leftOf(page) : page;
  const panelButton = useRef<HTMLButtonElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const animating = turn !== null && turn.spread === spread;

  useEffect(() => {
    if (!turn) return;
    const timer = window.setTimeout(() => setTurn(null), turnDuration + 80);
    return () => window.clearTimeout(timer);
  }, [turn]);

  useEffect(() => {
    const next = active === 0 ? 1 : active + (spread ? 2 : 1);
    const smaller = window.matchMedia(useSmallPhoto).matches;
    // The cover leads to the contents, so also warm the first dish page on phones.
    const leaves = menuPages.slice(next, next + (spread || active === 0 ? 2 : 1));
    for (const leaf of leaves) {
      if (leaf.kind !== "dishes") continue;
      for (const { id } of leaf.items) {
        const photo = new window.Image();
        photo.fetchPriority = "low";
        photo.src = `/photos/menu/${id}${smaller ? "-small" : ""}.webp`;
      }
    }
  }, [active, spread]);

  const go = useCallback<Jump>((target) => {
    const next = Math.max(0, Math.min(last, target));
    const nextView = spread ? leftOf(next) : next;
    if (nextView === active || animating) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTurn({ from: active, to: nextView, direction: nextView > active ? 1 : -1, spread });
    }
    setPage(next);
  }, [active, animating, spread]);

  const step = useCallback((direction: 1 | -1) => {
    if (!spread || active === 0) go(active + direction);
    else go(direction < 0 && active === 1 ? 0 : active + direction * 2);
  }, [active, go, spread]);

  const closeContents = useCallback(() => {
    setShowContents(false);
    panelButton.current?.focus();
  }, []);

  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.repeat) return;
      if (showContents && e.key === "Escape") { closeContents(); return; }
      if (showContents) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        step(e.key === "ArrowRight" ? 1 : -1);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [closeContents, showContents, step]);

  const choose = (target: number) => {
    closeContents();
    go(target);
  };

  const start = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || e.button !== 0 || (e.target as HTMLElement).closest("button, a")) return;
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const finish = (e: PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    pointer.current = null;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (Math.abs(dx) >= 48 && Math.abs(dx) >= Math.abs(e.clientY - p.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const move = animating ? turn : null;
  const cover = active === 0;
  const turningCover = spread && move && (move.from === 0 || move.to === 0);
  const openingSpread = turningCover ? Math.max(move.from, move.to) : 1;
  const atEnd = spread ? active >= leftOf(last) : active === last;
  const pageLabel = cover ? t.cover : !spread && active === last ? t.back
    : `${t.page} ${pad(active)}${spread && active < last ? `–${pad(active + 1)}` : ""}`;
  const stageClass = `menu-stage${spread ? " is-spread" : ""}${cover ? " is-closed" : ""}${turningCover ? " is-turning-cover" : ""}`;
  const leafProps = { locale, jump: go };

  return (
    <div className="menu-reader">
      <div className="menu-reader-top">
        <p><span />{t.menu}<span className="menu-reader-city"> / Lisboa</span></p>
        <button type="button" className="menu-index-toggle" ref={panelButton} aria-expanded={showContents}
          aria-controls="menu-chapter-panel" onClick={() => setShowContents((value) => !value)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 6h12M8 12h12M8 18h12M4 5v2m0 4v2m0 4v2" />
          </svg>
          {t.contents}
        </button>
        <div className="menu-index" id="menu-chapter-panel" hidden={!showContents}>
          <div className="menu-index-heading"><p>{t.chapters}</p><button type="button" aria-label={t.close} onClick={closeContents}><Icon name="close" /></button></div>
          <Contents locale={locale} jump={choose} active={page} />
          <button type="button" className="menu-index-cover" onClick={() => choose(0)}>{t.home}<Icon name="left" /></button>
        </div>
      </div>

      <div className="menu-desk">
        <div className={stageClass} style={{ "--page-turn": `${turnDuration}ms` } as CSSProperties} onPointerDown={start} onPointerUp={finish}
          onPointerCancel={() => { pointer.current = null; }}>
          <div className="menu-stage-content">
            {!cover && <h1 className="menu-visually-hidden">{t.title} · Tokyo BBQ House</h1>}
            {cover ? <Leaf {...leafProps} index={0} /> : (
              <>
                <Leaf {...leafProps} index={active} side={spread ? "left" : undefined} />
                {spread && <Leaf {...leafProps} index={active + 1} side="right" />}
              </>
            )}
          </div>
          {move && <div className={`menu-turn-scene ${move.direction === 1 ? "is-forward" : "is-backward"}${turningCover ? " turns-cover" : ""}`} aria-hidden="true" inert>
            {!spread && move.direction === -1 && (
              <div className="menu-turn-base"><Leaf {...leafProps} index={move.from} visual /></div>
            )}
            {spread && (turningCover ?
              <div className="menu-turn-base">
                <Leaf {...leafProps} index={openingSpread} side="left" visual />
                <Leaf {...leafProps} index={openingSpread + 1} side="right" visual />
              </div>
              : <div className="menu-turn-base">
                <Leaf {...leafProps} index={move.direction === 1 ? move.from : move.to} side="left" visual />
                <Leaf {...leafProps} index={(move.direction === 1 ? move.to : move.from) + 1} side="right" visual />
              </div>)}
            <div className="menu-turn-sheet" onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) setTurn(null);
            }}>
              <div className="menu-turn-front">
                <Leaf {...leafProps} index={turningCover ? 0 : spread ? (move.direction === 1 ? move.from + 1 : move.from) : move.direction === 1 ? move.from : move.to}
                  side={turningCover || !spread ? undefined : move.direction === 1 ? "right" : "left"} visual />
              </div>
              <div className="menu-turn-back">
                {spread && (
                  <Leaf {...leafProps} index={turningCover ? openingSpread : move.direction === -1 ? move.to + 1 : move.to}
                    side={turningCover || move.direction === 1 ? "left" : "right"} visual />
                )}
              </div>
            </div>
          </div>}
        </div>
      </div>

      <nav className="menu-controls" aria-label={t.turn}>
        <button type="button" onClick={() => step(-1)} disabled={cover} aria-label={t.previous}><Icon name="left" /><span>{t.previous}</span></button>
        <div className="menu-counter" aria-live="polite" aria-atomic="true">
          <span>{pageLabel}</span><i /> <span>{pad(last)}</span>
        </div>
        <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label={t.next}><span>{t.next}</span><Icon name="right" /></button>
      </nav>
      <p className="menu-turn-hint">{t.turn}</p>
    </div>
  );
}
