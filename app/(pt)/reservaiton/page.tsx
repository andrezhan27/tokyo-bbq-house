import type { Metadata } from "next";
import { SiteFrame } from "../../../components/restaurant-site";
import { restaurant } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Reservar mesa | Tokyo BBQ House",
  description: "Reserva uma mesa no Tokyo BBQ House em Lisboa.",
};

export default function Page() {
  return (
    <SiteFrame locale="pt" reservation>
      <iframe
        className="reservation-frame"
        src={restaurant.reservationUrl}
        title="Reservas no Tokyo BBQ House"
      />
    </SiteFrame>
  );
}
