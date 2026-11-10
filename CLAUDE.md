# CLAUDE.md · Hintra 工程入口（编码代理必读）

> 任何任务先读本文件，再读执行包指定的权威文档。
> 项目：**Hintra**（`https://hintra.org/`），独立每日解谜游戏内容站，不托管、不嵌入、不复制游戏。
> 技术栈：**Astro 全站 SSG + Cloudflare Workers 静态资产 + Workers Builds**。纯 `.astro`，无可执行客户端 JavaScript；JSON-LD 是唯一允许的 script 类型。

## 权威文档表（冲突时按此顺序裁决）

| 顺序 | 文档 | 路径（相对 `projs/hintra/`） |
| --- | --- | --- |
| 1 | 渲染与工程规范（含 M1） | `prompts/dev_piplines/phase2/rendering_spec_v1.md` |
| 2 | SEO 技术规范（含 M1） | `prompts/dev_piplines/phase2/seo_tech_spec.md` |
| 3 | **当前 3F 施工正本（F60~F69）** | `prompts/dev_piplines/phase3/3f_func_extend.md` |
| 4 | **当前 3F 唯一上线文案附件** | `prompts/dev_piplines/phase3/3f_final.md`（🟢 已收口；英文 audit-only 与独立计词通过；编码代理逐字注入） |
| 5 | 3D 施工正本（历史约束仍有效；3d-04 已由 3f-04 承接） | `prompts/dev_piplines/phase3/3d_func_extend.md` |
| 6 | 3D 上线文案（既有页原文参照） | `prompts/dev_piplines/phase3/3d_copy_final.md` |
| 7 | 3A 施工正本（既有页面与历史约束） | `prompts/dev_piplines/phase3/3a_func_extend.md` |
| 8 | 3A 最终文案（本批不动页参照） | `prompts/dev_piplines/phase3/3a_copy_final.md` |
| 9 | **UI/UX 设计输入（Direction A 已选定）** | `prompts/dev_piplines/ui_design/ui_design_prompt.md`、`icon_design_prompt.md`、`uiux/uiux_design_system.md`、`uiux/uiux_page_*.md` |
| 10 | 当前执行包（3F） | `prompts/chat/chat_task_04.md`（3D 历史执行包：`chat_task_01.md`） |
| 11 | 内容扩展回执（**`extend_func_02` 为最终口径**） | `prompts/dev_piplines/extend/func/extend_func_02.md` > `extend_func_01.md` > `extend_func_00.md` |
| 12 | 工程回执原件（只作补充，不用于拼接文案） | `prompts/dev_piplines/phase3/material/00.md`、`01.md` |
| 13 | handoff（背景参考） | `prompts/dev_piplines/phase0/p0_handoff/p0_handoff.md`、`phase1/p1_handoff.md` |

发现冲突：停止相关任务，在汇报中提出，不得自行取舍。

## 硬性规则（违反即任务失败）

