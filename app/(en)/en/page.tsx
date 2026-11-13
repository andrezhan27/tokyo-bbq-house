import { HomePage, siteMetadata } from "../../../components/restaurant-site";

export const metadata = siteMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
