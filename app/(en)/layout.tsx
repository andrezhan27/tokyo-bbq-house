import type { ReactNode } from "react";
import { NewYearsEvePopup } from "../../components/new-years-eve-popup";
import "../globals.css";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NewYearsEvePopup locale="en" />
      </body>
    </html>
  );
}
