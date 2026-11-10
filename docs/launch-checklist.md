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

## 3D deployment receipt (2026-11-09) — Batch 3D（3d-01 + 3d-02 + 3E，F59 合并发布）

> **2026-11-10 更新**：原「两阶段、2~3 天」纪律已作废（F59）。3d-01、3d-02 与 3E 同批上线，生产版本 `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`（v4）。第一阶段版本 `67522650-d209-4348-8003-8b6fdea7fcb0`（v2）为中间态，仅作版本历史留存。

- Worker name: `hintra` (unchanged)
- Production URL: `https://hintra.archtorrent017.workers.dev` (unchanged)
- **Final Version ID**: `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`
- Deploy command: `npx wrangler deploy` (Workers static assets; `wrangler.jsonc` unchanged)
- Node: `v22.23.4` isolated; typecheck 42 files / 0 errors; build 8 pages (7 + 404); check `26 passed; 0 failed`; two-build dist hash `c9f2b69d…2e5b` identical
- New route `/one-in-a-krillion/`: `200`; canonical self-ref; no hreflang; `307` trailing-slash redirect
- Seven canonical routes all `200`; sitemap `7` URLs (no lastmod); `one-in-a-krillion` present in sitemap
- Word budgets: `/one-in-a-krillion/` `450~620`（F58 方向 1，machine-count 608）; unlimited `475~615`（608）
- Copy audit: `english-marketing-calibrator` audit-only → 0 P0 Chinglish/AI hits
- 3E（首页 P1/P2/P3）随本版本上线
- Rollback drill: **completed** — see the two rollback sections below

## Production acceptance

Record the production version ID, UTC time, command/result evidence, and reviewer for each run.

- [ ] `/` returns 200.
- [ ] `/krillion-unlimited/` returns 200.
- [ ] `/noillirk/` returns 200.
- [ ] `/krillion-geography/` returns 200.
- [ ] `/es/krillion-unlimited/` returns 200.
- [ ] `/pt/krillion-unlimited/` returns 200.
- [ ] `/one-in-a-krillion/` returns 200 (3D and later).
- [ ] `/krillion-game/` returns 200 (after 3F Release A).
- [ ] `/krillion-unlimited` returns 3xx with `Location: /krillion-unlimited/`.
- [ ] A random nonexistent path returns a real 404 with the custom page.
- [ ] `http://hintra.org/` redirects to HTTPS and the TLS chain is valid.
- [ ] `robots.txt` and `sitemap-index.xml` return 200; the sitemap contains exactly eight URLs (7 before 3F Release A) and no lastmod.
- [ ] Canonical, OG URL, Schema URL, internal links, and sitemap use the same trailing-slash form.
- [ ] Unlimited en/es/pt hreflang sets close with self-reference and x-default; other pages have no alternates.
- [ ] Every indexable route in the active release (six at 3A, seven after 3D, eight after 3F Release A) retains complete content, navigation, and FAQ with JavaScript disabled.
- [ ] favicon.svg, og.png, logo-512.png, and brand-lockup.svg are accessible.
- [ ] Mobile 4G/Lighthouse results meet LCP ≤2.0s, CLS ≤0.05, TTFB ≤0.8s, SEO ≥95, Accessibility ≥95; INP ≤200ms is verified from field data or explicitly left unverified.
- [ ] The www policy has been explicitly confirmed before any www alias is configured.

## 3D historical rollback drill

> The following steps and evidence record the already-completed 3D production rollback. They are not the 3F procedure. For 3F, M2 requires pre-release rollback-target review and prohibits deliberately downgrading production for a drill.

1. Record the current production version ID and the previous known-good version ID.
2. In Workers version history, roll back to the previous known-good version.
3. Record UTC time and version ID; curl the six routes and a nonexistent path, and compare a page-specific H1 with the expected old version.
4. Switch back to the current production version and repeat the checks.
5. Record both operations, evidence, and reviewer sign-off below.

- Current production version ID: `65a0e317-8eb4-4ae9-81b6-86d4b5751e27` (v4)
- Previous known-good version ID: `55117573-2a2a-4d5e-b53f-911108d2d11a` (v1, 3A baseline)
- Rollback time / result: 2026-11-10 — `wrangler rollback 55117573…` SUCCESS; six routes 200, `/one-in-a-krillion/` → 404, unlimited had no block C, sitemap 6 URLs
- Restore time / result: 2026-11-10 — `wrangler rollback 65a0e317…` SUCCESS; seven routes 200, block C / FAQ-3 / `/one-in-a-krillion/` link restored, sitemap 7 URLs
- Reviewer: Claude Code (督察书记); both operations via `wrangler rollback --yes`, intermediate `fetch failed` retried ≤8×

## GSC after technical acceptance

