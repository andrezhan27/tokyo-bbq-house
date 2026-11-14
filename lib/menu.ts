import type { Locale } from "./site";
import items from "./menu-items.json";

type Localized = Record<Locale, string>;
export type MenuItem = { id: string; name: Localized };
type Section = keyof typeof items;

const dishesPerPage = 6;

const chapters: { id: Section; name: Localized; marker: string }[] = [
  { id: "starters", name: { pt: "Entradas", en: "Starters" }, marker: "前菜" },
  { id: "beef", name: { pt: "Cortes de vaca", en: "Beef cuts" }, marker: "牛肉" },
  { id: "pork", name: { pt: "Porco e cordeiro", en: "Pork & lamb" }, marker: "豚肉" },
  { id: "chicken", name: { pt: "Frango", en: "Chicken" }, marker: "鶏肉" },
  { id: "seafood", name: { pt: "Peixe e marisco", en: "Fish & seafood" }, marker: "魚介" },
  { id: "rice", name: { pt: "Massas e arroz", en: "Noodles & rice" }, marker: "麺・米" },
  { id: "sides", name: { pt: "Acompanhamentos", en: "Sides" }, marker: "野菜" },
  { id: "sauces", name: { pt: "Molhos e temperos", en: "Sauces & seasonings" }, marker: "たれ" },
  { id: "desserts", name: { pt: "Sobremesas", en: "Desserts" }, marker: "甘味" },
  { id: "drinks", name: { pt: "Bebidas", en: "Drinks" }, marker: "飲み物" },
];

export type MenuLeaf =
  | { kind: "cover" | "contents" | "back" }
  | {
      kind: "dishes";
      section: Section;
      name: Localized;
      marker: string;
      part: number;
      parts: number;
      items: MenuItem[];
    };

export const menuPages: MenuLeaf[] = [{ kind: "cover" }, { kind: "contents" }];
export const menuSections = chapters.map(({ id, name, marker }) => {
  const page = menuPages.length;
  const dishes = items[id].map(([id, pt, en]) => ({ id, name: { pt, en } }));
  const parts = Math.ceil(dishes.length / dishesPerPage);

  for (let part = 0; part < parts; part++) {
    const offset = part * dishesPerPage;
    menuPages.push({
      kind: "dishes", section: id, name, marker,
      part: part + 1, parts, items: dishes.slice(offset, offset + dishesPerPage),
    });
  }

  return { id, name, page };
});

menuPages.push({ kind: "back" });
