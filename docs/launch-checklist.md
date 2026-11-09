# Hintra launch checklist

This checklist does not authorize account changes. The user or release reviewer performs Workers Builds authorization, custom-domain/DNS work, production deployment, GSC, and rollback.

## Pre-deploy gate

- [ ] Node is `>=22.23.4 <23`.
- [ ] `npm ci` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run check` exits 0.
- [ ] Repeat-build HTML and sitemap hashes are identical.
- [ ] Workers Builds build command is `npm ci && npm run typecheck && npm run build && npm run check`; deploy command is `npx wrangler deploy` (Builds default).
- [ ] No failed build or check is allowed to replace the last successful deployment.

## Verified build evidence (2026-11-04)

- Node: `v22.23.4` (isolated official package, SHA256 verified)
- npm: `11.9.0`
- `npm ci`: 298 packages, 0 vulnerabilities
- `npm run typecheck`: 39 files, 0 errors / 0 warnings / 0 hints
- `npm run build`: 7 pages, exit 0
- `npm run check`: 26 passed / 0 failed
- Two-build dist hash: `7b82658c94a4dbdb0e0511c264969d35e1e4fd94e839ce2a83e2e188ad8c29e0` (identical)

## Production deployment receipt (2026-11-04)

- Worker name: `hintra`
- Production URL: `https://hintra.archtorrent017.workers.dev`
- Version ID: `55117573-2a2a-4d5e-b53f-911108d2d11a`
- Custom domain: `hintra.org` attached to service `hintra` (enabled)
- HTTP → HTTPS: `301` to `https://hintra.org/` after enabling Always Use HTTPS
- `www.hintra.org` → apex: Cloudflare Redirect Rule verified `301`; root and `/krillion-unlimited/?x=1` preserve path/query; no 522
- Six canonical routes: all `200` on `https://hintra.org/`
- Missing path: real `404`
- `/krillion-unlimited`: `307` to `/krillion-unlimited/`
- `robots.txt`, `sitemap-index.xml`, `og.png`, `favicon.svg`: `200`
- Sitemap: six URLs, no lastmod
- GSC sitemap submission: **user-reported complete** (not independently verified in this session)
- Remaining: W1 indexing observation; W2–W4 query review before 3C/sports

## 3D deployment receipt (2026-11-09) — Batch 3D 第一阶段（3d-01）

- Worker name: `hintra` (unchanged)
- Production URL: `https://hintra.archtorrent017.workers.dev` (unchanged)
- **New Version ID**: `67522650-d209-4348-8003-8b6fdea7fcb0`
- Deploy command: `npx wrangler deploy` (Workers static assets; `wrangler.jsonc` unchanged)
- Node: `v22.23.4` isolated; typecheck 42 files / 0 errors; build 8 pages (7 + 404); check `26 passed; 0 failed`; two-build dist hash `42626FAA…` identical
- New route `/one-in-a-krillion/`: `200`; canonical self-ref; no hreflang; `307` trailing-slash redirect
- Seven canonical routes all `200`; sitemap `7` URLs (no lastmod); `one-in-a-krillion` present in sitemap
- Word budget: `/one-in-a-krillion/` relaxed `450–560 → 450–620` (direction 1, machine-count 608)
- Copy audit: `english-marketing-calibrator` audit-only → 0 P0 Chinglish/AI hits
- **Remaining (phase 2, 2–3 days later)**: 3d-02 unlimited 改造 (块 A/C/D + F53) — NOT in this deploy
- Rollback drill: still pending (record version IDs in the section below)

## Production acceptance

Record the production version ID, UTC time, command/result evidence, and reviewer for each run.

