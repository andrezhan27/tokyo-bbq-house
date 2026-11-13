import type { Locale } from "./site";
import items from "./menu-items.json";

type Localized = Record<Locale, string>;
export type MenuItem = { id: string; name: Localized };
type Section = keyof typeof items;

const chapters: { id: Section; name: Localized; marker: string; counts: number[] }[] = [
  { id: "starters", name: { pt: "Entradas", en: "Starters" }, marker: "前菜", counts: [6, 6] },
  { id: "beef", name: { pt: "Cortes de vaca", en: "Beef cuts" }, marker: "牛肉", counts: [5, 5, 5, 5] },
  { id: "pork", name: { pt: "Porco e cordeiro", en: "Pork & lamb" }, marker: "豚肉", counts: [5, 5] },
  { id: "chicken", name: { pt: "Frango", en: "Chicken" }, marker: "鶏肉", counts: [5] },
  { id: "seafood", name: { pt: "Peixe e marisco", en: "Fish & seafood" }, marker: "魚介", counts: [4, 3] },
  { id: "rice", name: { pt: "Massas e arroz", en: "Noodles & rice" }, marker: "麺・米", counts: [5, 4] },
  { id: "sides", name: { pt: "Acompanhamentos", en: "Sides" }, marker: "野菜", counts: [5, 5, 4] },
  { id: "sauces", name: { pt: "Molhos e temperos", en: "Sauces & seasonings" }, marker: "たれ", counts: [4, 3] },
  { id: "desserts", name: { pt: "Sobremesas", en: "Desserts" }, marker: "甘味", counts: [6] },
  { id: "drinks", name: { pt: "Bebidas", en: "Drinks" }, marker: "飲み物", counts: [6] },
];

export type MenuLeaf =
  | { kind: "cover" | "contents" | "back" }
  | {
      kind: "dishes";
      section: Section;
      name: Localized;
      marker: string;
      chapter: number;
      part: number;
      parts: number;
      items: MenuItem[];
    };

export const menuPages: MenuLeaf[] = [{ kind: "cover" }, { kind: "contents" }];
export const menuSections = chapters.map(({ id, name, marker, counts }, index) => {
  const page = menuPages.length;
  const dishes = items[id].map(([id, pt, en]) => ({ id, name: { pt, en } }));
  let offset = 0;

  counts.forEach((count, part) => {
    menuPages.push({
      kind: "dishes", section: id, name, marker, chapter: index + 1,
      part: part + 1, parts: counts.length, items: dishes.slice(offset, offset + count),
    });
    offset += count;
  });

  return { id, name, page };
});

menuPages.push({ kind: "back" });
