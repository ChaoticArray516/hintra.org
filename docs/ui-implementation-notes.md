# UI implementation notes

## Direction and source

Implemented Direction A / Field Guide from `../prompts/dev_piplines/ui_design/uiux/uiux_design_system.md` and the five page specifications. Direction B and `palette-2/` are not used.

`src/styles/global.css` is the only Token table: warm paper `#F6F1E7`, surfaces `#F7F3EB`/`#F0EADF`, ink `#1E2733`, muted `#4D5860`, border `#D9D1C5`, amber `#B96A22`, small amber text `#8F4F17`, and on-dark `#F6F1E7`. It uses the specified system font stacks, type scale, 4–80px spacing, 1160px container, 820px reading measure, 768px breakpoint, 1px rules, 3px quote/focus accents, 44/48px targets, and reduced-motion behavior.

## Current component map

- `SiteHeader`/`SiteFooter`: eight indexable pages after 3F Release A; four English content links and the fixed independent-operation disclaimer. No mobile drawer. Header navigation is quiet by default; current/hover states use underlines and the current page retains bold text.
- `Breadcrumbs`: seven content pages, sharing arrays with `BreadcrumbList`; absent on home and 404.
- `LangSwitch`: only unlimited en/es/pt, with fixed English/Español/Português order and `aria-current`.
- `FactCard`: unlimited name comparison, Noillirk round/scoring and direction comparison, Geography 30 Expeditions.
- `QuoteBlock`: Noillirk's two complete public statements.
- `OfficialLink`: unlimited en/es/pt, Noillirk, Geography, and the three Krillion Game entries use their real external URLs, static new-tab notes, and `target="_blank" rel="noopener"`.
- `FaqList`: native details/summary, all collapsed by default, with the same FAQ array used by Schema.
- `RelatedLinks`: all five English non-home pages use `relatedEntries(currentPath)` to render four other entries without self-links; es/pt do not render the component. Related-entry text deliberately has no `data-copy`.
- `UnlimitedContent`: shared three-language composition using separate final-copy data; no runtime translation.
- `/one-in-a-krillion/`: uses the shared reading page, four H2 sections, an entry card, four FAQs, RelatedLinks, and a Hintra home link. It has no bespoke preview and does not invent a Hero, LangSwitch, FactCard, or OfficialLink.
- `/krillion-game/`: uses the shared reading page, four H2 sections, three OfficialLink blocks, five FAQs, RelatedLinks, and a Hintra home link. It has no LangSwitch, hreflang, or bespoke visual treatment.

## SOP-3E changes

### P1 · Mobile entry discovery

The mobile home previously placed a 180px decorative brand panel before the entries, leaving `Four places to start` below the initial 390×844 viewport. At `<768px`, `.brand-panel` is now `display: none`. The H1, complete lead, type sizes, DOM order, entry order, and touch targets are unchanged. Desktop retains the brand panel.

### P2 · Restrained amber brand signal

The home Hero now uses an inline 128×128 SVG with the delivered A-palette H geometry. The upright strokes remain `#1E2733`; only the crossbar and dot use `#B96A22`. It adds no text, font request, raster image, production asset, or palette-2 color. Header continues to use `logo-monochrome.svg`.

### P3 · Quiet primary navigation

`.site-nav a` has no default underline. Hover and `aria-current="page"` add an underline; the current page retains 700 weight and a 2px line. The 44px target and 3px amber focus outline remain. Footer presentation was not changed.

### Shared reading and card refinements

- `.reading-page` is now 820px rather than 868px, matching the documented reading measure.
- Desktop `.prose section` padding is 48px; mobile is 40px, replacing 32px/24px spacing.
- English Unlimited RelatedLinks uses 2×2 for four entries rather than a 3+1 arrangement.
- The 44px entry-card link rule now targets only `.entry-card h3 > a`. Inline links in the One in a Krillion entry paragraph retain normal text flow, while home card titles keep their touch target.

## Seventeen-preview comparison and closure

