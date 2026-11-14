import type { Locale } from "./site";
import items from "./menu-items.json";
import photos from "./menu-photos.json";

type Localized = Record<Locale, string>;
export type MenuItem = { id: string; name: Localized; showPackaging: boolean };
type Section = keyof typeof items;
const packagedItems = new Set(photos.packages);

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
  { id: "wine", name: { pt: "Vinhos", en: "Wines" }, marker: "ワイン" },
  { id: "sake", name: { pt: "Saké e bebidas japonesas", en: "Sake & Japanese drinks" }, marker: "日本酒" },
  { id: "spirits", name: { pt: "Destilados", en: "Spirits" }, marker: "蒸留酒" },
  { id: "coffee", name: { pt: "Café e chá", en: "Coffee & tea" }, marker: "お茶" },
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
  const dishes = items[id].map(([id, pt, en]) => ({
    id, name: { pt, en }, showPackaging: packagedItems.has(id),
  }));
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
