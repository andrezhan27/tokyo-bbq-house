import type { SVGProps } from "react";

type IconName = "arrow" | "external" | "down" | "chevron-down" | "phone" | "pin" | "instagram" | "mail" | "menu" | "close" | "left" | "right" | "calendar";

const paths: Record<IconName, string> = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  external: "M6 18 18 6M7 6h11v11",
  down: "M12 4v15m-6-6 6 6 6-6",
  "chevron-down": "m5 9 7 7 7-7",
  phone: "M7 3H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3l-5-2-1.5 2a14 14 0 0 1-7.5-7.5L9 8 7 3Z",
  pin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Zm-5.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1.5-5.5h.01",
  mail: "M3 5h18v14H3zm0 1 9 7 9-7",
  menu: "M3 7h18M3 12h18M3 17h18",
  close: "m5 5 14 14M19 5 5 19",
  left: "m15 5-7 7 7 7",
  right: "m9 5 7 7-7 7",
  calendar: "M4 6h16v15H4zm0 5h16M8 3v5m8-5v5",
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
