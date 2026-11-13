# Tokyo BBQ House Lisboa

A bilingual Next.js 16 site using the restaurant’s original photography.

## Development

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Portuguese is at `/` and English is at `/en/`.

Run `npm run build` to generate the static site in `out/`.

Restaurant links, prices and translations live in `lib/site.ts`. The reservation page at `/reservaiton/` embeds the restaurant’s Intelis booking form.
