# CLAUDE.md · Hintra 工程入口（编码代理必读）

> 任何任务先读本文件，再读执行包指定的权威文档。
> 项目：**Hintra**（`https://hintra.org/`），独立每日解谜游戏内容站，不托管、不嵌入、不复制游戏。
> 技术栈：**Astro 全站 SSG + Cloudflare Workers 静态资产 + Workers Builds**。纯 `.astro`，无可执行客户端 JavaScript；JSON-LD 是唯一允许的 script 类型。

## 权威文档表（冲突时按此顺序裁决）

| 顺序 | 文档 | 路径（相对 `projs/hintra/`） |
| --- | --- | --- |
| 1 | 渲染与工程规范（含 M1） | `prompts/dev_piplines/phase2/rendering_spec_v1.md` |
| 2 | SEO 技术规范（含 M1） | `prompts/dev_piplines/phase2/seo_tech_spec.md` |
| 3 | 当前 3D 施工正本（F49~F57） | `prompts/dev_piplines/phase3/3d_func_extend.md` |
| 4 | **当前 3D 唯一上线文案附件** | `prompts/dev_piplines/phase3/3d_copy_final.md` |
| 5 | 3A 施工正本（既有页面与历史约束） | `prompts/dev_piplines/phase3/3a_func_extend.md` |
| 6 | 3A 最终文案（本批不动页参照） | `prompts/dev_piplines/phase3/3a_copy_final.md` |
| 7 | **UI/UX 设计输入（Direction A 已选定）** | `prompts/dev_piplines/ui_design/ui_design_prompt.md`、`icon_design_prompt.md`、`uiux/uiux_design_system.md`、`uiux/uiux_page_*.md` |
| 8 | 当前执行包 | `prompts/chat/chat_task_01.md` |
| 9 | 工程回执原件（只作补充，不用于拼接文案） | `prompts/dev_piplines/phase3/material/00.md`、`01.md` |
| 10 | handoff（背景参考） | `prompts/dev_piplines/phase0/p0_handoff/p0_handoff.md`、`phase1/p1_handoff.md` |

发现冲突：停止相关任务，在汇报中提出，不得自行取舍。

## 硬性规则（违反即任务失败）

1. **当前 3D 目标只含 7 个可索引路由**：`/`、`/krillion-unlimited/`、`/noillirk/`、`/krillion-geography/`、`/es/krillion-unlimited/`、`/pt/krillion-unlimited/`、`/one-in-a-krillion/`。另有真实 404，不进 sitemap。本批不得新增第 8 个可索引路由。
2. **不做 3B/3C 或 3D 闸门项**：无 answers、首页 V2、games、strategy、unblocked、sports 独立页、hints/meme、账户、支付、Cron、KV、数据库；不施工 3d-03/3d-04/3d-05。
3. **无可执行 JavaScript**：无 UI 框架、无 `client:*`、无第三方脚本、无 iframe；唯一 script 为 `application/ld+json`。
4. **静态直出**：Title/Meta/H1/正文/FAQ/JSON-LD/canonical/hreflang 全在构建期生成；禁用 JS 后内容仍完整。
5. **文案按页面取唯一权威版本**：新页、首页第 4 卡及 Three 修正、英文 Unlimited 块 A/C/D 只能取 `3d_copy_final.md`；本批未授权修改的页面保持 `3a_copy_final.md`。不得自行补写、润色或翻译；FAQ 可见文本与 Schema 同源逐字。3D 缺失字符串补齐前不得施工对应内容。
6. **日期统一省略**：不输出 `datePublished`、`dateModified`、sitemap `lastmod`，不使用构建时间或占位日期。
7. **Schema 三红线**：无 aggregateRating / HowTo / SearchAction；无 Offer/价格/评分；@id 正式域、尾斜杠；`#org/#site` 仅首页完整定义。新页 `VideoGame` 只放在 `WebPage.about`。
8. **事实红线**：Krillion 页无价格/Free/具体秒数；Noillirk 不写成 Krillion 变体；不推断所有者或 multiplayer 功能；不出现 `hintra.com`、`hintra.net`、`krillion.to`。新页不得写概率、触发条件、答案、hints 或 Dive 期号。
9. **URL 同源**：canonical、OG URL、Schema、内链、sitemap 同形；`build.format:'directory'` + Workers `force-trailing-slash`；禁 Astro redirects。
10. **多语言只限 Unlimited 既有三页**：en/es/pt hreflang 互指、自指、x-default=en；新页无 es/pt、无 hreflang、无 LangSwitch，其他页不得声明虚假翻译或语言首页。
11. **素材已交付**：使用 `ui_design/icon/` 根目录 A palette 的 favicon/og/logo/brand-lockup；不得把 palette-2、预览图、zip 当生产素材，也不得继续输出空 OG/logo 逻辑。本批不新增或替换素材。
12. **UI/UX 按已定稿实现**：Direction A / Field Guide；先读 `uiux_design_system.md` 与五份 `uiux_page_*.md`；不得引入 Tailwind/shadcn/客户端 UI 框架，不得用设计稿示意文案覆盖最终附件。本批只把首页 `.entry-grid` 桌面列数改为 4。
13. **部署只用 Cloudflare Workers 静态资产**：不改用 Pages/Functions/Vercel/OpenNext；`wrangler.jsonc` 无 `main`/KV/D1/Cron，本批不改 name/assets；部署 token、DNS、自定义域和 GSC 由用户操作。
14. **保持两阶段发布顺序**：3d-01 本地验收后由用户上线；新页上线 2–3 天后才施工并发布 3d-02，不得合并为同次发布。
15. **不扩大范围、不主动标任务完成**：完成后按执行包模板汇报，等待督察复核。

## 工程要点速查

- Node 22 LTS 且 ≥22.23.4；`.nvmrc` + `engines`；npm lockfile；CI 用 `npm ci`。
- Workers：`assets.directory:'./dist'`、`html_handling:'force-trailing-slash'`、`not_found_handling:'404-page'`。
- 3D sitemap 目标恰 7 条，无 lastmod；robots 指向 `sitemap-index.xml`。
- 官方 URL 集中在 `src/data/games/`；站内绝对 URL 只由 `src/lib/url.ts` 生成。
- 机检在 `scripts/`，构建后读取 `dist/`，不得进入产物，失败即阻止部署。
