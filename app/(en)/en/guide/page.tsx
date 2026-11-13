import { siteMetadata } from "../../../../components/restaurant-site";
import { YakinikuGuide } from "../../../../components/yakiniku-guide";

export const metadata = siteMetadata("en", true);

export default function Page() {
  return <YakinikuGuide locale="en" />;
}
