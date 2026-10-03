# Verification scripts

Local-only tooling for verifying the site in a real browser. Nothing here runs in
CI or ships to production.

| Script                   | What it proves                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contact-form-e2e.ts`    | The contact form validates, posts the right EmailJS payload, toasts, resets, and sends nothing while invalid (18 checks).                                                                                                                                                                                                                                                                                                                                                                |
| `portfolio-sheet-e2e.ts` | The portfolio bottom sheet matches the M3 spec it is built from: bottom-edge anchoring (mobile/tablet), centred two-column 1024dp dialog with all four corners rounded and no internal scroll (desktop), 640dp cap below lg, 28/0dp shape, the 60-65dvh peek band + expand, the slide-down exit animation, the M3 dialog numbers (4:3 media, title→body 16dp, action gap 8dp, 48dp close target with a 24dp icon, 72dp header with no overlap), and all three dismiss paths (42 checks). |
| `lighthouse-median.sh`   | Mobile Lighthouse performance as a median of n runs, per page.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `cdp-client.ts`          | Minimal Chrome DevTools Protocol client over Bun's WebSocket — imported by the e2e script, no puppeteer dependency.                                                                                                                                                                                                                                                                                                                                                                      |

## Rules that came out of using them

- **A real browser, not a DOM-only engine.** A headless DOM engine without
  paint and layout can fail silently on React: it no-ops `react-hook-form`'s
  `reset()` and leaves stale toast nodes in the DOM while throwing nothing, so
  the failure looks like an application bug. Cross-check with Chromium before
  believing a failure.
- **Median, never a single run.** On a contended host the same commit measures
  anywhere between 69 and 93 for mobile performance. A run taken while another
  process is eating CPU reads 5–10 points low, which is enough to fake a
  regression.
- **`NEXT_PUBLIC_*` is inlined at build time.** The form's success path is
  unreachable without dummy EmailJS ids baked into the build, and the production
  build must be rebuilt without them afterwards.
- **Disable the browser cache in the script, and never reuse a stale server.**
  Next serves prerendered HTML with a long max-age, so a reused
  `--user-data-dir` replays the previous bundle and every assertion silently
  measures code that is no longer in the build. Both scripts call
  `Network.setCacheDisabled` and reload with `ignoreCache` for that reason.
- **Never pipe `bun run build` through `head`.** The closed pipe SIGPIPEs the
  build, leaving `.next` half-written: chunks referenced by the served HTML go
  missing and hydration dies with no console error at all.
- **`fuser -k 3000/tcp` is not reliable here.** A surviving `next start` keeps
  serving the old prerender from memory (and from still-open deleted file
  handles after a `rm -rf .next`), which looks exactly like a regression in the
  code. Kill it by the PID from `ss -ltnp` and confirm the port is free.

## Contact form end-to-end

```bash
# 1. build with dummy ids so the success path can be reached
NEXT_PUBLIC_EMAILJS_SERVICE_ID=dummy_service \
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=dummy_template \
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=dummy_key bun run build
bun run start

# 2. a real Chromium with remote debugging on loopback
/usr/bin/chromium --headless=new --remote-debugging-port=9222 \
  --user-data-dir=/tmp/cr-e2e --no-sandbox --disable-gpu \
  --disable-dev-shm-usage --disable-extensions --no-first-run about:blank

# 3. run the checks (window.fetch is stubbed, no email is ever sent)
bun run verify:form

# 4. rebuild without the dummies before shipping
bun run build
```

`CDP_WS` overrides the debugger endpoint, `BASE_URL` the site under test.

## Portfolio bottom sheet

Same three steps as above, without the dummy EmailJS ids:

```bash
bun run build
bun run start
/usr/bin/chromium --headless=new --remote-debugging-port=9222 \
  --user-data-dir=/tmp/cr-sheet --no-sandbox --disable-gpu \
  --disable-dev-shm-usage --disable-extensions --no-first-run about:blank
bun run verify:sheet
```

The viewport is overridden per case (390×844, 768×1024 and 1440×900) because the sheet
switches from a bottom-anchored sheet to a centred two-column dialog at the 1024px `lg:`
breakpoint, and each case disables the cache before reloading.

## Cloudflare Worker preview

The production runtime is Cloudflare Workers (OpenNext), so also verify against `wrangler dev`
— not only `next start`.

```bash
bun run preview            # opennextjs-cloudflare build && wrangler dev (localhost:8787)
# in another shell, with the same CDP browser setup:
BASE_URL=http://127.0.0.1:8787 bun run verify:sheet
BASE_URL=http://127.0.0.1:8787 bun run verify:form
```

`bun run build` stays `next build --turbopack`. OpenNext runs `bun run build` itself
(`@opennextjs/aws` `buildNextApp`), so **never** put `opennextjs-cloudflare build` in the
`build` script — it recurses forever and never finishes.

### Workers Builds (abandoned, kept for reference)

The dashboard build settings are separate from these local scripts. Set:

| Setting         | Value                             |
| --------------- | --------------------------------- |
| Build command   | `npx opennextjs-cloudflare build` |
| Deploy command  | `npx wrangler deploy` (default)   |
| Preview command | `npx wrangler preview` (default)  |

If the build command is left at `npm run build`, only `next build` runs, and the
`wrangler preview` / `wrangler deploy` step fails with
`✘ [ERROR] The entry-point file at ".open-next/worker.js" was not found.`

`NEXT_PUBLIC_EMAILJS_*` must be set as **Build variables**: they are inlined at build time,
and `previews.vars` in `wrangler.jsonc` is runtime-only.

The dashboard `Retry build` button is not always offered (it disappears after the Git
integration is disconnected and reconnected). A push to `main` is the reliable trigger —
merging a pull request is enough. Confirm a CI deploy actually landed with
`bunx wrangler versions list`: a new version ID means it did, otherwise deploy manually with
`bun run deploy`.

### GitHub Actions (current production path)

Workers Builds kept timing out during `Initializing build environment`, so production deploys
moved to `.github/workflows/deploy.yml`, which runs on every push to `main` and can also be
started with `workflow_dispatch`.

It needs one repository secret:

```bash
gh secret set CLOUDFLARE_API_TOKEN -R hutamadev/htma
```

Create the token in Cloudflare with the **"Edit Cloudflare Workers"** template. If the deploy
fails while updating triggers, also grant **Zone → Workers Routes → Edit** for `htma.my.id`.
`CLOUDFLARE_ACCOUNT_ID` and the public EmailJS values are inlined in the workflow file.

Check the result with `gh run list` or `bunx wrangler versions list`.

Workers Builds was disconnected on 2026-10-03, so this workflow is the only deploy path.

Browser note: on this host `/usr/bin/chromium` is not installed. Helium
(`/opt/helium-browser-bin/helium`, Chromium 154) works as the CDP browser for these checks;
**do not** use it for Lighthouse — its bundled uBOL contaminates the audit.

## Lighthouse median

```bash
bun run start                 # production server on :3000
bun run audit:lighthouse      # 5 runs per page, median printed
```

`RUNS`, `BASE_URL`, `OUT`, `CHROME_BIN`, and `CDP_PORT` override the defaults.
JSON results land in `OUT` (default `/tmp/lh-median`).