1. **路由总数**：线上当前 7 个可索引路由（`/`、`/krillion-unlimited/`、`/noillirk/`、`/krillion-geography/`、`/es/krillion-unlimited/`、`/pt/krillion-unlimited/`、`/one-in-a-krillion/`）；**3F Release A 后为 8 个**，新增 `/krillion-game/`。另有真实 404，不进 sitemap。3F 不得新增第 9 个可索引路由。
2. **不做 3B/3C 或 3F 闸门项**：无 answers、首页 V2、games、strategy、unblocked、sports 独立页、levels、theme-packs、hints、1v1、账户、支付、Cron、KV、数据库；不施工 3d-03/3d-05，不为枢纽页做 es/pt 翻译。
3. **无可执行 JavaScript**：无 UI 框架、无 `client:*`、无第三方脚本、无 iframe；唯一 script 为 `application/ld+json`。
4. **静态直出**：Title/Meta/H1/正文/FAQ/JSON-LD/canonical/hreflang 全在构建期生成；禁用 JS 后内容仍完整。
5. **文案按页面取唯一权威版本**：新页、首页第 5 卡及 `Four`→`Five` 修正、英文 Unlimited 块 A/C/D 只能取 `3d_copy_final.md` / `3f_final.md`；本批未授权修改的页面保持 `3a_copy_final.md`。不得自行补写、润色或翻译；FAQ 可见文本与 Schema 同源逐字。`3f_final.md` 已收口并通过英文 audit-only 与独立计词，编码代理只能逐字注入。
6. **日期统一省略**：不输出 `datePublished`、`dateModified`、sitemap `lastmod`，不使用构建时间或占位日期。
7. **Schema 三红线**：无 aggregateRating / HowTo / SearchAction；无 Offer/价格/评分；@id 正式域、尾斜杠；`#org/#site` 仅首页完整定义。新页 `VideoGame` 只放在 `WebPage.about`。
8. **事实红线**：Krillion 页无价格/Free/具体秒数；Noillirk 不写成 Krillion 变体；不推断所有者或 multiplayer 功能；不出现 `hintra.com`、`hintra.net`、`krillion.to`。新页不得写概率、触发条件、答案、hints 或 Dive 期号。
9. **URL 同源**：canonical、OG URL、Schema、内链、sitemap 同形；`build.format:'directory'` + Workers `force-trailing-slash`；禁 Astro redirects。
10. **多语言只限 Unlimited 既有三页**：en/es/pt hreflang 互指、自指、x-default=en；新页 `/one-in-a-krillion/` 与 `/krillion-game/` 无 es/pt、无 hreflang、无 LangSwitch，其他页不得声明虚假翻译或语言首页。es/pt 两页**不挂 `RelatedLinks`**（避免指向不存在的翻译页）。
11. **素材已交付**：使用 `ui_design/icon/` 根目录 A palette 的 favicon/og/logo/brand-lockup；不得把 palette-2、预览图、zip 当生产素材，也不得继续输出空 OG/logo 逻辑。本批不新增或替换素材。
12. **UI/UX 按已定稿实现**：Direction A / Field Guide；先读 `uiux_design_system.md` 与五份 `uiux_page_*.md`；不得引入 Tailwind/shadcn/客户端 UI 框架，不得用设计稿示意文案覆盖最终附件。3F 只把首页 `.entry-grid` 改为 5 卡自适应列策略（≥1024 五列 / 768~1023 三列 / <768 单列）与主导航 4 项。四档视口须截图审查，1024px 检查标题换行与卡片高度，390px 保持 3E 的入口标题与第一卡标题首屏可见，不得缩小字号或触控区。
13. **部署只用 Cloudflare Workers 静态资产**：不改用 Pages/Functions/Vercel/OpenNext；`wrangler.jsonc` 无 `main`/KV/D1/Cron，本批不改 name/assets；部署 token、DNS、自定义域和 GSC 由用户操作。手动部署用 `npm run deploy` 调用固定 Wrangler，禁止 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
14. **3d-01 与 3d-02 已合并发布**：2026-11-09 用户裁决合并为同一次上线（原「两阶段 2~3 天」纪律作废）；3d-02 的出处段已随新页同批落地，无「双页争词」窗口。施工单 `3d_func_extend.md` 的旧两阶段表述不再作为执行约束；双规范 M2 已同步废止 M1 的旧发布限制。
15. **不扩大范围、不主动标任务完成**：完成后按执行包模板汇报，等待督察复核。
16. **3F 互链与枢纽纪律**：
    - 英文非首页共 5 页（Unlimited、Noillirk、Geography、One in a Krillion、Krillion Game）各恰有一个 `RelatedLinks`，只通过 `relatedEntries(currentPath)` 派生并**排除当前页自链**；es/pt 两页不挂。
    - `RelatedLinks` 内部文本**无 `data-copy`**，挂到更多页面不改变 S-01 词数；**不得**为「统一风格」给它加 `data-copy`。
    - 枢纽页 `/krillion-game/` 是 `krillion game` 词族的唯一承接页，**不得出现任何计时**（Noillirk 的三十秒留在 `/noillirk/`）；除已核实的 `30 Expeditions` 外不写数量。Sports 只允许有限提及和官方入口，不开独立页。
    - 官方 URL 集中在 `src/data/games/krillion.ts`；枢纽页 `officialEntries` 为 `{ title, label, href }[]`，可见文本取定稿，静态复用 `OfficialLink`，不得开放任意外链 Markdown。
    - 扩写 `/krillion-geography/` 不得新增地区描述、Expedition 清单或各地区内容；扩写 `/one-in-a-krillion/` 不得改 Title/Meta/H1，新增节须与既有两节去重。
    - 机检页数、首页卡数、FAQ 数分别由 `expectedRoutes`、`expectedHomeEntryRoutes`、`faqCounts` 派生；S-01 与独立 `expected` 表交叉验证，sitemap 比较精确 URL 集合，S-14 验证组件存在性和无自链。卡数不得从 FAQ 数推导，负向自检只在临时副本进行。
    - Release A 的 3f-01/02/03/06A 原子实施，不单独落地中间态；Release B 词数超区间交督察审查，不自动放宽。
    - 每段发布前记录当前版本、上一良好版本和回滚目标；不得为演练主动降低生产版本，实际回滚由用户/督察按需执行。
    - **站龄口径**：上线日 2026-11-03；不得以域名注册时间当站龄，不得引用「站龄约 3 个月」（F68）。

## 工程要点速查

- 工程基线：Node 22 LTS 且 ≥22.23.4；`.nvmrc` + `engines`；npm lockfile；CI 用 `npm ci`。
- Workers：`assets.directory:'./dist'`、`html_handling:'force-trailing-slash'`、`not_found_handling:'404-page'`。
- 3F 目标线上 sitemap 恰 8 条（Release A 前为 7 条），无 lastmod；robots 指向 `sitemap-index.xml`。
- 官方 URL 集中在 `src/data/games/`；站内绝对 URL 只由 `src/lib/url.ts` 生成。
- 机检在 `scripts/`，构建后读取 `dist/`，不得进入产物，失败即阻止部署。