- [x] The production domain and all technical checks pass before GSC submission.
- [x] Submit `https://hintra.org/sitemap-index.xml` (submitted 2026-11-08, day 5 after launch; Google read it the same day).
- [ ] Request indexing for `https://hintra.org/one-in-a-krillion/` — **once only** (3f-00).
- [ ] After 3F Release A, request indexing for `https://hintra.org/krillion-game/` — **once only**. Do not re-request existing URLs.
- [ ] **2026-12-01 (4 weeks after launch)**: review indexed count (from 1 upward) and whether any query reaches 50 impressions, then decide 3C / sports / languages.
- [ ] Do **not** cut or merge pages for being unindexed within two weeks — that rule was withdrawn (F67).

## Batch 3D · 已合并上线（F59，原 stage 1 / stage 2 两段作废）

> 2026-11-10：3d-01、3d-02 与 3E 同批上线，版本 `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`。原「先发 stage 1、等 2~3 天再发 stage 2」的勾选清单已作废，下列为合并后的实际验收结果。

- [x] `routes.oneInAKrillion` 与单页词族映射已注册。
- [x] `/one-in-a-krillion/` 是唯一新增可索引路由；七页 + `404.html`。
- [x] 新页文案与 FAQ 与 `3d_copy_final.md` 逐字一致；FAQ 与 Schema 同源。
- [x] 新页 canonical/OG/Schema 同形，无 hreflang/LangSwitch，四类 Schema 齐全。
- [x] 首页四卡、`Four` 文案、「Three」零残留、桌面四列、390px 无横滚。
- [x] Sitemap 恰 7 条、无 lastmod。
- [x] Node 22.23.4；`npm ci` / typecheck / build / check 全绿；两次构建 hash 一致。
- [x] 英文 Unlimited 块 A/C、FAQ-3 逐字一致；三段别名 + multiplayer 免责声明仍在正文。
- [x] `UnlimitedContent.astro` 不再用 `page.sections[2]` 索引；en/es/pt 官方入口标题全部正确渲染（F53）。
- [x] 线上七页 200；缺失路径真实 404；无斜杠 URL 307 到尾斜杠。
- [ ] 对 `https://hintra.org/one-in-a-krillion/` 请求编入索引一次（**3F 的 3f-00，用户操作**）。
- [x] 回滚演练完成（见下节），两次操作均有版本 ID 与结果记录。

## Batch 3F · Release A（结构层）

> 双规范 M2 已授权；`3f_final.md` 已就位并通过英文 audit-only 与独立计词。范围：3f-01/02/03/06A 原子实施、独立复核、3f-07A 部署验收。**部署前记录回滚目标，不为演练主动降低生产版本。**

- [ ] `routes.krillionGame` 注册；`keywordClusters` 含 `krillion game` 词族；`primaryNavigation` 四项。
- [ ] `indexablePages` 恰 8 条；dist 恰 8 个 index.html + 独立 404。
- [ ] 枢纽页文案与 `3f_final.md` 逐字一致；FAQ 5 条与 Schema 同源。
- [ ] 三个官方入口 URL 来自 `src/data/games/krillion.ts`（含 `sportsEntry`），可见标签与定稿一致，均为静态新标签页外链。
- [ ] 枢纽页正文与 FAQ 无任何计时（S-04 扩展词形 + 人工复核），且除 `30 Expeditions` 外无数量事实；用户已裁定该数量红线不约束全站共享 RelatedLinks 摘要，后者继续逐字复用首页定稿。
- [ ] 首页卡片 href 精确等于 `expectedHomeEntryRoutes`，`Five` 文案与旧 `Four` 清理完成；无硬编码卡数。
- [ ] 390/768/1024/1440 四档无横滚且截图已审查；1024px 标题换行与卡片高度有记录；390px 入口标题与第一卡标题仍在首屏。
- [ ] 英文非首页 5 页各恰有一个 `related-links` 且**无自链**；es/pt 无该块（S-14）。
- [ ] 机检 27 项全绿；页/卡/FAQ 计数分别从 `expectedRoutes` / `expectedHomeEntryRoutes` / `faqCounts` 派生；S-01 与独立 expected 表交叉验证。
- [ ] 临时副本负向自检：删除预期路由使 S-01/S-09/R-01/R-05 失配；删除英文 RelatedLinks 或恢复自链使 S-14 失配。
- [ ] Node 22.23.4；`npm ci` / typecheck / build / check 全绿；两次构建 hash 一致；独立复核在临时副本完成。
- [ ] 发布前当前版本、上一良好版本与回滚目标已记录；实际回滚如有发生，另记版本 ID / UTC 时间 / 结果。
- [ ] TLS 验证保持开启，未使用 `NODE_TLS_REJECT_UNAUTHORIZED=0`，未为演练降低生产版本。
- [ ] 部署后由用户对 `https://hintra.org/krillion-game/` 请求编入索引**一次**并记录提交状态，不把两周内收录作为 DoD。

