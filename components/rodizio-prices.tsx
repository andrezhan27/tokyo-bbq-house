import { copy, type Locale } from "../lib/site";

export function RodizioPrices({ locale }: { locale: Locale }) {
  const { lang, priceGroups, rodizioHours, drinksIncludedLabel, drinksIncluded } = copy[locale];
  const euro = new Intl.NumberFormat(lang, { style: "currency", currency: "EUR" });

  return (
    <div className="rodizio-rates">
      <p className="rodizio-inclusions">
        <strong>{drinksIncludedLabel}</strong>
        {drinksIncluded}
      </p>
      {priceGroups.map(({ days, holidayNote, rates }) => (
        <div className="rodizio-price-group" key={days}>
          <h3 className="rodizio-price-days">
            {days}
            {holidayNote && <span>{holidayNote}</span>}
          </h3>
          <dl className="prices">
            {rates.map(({ label, amount }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{euro.format(amount)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <p className="rodizio-hours">{rodizioHours.join(" · ")}</p>
    </div>
  );
}
