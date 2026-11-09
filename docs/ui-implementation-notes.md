# UI implementation notes

## Direction and source

Implemented Direction A / Field Guide from `../prompts/dev_piplines/ui_design/uiux/uiux_design_system.md` and the five page specifications. Direction B and `palette-2/` are not used.

`src/styles/global.css` is the only Token table: warm paper `#F6F1E7`, surfaces `#F7F3EB`/`#F0EADF`, ink `#1E2733`, muted `#4D5860`, border `#D9D1C5`, amber `#B96A22`, small amber text `#8F4F17`, and on-dark `#F6F1E7`. It uses the specified system font stacks, type scale, 4–80px spacing, 1160px container, 820px reading measure, 768px breakpoint, 1px rules, 3px quote/focus accents, 44/48px targets, and reduced-motion behavior.

## Component map

- `SiteHeader`/`SiteFooter`: all six indexable pages; three English content links and the fixed independent-operation disclaimer. No mobile drawer.
- `Breadcrumbs`: five content pages, sharing arrays with `BreadcrumbList`; absent on home and 404.
- `LangSwitch`: only unlimited en/es/pt, with fixed English/Español/Português order and `aria-current`.
- `FactCard`: unlimited name comparison, Noillirk round/scoring and direction comparison, Geography 30 Expeditions.
- `QuoteBlock`: Noillirk's two complete public statements.
- `OfficialLink`: each content page's real external entry, static new-tab note, `target="_blank" rel="noopener"`.
- `FaqList`: native details/summary, all collapsed by default, with the same FAQ array used by Schema.
- `RelatedLinks`: English unlimited only, linking the three real English entries; no nonexistent translated pages.
- `UnlimitedContent`: shared three-language composition using separate final-copy data; no runtime translation.

## Intentional differences from previews

- All leads, H1 values, body sections, and FAQ use the complete final attachment rather than shortened preview copy.
- Every unlimited language displays the switch, including English; pt uses one Español label and Portuguese body copy.
- FAQ previews may show expanded/sample items; implementation renders all required items collapsed.
- Home uses final card copy and does not add preview CTA/decorative slogans as site content.
- Noillirk retains both complete statements and all five FAQ; Geography retains all six regions, 30 Expeditions, the allowed EXPEDITION #1 example, and four FAQ.
- 404 removes global navigation and Footer links; `Hintra home` is its only anchor.

## Assets and boundaries

Only root A palette files are copied to `public/`: favicon.svg, brand-lockup.svg, logo-monochrome.svg, logo-192.png, logo-512.png, and og.png. Header uses the monochrome mark with system-text Hintra; home uses a lightweight decorative SVG. Organization.logo uses the square 512px PNG, while social metadata uses the 1200×630 og.png.

The source favicon is only partially `currentColor`-ready and is copied unchanged. No favicon.ico or apple-touch-icon.png was delivered, so neither is generated or referenced. No preview images, palette-2 files, zip archives, third-party fonts, UI frameworks, executable UI scripts, or game imagery are used.

No design selections remain open. Production-only browser/performance results and any user-operated launch steps are recorded separately in the final verification report and launch checklist.
