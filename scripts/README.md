# Verification scripts

Local-only tooling for verifying the site in a real browser. Nothing here runs in
CI or ships to production.

| Script                 | What it proves                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `contact-form-e2e.ts`  | The contact form validates, posts the right EmailJS payload, toasts, resets, and sends nothing while invalid (18 checks). |
| `lighthouse-median.sh` | Mobile Lighthouse performance as a median of n runs, per page.                                                            |
| `cdp-client.ts`        | Minimal Chrome DevTools Protocol client over Bun's WebSocket — imported by the e2e script, no puppeteer dependency.       |

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

## Lighthouse median

```bash
bun run start                 # production server on :3000
bun run audit:lighthouse      # 5 runs per page, median printed
```

`RUNS`, `BASE_URL`, `OUT`, `CHROME_BIN`, and `CDP_PORT` override the defaults.
JSON results land in `OUT` (default `/tmp/lh-median`).