| Preview files | Comparison result and classification |
|---|---|
| `home-desktop-a.png`, `home-mobile-a.png` | Alignment: P1/P2/P3 changes above; four live entry cards retained. Copy-only preview elements remain excluded: shortened lead, eyebrow, 01/02/03, `Read the entry`, decorative English, four feature bullets, and `Independent guide`. Decision: if hiding the decorative panel still fails to expose the entries heading, record the remaining trade-off instead of shrinking copy. |
| `home-desktop-b.png`, `home-mobile-b.png` | Historical Direction B only. Teal is not adopted; layout inspection does not override Direction A or final copy. |
| `unlimited-desktop.png`, `unlimited-mobile.png` | Alignment: 820px reading measure, revised section rhythm, 2×2 RelatedLinks. Copy: LangSwitch, five post-3D H2 sections, five FAQs, and specific OfficialLink label remain; preview omissions and generic CTA are not copied. |
| `unlimited-es.png` | Alignment: shared reading and long-H1 wrapping checks. Copy: Spanish H1/body and three FAQs remain; English preview H1 and sample explanations are not copied. |
| `unlimited-pt.png` | Alignment: same shared checks. Copy: Portuguese body remains; switch is English/Español/Português, not the duplicated preview labels or Spanish body. |
| `noillirk-desktop.png`, `noillirk-mobile.png` | Alignment: shared reading and section rhythm; fact/direction cards become single-column on mobile. Copy: both complete public statements, four H2 sections, and five FAQs remain; shortened quote and two preview FAQs are not copied. |
| `geography-desktop.png`, `geography-mobile.png` | Alignment: shared reading and section rhythm; three desktop/two mobile region columns remain. Copy: six official region names, 30 Expeditions, EXPEDITION #1, and four FAQs remain; no map, design-note sentence, or region links. |
| `states.png` | Alignment: native collapsed/expanded FAQ, visible amber focus, current-language solid/outline states, and distinct OfficialLink are retained and exercised. Preview questions and generic CTA are illustrative only. |
| `404.png` | Alignment: generous left-aligned whitespace and ink button remain. Engineering rule intentionally removes the preview navigation and uses only `Hintra home`, not the preview CTA. |
| `design-system.png` | Token and component-rhythm reference only; no extra copy is imported. |
| `preview-board.png` | Direction and coverage index only; individual previews and written specifications govern the changes above. |

## Intentional differences from previews

- All leads, H1 values, body sections, and FAQ use the complete final attachment rather than shortened preview copy.
- Every unlimited language displays the switch, including English; pt uses one Español label and Portuguese body copy.
- FAQ previews may show expanded/sample items; implementation renders all required items collapsed.
- Home uses final card copy and does not add preview CTA/decorative slogans as site content.
- Noillirk retains both complete statements and all five FAQ; Geography retains all six regions, 30 Expeditions, the allowed EXPEDITION #1 example, and four FAQ.
- One in a Krillion has no bespoke preview and follows only the shared reading-page system.
- 404 removes global navigation and Footer links; `Hintra home` is its only anchor.

## Copy audit boundary

SOP-3E changes no English copy: no H1, lead, card title/description, H2, FAQ, anchor, button label, or decorative text was added, removed, or rewritten. Therefore `english-marketing-calibrator` audit-only is **not applicable** for this implementation; no audit result is fabricated. Any later copy request must stop for an audit-only review before editing.

## Assets and boundaries

Only root A palette files are used in `public/`: favicon.svg, brand-lockup.svg, logo-monochrome.svg, logo-192.png, logo-512.png, and og.png. The inline home Hero SVG reuses the same delivered geometry without creating a production asset. Organization.logo uses the square 512px PNG, while social metadata uses the 1200×630 og.png.

The source favicon is only partially `currentColor`-ready and remains unchanged. No favicon.ico or apple-touch-icon.png is generated or referenced. No preview images, palette-2 files, zip archives, third-party fonts, UI frameworks, executable UI scripts, or game imagery are used.

## SOP-3E verification evidence

Executed with Node `v22.23.4`: `npm ci` installed 298 packages with 0 vulnerabilities; `npm run typecheck` reported 42 files and 0 errors/warnings/hints; `npm run build` produced seven indexable pages plus 404; final `npm run check` reported 26 passed / 0 failed. Two consecutive builds produced the same HTML/XML aggregate SHA-256: `c9f2b69d32db7ce99d41d4fdf2894e546c72667724c0e5b13cfdee18b72d2e5b`.