Release A local implementation evidence:
- Node `v22.23.4` / npm `11.9.0`; clean `npm ci` exit 0, 298 packages, 0 vulnerabilities.
- `npm run typecheck` exit 0: 46 files, 0 errors/warnings/hints.
- `npm run build` exit 0: 9 pages = 8 indexable routes + 404; `npm run check` exit 0: 27 passed / 0 failed.
- S-01 machine counts: Home 279; Krillion Game 731; Unlimited 611; One in a Krillion 608; Noillirk 494; Geography 449; es 320; pt 318. Release B budgets are not yet applied.
- Development two-build HTML/XML aggregate SHA-256 (relative path + content): `074b146568cb2294207357bdb114845d9a8eb12be667d4a4afd38975a2cfbd25` twice.
- Independent temporary-copy rerun: clean npm ci/typecheck/build/check all exit 0; 27/27 twice; independent two-build HTML/XML aggregate SHA-256 (relative path + NUL + content) `fb6e53ba8d894226b8cd1f6b378046cb98d37c92e24f2cb7f8afaea59919879c`; source and review dist byte-identical.
- Independent negative checks: removing `/krillion-game/` from `expectedRoutes` failed S-01/S-09/R-01/R-05; removing Noillirk RelatedLinks failed S-14. Temporary copies were removed.
- Browser evidence: `temp/hintra-3f-a-*.png`; home/hub reviewed at 390/768/1024/1440, all other routes and 404 at 390. No horizontal overflow; 390×844 entries heading at 663px and first card title at 737–781px; 1024 home five-column cards equal 293px. Native FAQ Space toggle and 3px amber focus outline passed; hub content/FAQ/links remained readable with page JavaScript disabled.
- Independent review outcome: P0=0, P1=0; Release A local review passed and is ready for user/reviewer deployment. The user ruled that the hub quantity redline covers its body and FAQ, not shared RelatedLinks summaries. Production deployment and online acceptance remain pending; no deployment or account operation has occurred.

Release A recovery review: if the Release A deployment fails acceptance, the user/reviewer selects the rollback target below in Workers version history, then verifies the seven pre-3F routes, real 404, trailing-slash 307, seven-entry sitemap, pre-3F home copy, and absence of `/krillion-game/`. Record the actual version ID, UTC time, and result only if a rollback occurs; do not downgrade production for a drill.

Release A pre-deploy production version ID: `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`
Release A previous known-good version ID: `55117573-2a2a-4d5e-b53f-911108d2d11a` (historical 3A baseline)
Release A rollback target version ID: `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`
Release A production version ID:
Release A UTC time / result:
Release A actual rollback evidence (if any):
Release A reviewer:

## Batch 3F · Release B（内容层）

> `3f_final.md` 扩写稿已就位并通过英文 audit-only 与独立计词。范围：3f-04/05/06B、独立复核、3f-07B 部署验收。两页编辑目标均约 860 词，固定验收区间如下；不得自动放宽。

- [ ] `/krillion-geography/` 词数落 820~980；新增 H2 承接真实词形。
- [ ] geography **未新增**地区描述 / Expedition 清单 / 各地区内容；S-11 五条断言全过。
- [ ] `/one-in-a-krillion/` 词数落 800~960；H2 序列 = 旧四 + 新一；`seo.mjs` 断言同步；新增节与既有两节无同义复述。
- [ ] `/one-in-a-krillion/` 的 Title / Meta / H1 **未变**。
- [ ] 两页 FAQ 各 6 条，可见文本与 Schema 同源。
- [ ] `/krillion-unlimited/`、`/noillirk/`、es/pt **四页**正文未被改动。
- [ ] 线上 8 页 200；sitemap 精确 8 条无 lastmod。
- [ ] 发布前当前版本、上一良好版本与回滚目标已记录；实际回滚如有发生，另记证据；未为演练降低生产版本。
- [ ] **不**对既有页重复请求索引。

Release B pre-deploy production version ID:
Release B rollback target version ID:
Release B production version ID:
Release B UTC time / result:
Release B actual rollback evidence (if any):
Release B reviewer:

## Batch 3F · 外链第一档（用户执行）

| 日期 | 平台 | 链接目标 | 是否带链接 | 状态 |
|---|---|---|---|---|
| — | — | — | — | 待用户执行 |

- 人工、逐条、可解释；不批量自动发帖、不买链、不伪造身份。
- 目录站每天刷量式提交暂缓，规模须由用户确认。
- 编码代理不代发、不生成发帖内容；平台警告或删除须立即停手并记录。

## Batch 3D rollback drill record

The user or release reviewer performs both operations in Workers version history. Do not mark this record complete from a local build.

- Release stage: 3D merged (3d-01 + 3d-02 + 3E), version `65a0e317-8eb4-4ae9-81b6-86d4b5751e27`
- Current production version ID: `65a0e317-8eb4-4ae9-81b6-86d4b5751e27` (v4)
- Previous known-good version ID: `55117573-2a2a-4d5e-b53f-911108d2d11a` (v1)
- Rollback UTC time / version ID / result: 2026-11-10 / `55117573…` / SUCCESS
- Seven-route and real-404 evidence after rollback: six routes 200, `/one-in-a-krillion/` real 404, sitemap 6 URLs, unlimited no block C
- Restore UTC time / version ID / result: 2026-11-10 / `65a0e317…` / SUCCESS
- Seven-route and real-404 evidence after restore: seven routes 200, block C + FAQ-3 + new-page link present, sitemap 7 URLs
- Reviewer sign-off: Claude Code (督察书记)
