# Tokyo BBQ House Lisboa

A bilingual Next.js 16 site using the restaurant’s original photography.

## Development

Use Node.js 22 and npm. If you use nvm, run `nvm use`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Portuguese is at `/` and English is at `/en/`.

## Production build

Run `npm ci` and `npm run build` from a fresh checkout. Next.js exports all pages and assets to `out/`. To preview the export locally with Python 3, run `python3 -m http.server 3000 --bind 127.0.0.1 --directory out`.

## Deploy from GitHub to Vercel

1. Push the source and `package-lock.json` to your GitHub repository.
2. In Vercel, import the repository and select the **Next.js** framework preset. Use the repository root and leave the install command, build command, and output directory at their defaults. Vercel detects the static export from `next.config.ts`.
3. Deploy. The build uses Node.js 22 from `package.json` and needs no environment variables or server functions. Vercel builds production from the selected production branch and creates previews for other branches.

Restaurant links, prices and translations live in `lib/site.ts`. The reservation page at `/reservation/` embeds the restaurant’s Intelis booking form.
