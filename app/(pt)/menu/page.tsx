import { MenuBook, menuMetadata } from "../../../components/menu-book";

export const metadata = menuMetadata("pt");

export default function MenuPage() {
  return <MenuBook locale="pt" />;
}
