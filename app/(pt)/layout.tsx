import type { ReactNode } from "react";
import "../globals.css";

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-PT"><body>{children}</body></html>;
}
