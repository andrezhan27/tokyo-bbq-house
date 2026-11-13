import { MenuBook, menuMetadata } from "../../../../components/menu-book";

export const metadata = menuMetadata("en");

export default function MenuPage() {
  return <MenuBook locale="en" />;
}