- All seven routes plus the custom 404 were measured at 390/768/1024/1440px. Content pages had no horizontal overflow: document widths were 390, 753, 1009, and 1425px where vertical scrollbars applied; the 404 used the full viewport width.
- At 390px, prose sections use 40px padding; fact/name cards and RelatedLinks are single-column; Geography regions are two columns. At 768px and above, prose is 48px, home entries are four columns, RelatedLinks are two columns, and regions are three columns. Content reading measure is 820px.
- At 390×844, `Four places to start` begins at 663px and the first card title at 737px, so both are visible in the initial viewport. The complete lead and all type sizes remain unchanged; the decorative mobile brand panel is hidden.
- Desktop Hero contains one amber-stroked crossbar and one amber dot. Primary navigation is `none` by default, `underline` on the current page, and retains its focus outline.
- With page JavaScript disabled, content, LangSwitch, OfficialLink, and FAQs remain complete. FAQ items start collapsed; Space toggled the first item false→true→false. Keyboard focus measured `rgb(185, 106, 34)` / 3px / 2px offset. The Noillirk external button is 48px high with `_blank`/`noopener`.
- The 404 has no site chrome and exactly one `Hintra home` link. es/pt retain their correct localized official-entry headings and language-switch states.

Screenshots reviewed: `temp/hintra-3e-home-mobile.png`, `hintra-3e-home-desktop.png`, `hintra-3e-unlimited-mobile.png`, `hintra-3e-noillirk-mobile.png`, `hintra-3e-geography-mobile.png`, `hintra-3e-one-mobile.png`, and `hintra-3e-404-mobile.png`. Floating controls visible in some captures are browser-extension UI, not site assets.

No English copy changed, so no calibrator audit was required. No production deployment, account operation, or production performance claim is included. Production-only performance results and user-operated launch steps remain in the launch checklist.

## Batch 3F Release A implementation evidence

The home entry grid now uses one column below 768px, three columns at 768–1023px, and five columns from 1024px. The five entries follow `3f_final.md` §2 order. All five English non-home pages render four related entries after filtering the current route; es/pt remain without RelatedLinks.

Executed with Node `v22.23.4`: clean `npm ci` installed 298 packages with 0 vulnerabilities; typecheck covered 46 files with 0 errors/warnings/hints; build produced eight indexable pages plus 404; check reported 27 passed / 0 failed. Two consecutive HTML/XML builds produced aggregate SHA-256 `074b146568cb2294207357bdb114845d9a8eb12be667d4a4afd38975a2cfbd25` using relative path + content. Independent temporary-copy verification and negative checks are recorded in `docs/launch-checklist.md`.

- Home and `/krillion-game/` were reviewed at 390/768/1024/1440px; every other route and 404 were reviewed at 390px. No horizontal overflow was measured. Browser-extension controls visible in screenshots are not site assets.
- At 390×844, `Five places to start` starts at 663px and the `Krillion Game` card title occupies 737–781px, preserving mobile entry discovery without type or touch-target reduction.
- At 768px the entry grid is 3+2; at 1024px all five cards are 293px high and titles wrap naturally; at 1440px the five cards remain one equal-height row.
- Krillion Game has four fixed H2 sections, three 48px official-entry buttons, five FAQs, four related entries, and the current navigation state. Mobile official buttons are full-width and RelatedLinks are single-column.
- With page JavaScript disabled, the hub lead, sections, FAQs, and links remain complete. A native FAQ summary toggled with Space and showed `rgb(185, 106, 34)` / 3px / 2px focus-visible styling.

Screenshots reviewed: `temp/hintra-3f-a-home-*.png`, `hintra-3f-a-hub-*.png`, `hintra-3f-a-unlimited-390.png`, `hintra-3f-a-noillirk-390.png`, `hintra-3f-a-geography-390.png`, `hintra-3f-a-one-390.png`, `hintra-3f-a-es-390.png`, `hintra-3f-a-pt-390.png`, and `hintra-3f-a-404-390.png`.

No production deployment or account operation is included. The hub quantity redline applies to its body and FAQ; the user explicitly retained the shared RelatedLinks summaries under their existing final-copy source.
