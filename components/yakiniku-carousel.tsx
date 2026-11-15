"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { copy, type Locale } from "../lib/site";
import { Icon } from "./icon";

const photos = [
  ["n1", "Fatias de carne marmorizada com cogumelo", "Marbled beef slices with a mushroom"],
  ["MENU-TOKYO-1", "Cortes de carne com limão e flores", "Beef cuts with lemon and flowers"],
  ["n3", "Fatias finas de carne com verduras", "Thin slices of beef with greens"],
  ["MENU-TOKYO-62", "Costeletas com lima e especiarias", "Chops with lime and spices"],
  ["MENU-TOKYO-68", "Carne marinada com fruta", "Marinated beef with fruit"],
  ["MENU-TOKYO-73", "Fatias de carne com sal grosso e flores", "Beef slices with coarse salt and flowers"],
  ["n2", "Cortes de carne marmorizada sobre uma folha", "Marbled beef cuts served on a leaf"],
  ["MENU-TOKYO-70", "Carne fatiada com lima e legumes", "Sliced beef with lime and vegetables"],
  ["MENU-TOKYO-69", "Carne marinada numa taça azul", "Marinated beef in a blue bowl"],
  ["TOKYO-BBQ-HOUSE-18", "Costeletas com tempero verde", "Chops with green seasoning"],
  ["MENU-TOKYO-95", "Fatias de carne num tabuleiro de madeira", "Beef slices on a wooden tray"],
  ["MENU-TOKYO-63", "Dois cortes de carne com lima", "Two meat cuts with lime"],
  ["MENU-TOKYO-72", "Carne fatiada com alecrim e rabanete", "Sliced beef with rosemary and radish"],
  ["TOKYO-BBQ-HOUSE-28", "Fatias de carne com rabanete e milho", "Beef slices with radish and corn"],
  ["MENU-TOKYO-81", "Carne fatiada com pimenta em grão", "Sliced beef with peppercorns"],
  ["TOKYO-BBQ-HOUSE-30", "Cortes de carne com milho, tomate e lima", "Beef cuts with corn, tomato and lime"],
] as const;