- [ ] `/` returns 200.
- [ ] `/krillion-unlimited/` returns 200.
- [ ] `/noillirk/` returns 200.
- [ ] `/krillion-geography/` returns 200.
- [ ] `/es/krillion-unlimited/` returns 200.
- [ ] `/pt/krillion-unlimited/` returns 200.
- [ ] `/krillion-unlimited` returns 3xx with `Location: /krillion-unlimited/`.
- [ ] A random nonexistent path returns a real 404 with the custom page.
- [ ] `http://hintra.org/` redirects to HTTPS and the TLS chain is valid.
- [ ] `robots.txt` and `sitemap-index.xml` return 200; the sitemap contains exactly six URLs and no lastmod.
- [ ] Canonical, OG URL, Schema URL, internal links, and sitemap use the same trailing-slash form.
- [ ] Unlimited en/es/pt hreflang sets close with self-reference and x-default; other pages have no alternates.
- [ ] All six pages retain complete content, navigation, and FAQ with JavaScript disabled.
- [ ] favicon.svg, og.png, logo-512.png, and brand-lockup.svg are accessible.
- [ ] Mobile 4G/Lighthouse results meet LCP ≤2.0s, CLS ≤0.05, TTFB ≤0.8s, SEO ≥95, Accessibility ≥95; INP ≤200ms is verified from field data or explicitly left unverified.
- [ ] The www policy has been explicitly confirmed before any www alias is configured.

## Rollback drill

1. Record the current production version ID and the previous known-good version ID.
2. In Workers version history, roll back to the previous known-good version.
3. Record UTC time and version ID; curl the six routes and a nonexistent path, and compare a page-specific H1 with the expected old version.
4. Switch back to the current production version and repeat the checks.
5. Record both operations, evidence, and reviewer sign-off below.

- Current production version ID:
- Previous known-good version ID:
- Rollback time / result:
- Restore time / result:
- Reviewer:

## GSC after technical acceptance

- [ ] The production domain and all technical checks pass before GSC submission.
- [ ] Submit `https://hintra.org/sitemap-index.xml`.
- [ ] Request indexing for only the six production URLs.
- [ ] W1 reviews indexing only; W2–W4 reviews real queries before considering later batches.

## Batch 3D · stage 1 (3d-00/3d-01)

Do not begin content work until M1 is present and `3d_copy_final.md` contains the fourth home card description, revised `entriesFollowup`, and the new page's `aboutDescription`.

- [ ] `routes.oneInAKrillion` and the single-page keyword mapping are registered.
- [ ] `/one-in-a-krillion/` is the only new indexable route; there are exactly seven index routes plus `404.html`.
- [ ] The new page copy and four FAQs match `3d_copy_final.md` verbatim; visible FAQs and Schema have the same source.
- [ ] The new page has canonical/OG/Schema URLs in the same form, no hreflang or LangSwitch, and the four required Schema types.
- [ ] The home page has four cards, no obsolete Three/followup copy, four desktop columns, and no 390px horizontal overflow.
- [ ] Sitemap contains exactly seven URLs and no lastmod.
- [ ] Node, npm ci, typecheck, build, check, verbatim diff, and repeat-build hashes have recorded evidence.
- [ ] The user deploys stage 1 and records the production version ID, UTC time, and reviewer below.
- [ ] All seven production routes return 200; a missing path returns a real 404; a representative no-slash URL redirects to the trailing-slash URL.
- [ ] After technical acceptance, request indexing only once for `https://hintra.org/one-in-a-krillion/`.
- [ ] Wait 2–3 days after the new page is live before starting stage 2.

Stage 1 production version ID:
Stage 1 UTC time / result:
Stage 1 reviewer:

## Batch 3D · stage 2 (3d-02)

- [ ] Stage 1 production acceptance is complete and the 2–3 day separation has elapsed.
- [ ] English Unlimited block A, block C, and FAQ-3 match `3d_copy_final.md`; all other copy remains unchanged.
- [ ] Three full aliases and the complete multiplayer disclaimer remain in the English page; es/pt are unchanged.
- [ ] `UnlimitedContent.astro` no longer uses `page.sections[2]`; en/es/pt official-entry headings still render.
- [ ] English Unlimited remains within 475–615 words and retains five FAQs.
- [ ] Repeat the full local gate and record the second production version ID, UTC time, and reviewer below.
- [ ] Do not request indexing again for the existing English Unlimited URL.

Stage 2 production version ID:
Stage 2 UTC time / result:
Stage 2 reviewer:

## Batch 3D rollback drill record

The user or release reviewer performs both operations in Workers version history. Do not mark this record complete from a local build.

- Release stage:
- Current production version ID:
- Previous known-good version ID:
- Rollback UTC time / version ID / result:
- Seven-route and real-404 evidence after rollback:
- Restore UTC time / version ID / result:
- Seven-route and real-404 evidence after restore:
- Reviewer sign-off:
