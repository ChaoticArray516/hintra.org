# Build-output checks

Run after `npm run build`:

```bash
npm run check
```

The entrypoint prints one `PASS`/`FAIL` line per assertion and exits 1 on any failure. It reads `dist/` only and never repairs or rewrites output.

## Assertion map

- `render.mjs`: R-01 route set; R-02 canonical; R-03 lang; R-04 hreflang; R-05 sitemap/robots; R-06 script and hydration whitelist; R-07 JSON-LD parsing, IDs, and redlines; R-08 internal links; R-09 forbidden rendering; R-11 old domains and banned copy; R-12 static 404 contract.
- `seo.mjs`: S-01 route/word budgets; S-02 exact final TDK/H1; S-03 superseded copy; S-04 page-scoped facts and redlines; S-05 Schema types, game boundary, and breadcrumb source; S-07 internal-link minimum; S-08 hreflang closure; S-09 sitemap; S-10 aliases; S-11 Geography; S-12 Noillirk; S-13 absent SEO dates.
- `faq-diff.mjs`: S-06 compares visible summary/answer sequences with `mainEntity`. Only leading/trailing whitespace is trimmed; HTML entities are decoded and punctuation/case remain significant.
- `budget.mjs`: R-10 file count, largest file, JavaScript=0 and gzip measurements; ASSETS verifies production files and PNG dimensions.

Occurrence and structure checks use arrays, parsed node sequences, or `matchAll`, never line-oriented `grep -c` counts.

## Counting and scoped exceptions

Word counts include only elements marked `data-copy`: final lead, H2/body copy, home entry cards/followup, and FAQ. They exclude Title, Meta, H1, navigation, Footer, JSON-LD, and duplicated visual component labels.

Noillirk's own 30-second fact is valid only on `/noillirk/`. Geography's final copy explicitly permits `EXPEDITION #1`; the TDK check still bans `#1` in Title/Meta/H1. The identical es/pt Title values are intentional final-copy values in different languages; exact per-page expectations are asserted instead of forcing those two titles apart.

R-12's production HTTP status, S-13's repeat-build hash comparison, browser checks, TLS, and Lighthouse are external acceptance steps rather than claims made by this read-only script.
