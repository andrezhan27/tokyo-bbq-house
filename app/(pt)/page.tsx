import { HomePage, siteMetadata } from "../../components/restaurant-site";

export const metadata = siteMetadata("pt");

export default function Page() {
  return <HomePage locale="pt" />;
}
