#!/usr/bin/env bash
# Lighthouse mobile performance protocol — n runs per page, median reported.
#
# Single runs are not evidence on a contended host: the same commit measured
# between 69 and 93 on a 4 GB WSL box while an agent was working. Run this when
# nothing else is competing for CPU, and use the median.
#
# Usage:
#   bun run start                                  # production server on :3000
#   bash scripts/lighthouse-median.sh              # / and /contact, 5 runs each
#   RUNS=3 BASE_URL=http://127.0.0.1:3100 bash scripts/lighthouse-median.sh
#
# Env: RUNS (default 5), BASE_URL (default http://127.0.0.1:3000),
#      OUT (default /tmp/lh-median), CHROME_BIN (autodetected).
set -euo pipefail

RUNS="${RUNS:-5}"
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
OUT="${OUT:-/tmp/lh-median}"
PORT="${CDP_PORT:-9222}"
PROFILE="${PROFILE_DIR:-/tmp/lh-median-chrome}"

if [ -z "${CHROME_BIN:-}" ]; then
  for candidate in chromium chromium-browser google-chrome google-chrome-stable; do
    if command -v "$candidate" >/dev/null 2>&1; then
      CHROME_BIN="$(command -v "$candidate")"
      break
    fi
  done
fi
if [ -z "${CHROME_BIN:-}" ]; then
  echo "no Chromium/Chrome binary found; set CHROME_BIN or install one" >&2
  exit 1
fi

PAGES=("$BASE_URL/" "$BASE_URL/contact")
mkdir -p "$OUT"

if ! curl -sS --max-time 2 "http://127.0.0.1:$PORT/json/version" >/dev/null 2>&1; then
  echo "starting $CHROME_BIN on :$PORT (profile $PROFILE)"
  "$CHROME_BIN" --headless=new --remote-debugging-port="$PORT" \
    --user-data-dir="$PROFILE" --no-sandbox --disable-gpu \
    --disable-dev-shm-usage --disable-extensions --no-first-run about:blank \
    >/tmp/lh-median-chrome.log 2>&1 &
  for _ in $(seq 1 20); do
    sleep 1
    curl -sS --max-time 2 "http://127.0.0.1:$PORT/json/version" >/dev/null 2>&1 && break
  done
fi

for page in "${PAGES[@]}"; do
  path="${page#"$BASE_URL"}"
  case "$path" in
    '' | '/') name=home ;;
    *) name="$(echo "$path" | tr '/' '-' | sed 's/^-//')" ;;
  esac
  for run in $(seq 1 "$RUNS"); do
    CHROME_PATH="$CHROME_BIN" bunx --bun lighthouse "$page" \
      --port="$PORT" --output=json --output-path="$OUT/$name-$run.json" \
      --only-categories=performance --quiet >/dev/null 2>&1
    echo "  $name run $run/$RUNS done"
  done
done

CHROME_PATH="$CHROME_BIN" OUT="$OUT" bun -e '
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const dir = process.env.OUT ?? "/tmp/lh-median";
const names = [...new Set([...new Bun.Glob(`${dir}/*-*.json`).scanSync()].map((f) => f.replace(/^.*\//, "").replace(/-\d+\.json$/, "")))];
if (names.length === 0) { console.error(`no lighthouse results in ${dir}`); process.exit(1); }
const read = async (f) => await Bun.file(f).json();
for (const name of names.sort()) {
  const files = [...new Bun.Glob(`${dir}/${name}-*.json`).scanSync()];
  const perf = [], tbt = [], lcp = [], cls = [];
  for (const f of files) {
    const r = await read(f);
    perf.push(Math.round((r.categories.performance.score ?? 0) * 100));
    tbt.push(Math.round(r.audits["total-blocking-time"].numericValue));
    lcp.push(Math.round(r.audits["largest-contentful-paint"].numericValue / 100) / 10);
    cls.push(Math.round(r.audits["cumulative-layout-shift"].numericValue * 1000) / 1000);
  }
  console.log(`\n${name} mobile (n=${perf.length})`);
  console.log(`  perf runs=[${perf.join(", ")}] median=${med(perf)}`);
  console.log(`  TBT  runs=[${tbt.join(", ")}] ms median=${med(tbt)}`);
  console.log(`  LCP  runs=[${lcp.join(", ")}] s median=${med(lcp)}`);
  console.log(`  CLS  runs=[${cls.join(", ")}] median=${med(cls)}`);
}
'
