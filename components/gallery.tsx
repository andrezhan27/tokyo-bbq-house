"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { copy, type Locale } from "../lib/site";
import { Icon } from "./icon";

const photoCount = 56;
const featuredCount = 8;

function photoPath(index: number) {
  return `/photos/gallery-${String(index + 1).padStart(2, "0")}.webp`;
}

export function Gallery({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const visibleCount = expanded ? photoCount : featuredCount;

  function changePhoto(delta: number) {
    setActive((index) => (index + delta + visibleCount) % visibleCount);
  }

  return (
    <>
      <div className="gallery-grid">
        {Array.from({ length: visibleCount }, (_, index) => {
          const alt = t.photoAlts[index] ?? `${t.gallery.photo} ${index + 1}`;
          return (
            <button className="gallery-tile" type="button" key={index} onClick={(event) => {
              opener.current = event.currentTarget;
              setActive(index);
              dialog.current?.showModal();
            }}>
              <Image src={photoPath(index)} alt={alt} fill sizes="(max-width: 600px) 46vw, (max-width: 1000px) 31vw, 24vw" />
              <span aria-hidden="true"><Icon name="external" /></span>
            </button>
          );
        })}
      </div>
      <button type="button" className="button button-outline gallery-toggle" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? t.gallery.less : t.gallery.more} <Icon name={expanded ? "arrow" : "down"} />
      </button>
      <dialog ref={dialog} className="gallery-dialog" aria-label={t.galleryTitle} onClose={() => opener.current?.focus()} onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }} onKeyDown={(event) => {
        if (event.key === "ArrowLeft") changePhoto(-1);
        if (event.key === "ArrowRight") changePhoto(1);
      }}>
        <button type="button" autoFocus className="dialog-close" aria-label={t.gallery.close} onClick={() => dialog.current?.close()}><Icon name="close" /></button>
        <div className="dialog-stage">
          <button type="button" className="dialog-prev" aria-label={t.gallery.prev} onClick={() => changePhoto(-1)}><Icon name="left" /></button>
          <div className="dialog-photo">
            <Image key={active} src={photoPath(active)} alt={t.photoAlts[active] ?? t.gallery.photo} fill sizes="(max-width: 800px) 90vw, 75vw" />
          </div>
          <button type="button" className="dialog-next" aria-label={t.gallery.next} onClick={() => changePhoto(1)}><Icon name="right" /></button>
        </div>
        <p className="dialog-count" aria-live="polite">{active + 1} / {visibleCount}</p>
      </dialog>
    </>
  );
}
