import { siteMetadata } from "../../../components/restaurant-site";
import { YakinikuGuide } from "../../../components/yakiniku-guide";

export const metadata = siteMetadata("pt", true);

export default function Page() {
  return <YakinikuGuide locale="pt" />;
}