export function YakinikuCarousel({ locale }: { locale: Locale }) {
  const labels = copy[locale].carousel;
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const stepByPhoto = useRef<(direction: number) => void>(null);

  useEffect(() => {
    const viewportElement = viewport.current;
    const trackElement = track.current;
    const groupElement = group.current;
    if (!viewportElement || !trackElement || !groupElement) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchInput = window.matchMedia("(pointer: coarse)");
    const supportsScrollEnd = "onscrollend" in viewportElement;
    let visible = false;
    let width = 0;
    let offset = 0;
    let nativeScroll = touchInput.matches;
    let writtenScroll = 0;
    let touching = false;
    let scrolling = false;
    let scrollEndTimer = 0;
    let momentum = 0;
    let stepRemaining = 0;
    let frame = 0;
    let lastFrame = 0;
    let drag: { id: number; x: number; time: number; speed: number } | null = null;

    function moveBy(distance: number) {
      if (!width) return;
      offset = ((offset + distance) % width + width) % width;
      if (nativeScroll) {
        viewportElement!.scrollLeft = width + offset;
        writtenScroll = viewportElement!.scrollLeft;
      } else {
        trackElement!.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    }

    function animate(time: number) {
      frame = 0;
      const elapsed = Math.min(time - lastFrame, 40);
      lastFrame = time;
      if (visible && !drag && !touching && !scrolling) {
        const step = Math.abs(stepRemaining) < 0.25
          ? stepRemaining
          : stepRemaining * (1 - Math.exp(-elapsed / 85));
        stepRemaining -= step;
        moveBy(step + momentum * elapsed);
        momentum *= Math.exp(-elapsed / 155);
        if (Math.abs(momentum) < 0.005) momentum = 0;
        schedule(time);
      }
    }

    function schedule(time = performance.now()) {
      if (frame || !visible || drag || touching || scrolling || !(momentum || stepRemaining)) return;
      lastFrame = time;
      frame = requestAnimationFrame(animate);
    }

    function measure() {
      const nextWidth = groupElement!.getBoundingClientRect().width;
      if (width) offset *= nextWidth / width;
      width = nextWidth;
      if (!touching && !scrolling) moveBy(0);
    }

    function startDrag(event: PointerEvent) {
      if (nativeScroll || drag || !event.isPrimary || event.button !== 0) return;
      drag = { id: event.pointerId, x: event.clientX, time: event.timeStamp, speed: 0 };
      momentum = 0;
      stepRemaining = 0;
      viewportElement!.setPointerCapture(event.pointerId);
      viewportElement!.setAttribute("data-dragging", "");
    }

    function dragBy(event: PointerEvent) {
      if (drag?.id !== event.pointerId) return;
      const distance = drag.x - event.clientX;
      const elapsed = Math.max(event.timeStamp - drag.time, 1);
      const speed = distance / elapsed;
      drag.speed += (speed - drag.speed) * (1 - Math.exp(-elapsed / 28));
      drag.x = event.clientX;
      drag.time = event.timeStamp;
      moveBy(distance);
    }

    function endDrag(event: PointerEvent) {
      if (drag?.id !== event.pointerId) return;
      if (event.type === "pointerup" && !reducedMotion.matches) {
        const speed = drag.speed * Math.exp(-(event.timeStamp - drag.time) / 55);
        momentum = Math.max(-2.1, Math.min(2.1, speed));
        if (Math.abs(speed) < 0.04) momentum = 0;
      }
      drag = null;
      viewportElement!.removeAttribute("data-dragging");
      schedule();
    }

    function finishScroll() {
      if (!nativeScroll) return;
      scrolling = false;
      offset = viewportElement!.scrollLeft - width;
      if (touching) return;
      // Recenter the repeating track only after the browser has finished its momentum.
      moveBy(0);
      schedule();
    }

    function watchForScrollEnd() {
      if (supportsScrollEnd) return;
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(finishScroll, 90);
    }

    function onScroll() {
      if (!nativeScroll || viewportElement!.scrollLeft === writtenScroll) return;
      scrolling = true;
      stepRemaining = 0;
      watchForScrollEnd();
    }

    function startTouch() {
      if (!nativeScroll) return;
      touching = true;
      stepRemaining = 0;
    }

    function endTouch(event: TouchEvent) {
      if (!nativeScroll || event.touches.length) return;
      touching = false;
      if (scrolling) watchForScrollEnd();
      else schedule();
    }

    function onScrollEnd() {
      if (scrolling) finishScroll();
    }

    function updateInputMode() {
      nativeScroll = touchInput.matches;
      viewportElement!.setAttribute("data-ready", nativeScroll ? "native" : "drag");
      window.clearTimeout(scrollEndTimer);
      touching = false;
      scrolling = false;
      momentum = 0;
      drag = null;
      viewportElement!.removeAttribute("data-dragging");
      viewportElement!.scrollLeft = 0;
      trackElement!.style.transform = "";
      measure();
      schedule();
    }

    function updateMotionPreference() {
      if (!reducedMotion.matches) return;
      momentum = 0;
      moveBy(stepRemaining);
      stepRemaining = 0;
    }

    stepByPhoto.current = (direction) => {
      momentum = 0;
      const distance = direction * width / photos.length;
      if (reducedMotion.matches) {
        moveBy(distance);
      } else {
        stepRemaining += distance;
        schedule();
      }
    };

    const resize = new ResizeObserver(measure);
    resize.observe(groupElement);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    intersection.observe(viewportElement);
    updateInputMode();
    reducedMotion.addEventListener("change", updateMotionPreference);
    touchInput.addEventListener("change", updateInputMode);
    viewportElement.addEventListener("scroll", onScroll, { passive: true });
    viewportElement.addEventListener("scrollend", onScrollEnd);
    viewportElement.addEventListener("touchstart", startTouch, { passive: true });
    viewportElement.addEventListener("touchend", endTouch, { passive: true });
    viewportElement.addEventListener("touchcancel", endTouch, { passive: true });
    viewportElement.addEventListener("pointerdown", startDrag);
    viewportElement.addEventListener("pointermove", dragBy);
    viewportElement.addEventListener("pointerup", endDrag);
    viewportElement.addEventListener("pointercancel", endDrag);
    viewportElement.addEventListener("lostpointercapture", endDrag);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollEndTimer);
      resize.disconnect();
      intersection.disconnect();
      stepByPhoto.current = null;
      reducedMotion.removeEventListener("change", updateMotionPreference);
      touchInput.removeEventListener("change", updateInputMode);
      viewportElement.removeEventListener("scroll", onScroll);
      viewportElement.removeEventListener("scrollend", onScrollEnd);
      viewportElement.removeEventListener("touchstart", startTouch);
      viewportElement.removeEventListener("touchend", endTouch);
      viewportElement.removeEventListener("touchcancel", endTouch);
      viewportElement.removeEventListener("pointerdown", startDrag);
      viewportElement.removeEventListener("pointermove", dragBy);
      viewportElement.removeEventListener("pointerup", endDrag);
      viewportElement.removeEventListener("pointercancel", endDrag);
      viewportElement.removeEventListener("lostpointercapture", endDrag);
      viewportElement.removeAttribute("data-ready");
      viewportElement.removeAttribute("data-dragging");
      trackElement.style.transform = "";
    };
  }, []);

  return (
    <div className="guide-carousel" role="group" aria-label={labels.label}>
      <div className="guide-carousel-viewport" ref={viewport}>
        <div className="guide-carousel-track" ref={track}>
          {["leading", "original", "trailing"].map((position) => (
            <ul
              className={`guide-carousel-photos${position === "leading" ? " guide-carousel-leading" : position === "trailing" ? " guide-carousel-duplicate" : ""}`}
              key={position}
              ref={position === "original" ? group : undefined}
              aria-hidden={position !== "original" || undefined}
            >
              {photos.map(([file, pt, en]) => (
                <li key={file}>
                  <Image
                    src={`/photos/yakiniku/${file}.webp`}
                    alt={position === "original" ? (locale === "pt" ? pt : en) : ""}
                    fill
                    draggable={false}
                    sizes="(max-width: 750px) 79vw, (max-width: 1440px) 34vw, 490px"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="guide-carousel-controls">
        <button type="button" aria-label={labels.previous} onClick={() => stepByPhoto.current?.(-1)}><Icon name="left" /></button>
        <button type="button" aria-label={labels.next} onClick={() => stepByPhoto.current?.(1)}><Icon name="right" /></button>
      </div>
    </div>
  );
}
