# Hintra

Static Astro site for `https://hintra.org/`, deployed as Cloudflare Workers static assets.

## Local development

Use Node `>=22.23.4 <23` and npm `>=9.6.5`.

On this workstation the system default Node is still v22.14.0. The verified isolated toolchain is:

```text
H:\sdkpkg\webArch\ClientSide\npm\node-v22.23.4\node-v22.23.4-win-x64
```

Prepend that directory to `PATH` for the session before running the commands below. Cloudflare Workers Builds must also satisfy the `engines.node` range.

```bash
npm ci
npm run dev
```

Production checks:

```bash
npm ci
npm run build
npm run typecheck
npm run check
```

The check script reads `dist/` after the build and never rewrites it.

## Workers Builds

Connect the repository to a Cloudflare Workers Builds project named `hintra`. Set the build command to:

```bash
npm ci && npm run typecheck && npm run build && npm run check
```

The deploy command is the Workers Builds default `npx wrangler deploy`. No Worker entrypoint, adapter, KV, D1, Cron, Functions, or Pages project is required. Workers serves `./dist` with forced trailing slashes and the static 404 page.

The Worker name in the Cloudflare dashboard must match `name` in `wrangler.jsonc` (`hintra`), or the build will fail.

## Emergency deployment and rollback

After Cloudflare authentication has been completed by the user, the emergency local command is:

```bash
npm ci && npm run typecheck && npm run build && npm run check && npx wrangler deploy
```

Do not deploy when any build or check fails. Roll back through the Workers version history to the last successful production deployment, verify it, then record the version IDs and results in `docs/launch-checklist.md`.

Custom domains, DNS, TLS, www policy, GSC, production deployment, and rollback are user-operated account actions. Never store Cloudflare credentials in this repository.
