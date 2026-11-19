import type { Locale } from "./site";
import items from "./menu-items.json";
import photos from "./menu-photos.json";

type Localized = Record<Locale, string>;
export type MenuItem = { id: string; name: Localized; showPackaging: boolean };
type Section = keyof typeof items;
const packagedItems = new Set(photos.packages);
const includedDrinks = new Set([
  "coca-cola", "coca-cola-zero", "sprite", "fanta-orange",
  "iced-tea-lemon", "iced-tea-mango", "iced-tea-peach",
  "caneca", "tulipa", "imperial", "red-wine", "white-wine", "champagne",
]);

const dishesPerPage = 6;

const chapters: { id: Section; name: Localized; marker: string }[] = [
  { id: "drinks", name: { pt: "Bebidas", en: "Drinks" }, marker: "飲み物" },
  { id: "wine", name: { pt: "Vinhos", en: "Wines" }, marker: "ワイン" },
  { id: "sauces", name: { pt: "Molhos e temperos", en: "Sauces & seasonings" }, marker: "たれ" },
  { id: "starters", name: { pt: "Entradas", en: "Starters" }, marker: "前菜" },
  { id: "fried", name: { pt: "Fritos", en: "Fried dishes" }, marker: "揚げ物" },
  { id: "rice", name: { pt: "Massas e arroz", en: "Noodles & rice" }, marker: "麺・米" },
  { id: "beef", name: { pt: "Cortes de vaca", en: "Beef cuts" }, marker: "牛肉" },
  { id: "chicken", name: { pt: "Frango", en: "Chicken" }, marker: "鶏肉" },
  { id: "pork", name: { pt: "Porco", en: "Pork" }, marker: "豚肉" },
  { id: "lamb", name: { pt: "Cordeiro", en: "Lamb" }, marker: "羊肉" },
  { id: "seafood", name: { pt: "Peixe e marisco", en: "Fish & seafood" }, marker: "魚介" },
  { id: "sides", name: { pt: "Acompanhamentos", en: "Sides" }, marker: "野菜" },
  { id: "desserts", name: { pt: "Sobremesas", en: "Desserts" }, marker: "甘味" },
];

export type MenuLeaf =
  | { kind: "cover" | "contents" | "prices" | "back" }
  | {
      kind: "dishes";
      section: Section;
      name: Localized;
      marker: string;
      part: number;
      parts: number;
      included: boolean;
      items: MenuItem[];
    };

export const menuPages: MenuLeaf[] = [{ kind: "cover" }, { kind: "contents" }];
const pricePage = menuPages.length;
menuPages.push({ kind: "prices" });

const dishSections = chapters.map(({ id, name, marker }) => {
  const page = menuPages.length;
  const dishes = items[id].map(([id, pt, en]) => ({
    id, name: { pt, en }, showPackaging: packagedItems.has(id),
  }));
  const parts = Math.ceil(dishes.length / dishesPerPage);

  for (let offset = 0; offset < dishes.length; offset += dishesPerPage) {
    const pageItems = dishes.slice(offset, offset + dishesPerPage);
    menuPages.push({
      kind: "dishes", section: id, name, marker,
      part: offset / dishesPerPage + 1, parts,
      included: pageItems.every(({ id }) => includedDrinks.has(id)),
      items: pageItems,
    });
  }

  return { id, name, page };
});

export const menuSections = [
  { id: "prices", name: { pt: "Preços do rodízio", en: "Rodízio prices" }, page: pricePage },
  ...dishSections,
];

menuPages.push({ kind: "back" });
