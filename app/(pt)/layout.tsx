import type { ReactNode } from "react";
import { NewYearsEvePopup } from "../../components/new-years-eve-popup";
import "../globals.css";

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        {children}
        <NewYearsEvePopup locale="pt" />
      </body>
    </html>
  );
}
