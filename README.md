# moizxsec.com

Personal security-research portfolio. Vulnerability disclosures, offensive engineering
writeups, and class-of-vuln deep dives.

Built with [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/) + MDX.

## Local development

```bash
bun install
bun astro dev
```

Site runs at `http://localhost:4321`.

## Build

```bash
bun astro build
```

Static output lands in `dist/`. Deploy to any static host (Cloudflare Pages, GitHub Pages,
Vercel, Netlify).

## Structure

```
src/
├── content/writeups/   # MDX writeups (schema in content/config.ts)
├── components/         # Astro components (Header, Footer, WriteupCard, ...)
├── layouts/            # BaseLayout, WriteupLayout
├── pages/              # Route entries
└── styles/global.css   # Typography + theme

public/images/<slug>/   # Per-writeup figures
```

## License

Content (writeups, copy): all rights reserved.
Site source (layouts, components, styles): MIT.
