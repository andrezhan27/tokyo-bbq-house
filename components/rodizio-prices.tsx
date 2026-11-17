import { copy, type Locale } from "../lib/site";

export function RodizioPrices({ locale }: { locale: Locale }) {
  const { lang, prices } = copy[locale];
  const euro = new Intl.NumberFormat(lang, { style: "currency", currency: "EUR" });

  return (
    <dl className="prices">
      {prices.map(({ audience, days, hours, amount }) => (
        <div key={audience}>
          <dt>
            {audience}
            <span>{days}</span>
            <span>{hours}</span>
          </dt>
          <dd>{euro.format(amount)}</dd>
        </div>
      ))}
    </dl>
  );
}
