# Platinum Marketing Agency: website

Scroll-driven, wireframe 3D marketing site for platinummarketingagency.co.uk.
Next.js 16 (App Router) · TypeScript · Tailwind 4 · React Three Fiber · GSAP + ScrollTrigger · Lenis.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
npm run start      # serve the production build
npm run lint
npm run fallback   # regenerate public/street-fallback.svg after changing the 3D scene
```

## Editing

| What | Where |
|---|---|
| All page copy, prices, contact details, SEO title/description | `lib/content.ts` |
| Privacy policy and terms | `lib/legal.ts` |
| Brand colours (CSS variables) | `app/globals.css` (`:root`) |
| Camera path (one keyframe per story beat) | `components/scene/cameraPath.ts` |
| Which section moves the camera to which keyframe | `SECTION_KEYS` in `lib/scroll.ts` |
| Street / buildings / skyline geometry | `components/scene/geometry.ts`, `buildings.ts` |

The scene plan and camera notes are in `docs/scene-plan.md`.

### Dev-only URL switches (ignored in production)

- `?static`: force the static wireframe fallback instead of WebGL.
- In the browser console: `__scene` (scene state, e.g. `__scene.heroLit = 1`), `__st` (ScrollTrigger), `__three()` (R3F state).

## How it degrades

- **Reduced motion** (OS setting): **not honoured by choice**; every visitor gets the full fly-through. To honour it, set `RESPECT_REDUCED_MOTION = true` in `lib/motion.ts`: reduced-motion visitors then get no smooth scroll, reveals, scrambles or streaks, and the camera holds one framed shot per section, changing behind a short fade.
- **Phones / touch**: lighter scene (shorter street, no bloom or parallax), and it only loads after the first scroll/touch, so it never costs page-load time.
- **No WebGL, ≤2 CPU cores, ≤2 GB memory, data-saver, or a WebGL crash**: `public/street-fallback.svg`, a projection of the same 3D geometry.
- All copy is real HTML, fully readable without JavaScript.

## Before launch: checklist

- [ ] Confirm the 7 FAQ answers marked `// TODO: confirm` in `lib/content.ts` (only "How quickly…" came from the old site).
- [ ] Confirm the case-study paragraph in `lib/content.ts`.
- [ ] Have `lib/legal.ts` reviewed and fill in every `[TODO: …]` (they show on the page until you do).
- [ ] Optional: replace the mock browser window in `components/sections/CaseStudy.tsx` with a real screenshot of the Bristol Spark site.

## Repositories and deploys (current setup)

- **Vercel deploys from** `helloplatinummarketing-png/platinumweb` (private). Every push to its `main` builds and publishes https://platinumweb.vercel.app automatically (Vercel team **platinum**, project `platinumweb`).
- `awelloaustine-pixel/platinumweb` (public) holds the same history. In this folder the remotes are `vercel-copy` (deploys) and `origin`. Push to both to keep them in sync:
  ```bash
  git push vercel-copy main && git push origin main
  ```
- `platinummarketingagency.co.uk` is still on the old site in the **Platinum marketing** team; moving it is the last step to go live (see below).

## Deploy to Vercel (original first-time steps)

1. **Put the code on GitHub.** In `platinum-site/`:
   ```bash
   git init && git add -A && git commit -m "Platinum Marketing Agency site"
   ```
   Create an empty repo on GitHub, then `git remote add origin <url>` and `git push -u origin main`.
2. **Import into Vercel.** vercel.com → Add New → Project → pick the repo. Framework is detected as Next.js; no environment variables are needed. Deploy.
3. **Check the preview URL** (`*.vercel.app`): scroll the whole page, open /privacy and /terms, and run PageSpeed Insights (pagespeed.web.dev) on it for real mobile scores.

## Point platinummarketingagency.co.uk at it

1. In the Vercel project: **Settings → Domains → Add** `platinummarketingagency.co.uk`, and also add `www.platinummarketingagency.co.uk` set to **redirect to** the apex domain (the canonical URL and sitemap use the non-www address).
   - If the current live site is *also* on Vercel, first remove the domain from that old project (Settings → Domains → Remove), then add it here.
2. Vercel then shows the exact DNS records to create. At your domain registrar's DNS settings, typically:
   - `A` record, host `@` → the IP Vercel shows (commonly `76.76.21.21`)
   - `CNAME` record, host `www` → the target Vercel shows (commonly `cname.vercel-dns.com`)
   - Remove any old `A`/`CNAME` records for `@` and `www` that point at the previous host.
   - Leave MX (email) records alone.
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically once the records resolve.
4. After it's live: submit `https://platinummarketingagency.co.uk/sitemap.xml` in Google Search Console, and check the share card at opengraph.xyz or in a WhatsApp/LinkedIn message preview.
