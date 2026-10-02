/**
 * End-to-end check of the portfolio modal bottom sheet in a real Chromium, over
 * CDP. Proves the M3 spec claims the component is built from, not just that it
 * renders: bottom-edge anchoring at both breakpoints, the 640dp width cap, the
 * 28dp top / 0dp bottom shape, the 50% peek cap and its toggle, and all three
 * dismiss paths (scrim, close button, Escape).
 *
 * Run:
 *   1. bun run build
 *   2. bun run start
 *   3. /usr/bin/chromium --headless=new --remote-debugging-port=9222 \
 *        --user-data-dir=/tmp/cr-sheet --no-sandbox --disable-gpu \
 *        --disable-dev-shm-usage --disable-extensions --no-first-run about:blank
 *   4. bun run scripts/portfolio-sheet-e2e.ts
 *
 * Viewport is overridden per case because the sheet switches layout at the 640px
 * (`sm:`) breakpoint — a single viewport would leave half the spec unverified.
 */
/* eslint-disable no-await-in-loop -- polling loops: each attempt depends on the
   previous observation, and parallel attempts would race the app. */
import { connect, type CdpTarget } from './cdp-client';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const lines: string[] = [];
let failures = 0;

const check = (label: string, ok: boolean, detail = '') => {
  if (!ok) failures++;
  lines.push(
    `${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  · ${detail}` : ''}`
  );
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Everything the assertions need, read in one round trip. */
const PROBE = `(() => {
  const dialog = document.querySelector('#modal-card dialog');
  if (!dialog) return { mounted: false };
  const content = dialog.querySelector('[data-lenis-prevent]');
  const handle = dialog.querySelector('button[aria-expanded]');
  const title = dialog.querySelector('h1');
  const desc = dialog.querySelector('p');
  const figure = dialog.querySelector('figure');
  const dialogStyle = getComputedStyle(dialog);
  const rect = dialog.getBoundingClientRect();
  const handleStyle = handle ? getComputedStyle(handle.querySelector('span')) : null;
  const card = document.querySelector('ul button');
  // Tokens are resolved through a throwaway element so the assertions compare
  // against the live theme instead of a hardcoded light-mode hex.
  const token = (name) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = 'var(' + name + ')';
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const value = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return value;
  };
  // Measured, not inferred: in mobile emulation dvh resolves against the small
  // viewport (844) while innerHeight reports 870, so band assertions written
  // against innerHeight are off by 3%.
  const dvhEl = document.createElement('div');
  dvhEl.style.cssText = 'position:fixed;height:100dvh;width:0;visibility:hidden';
  document.body.appendChild(dvhEl);
  const dvh = dvhEl.getBoundingClientRect().height;
  dvhEl.remove();
  return {
    mounted: true,
    open: !dialog.hasAttribute('inert'),
    rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, height: rect.height, width: rect.width },
    viewport: { w: innerWidth, h: innerHeight },
    dvh,
    tokens: {
      surfaceContainerLow: token('--color-surface-container-low'),
      onSurfaceVariant: token('--color-on-surface-variant'),
    },
    radiusTop: dialogStyle.borderTopLeftRadius,
    radiusBottom: dialogStyle.borderBottomLeftRadius,
    position: dialogStyle.position,
    background: dialogStyle.backgroundColor,
    maxHeight: dialogStyle.maxHeight,
    handleSize: handleStyle ? { w: handleStyle.width, h: handleStyle.height, color: handleStyle.backgroundColor } : null,
    expanded: handle ? handle.getAttribute('aria-expanded') : null,
    hasHandleControl: Boolean(handle),
    columns: dialogStyle.gridTemplateColumns,
    contentColumns: content ? getComputedStyle(content).gridTemplateColumns : null,
    handleVisible: handle ? handle.getBoundingClientRect().width > 0 : false,
    metrics: (() => {
      const close = document.querySelector('#modal-card button[aria-label="Close portfolio detail"]');
      const textCol = content && content.children[1];
      const actions = textCol ? textCol.lastElementChild : null;
      const icon = close ? close.querySelector('svg') : null;
      const closeRect = close ? close.getBoundingClientRect() : null;
      const header = dialog.firstElementChild;
      return {
        titleToDesc: title && desc ? +(desc.getBoundingClientRect().top - title.getBoundingClientRect().bottom).toFixed(1) : null,
        actionsGap: actions ? getComputedStyle(actions).columnGap : null,
        closeBtn: closeRect ? { w: +closeRect.width.toFixed(1), h: +closeRect.height.toFixed(1) } : null,
        closeIconW: icon ? +icon.getBoundingClientRect().width.toFixed(1) : null,
        closeBottom: closeRect ? +closeRect.bottom.toFixed(1) : null,
        contentTop: content ? +content.getBoundingClientRect().top.toFixed(1) : null,
        headerHeight: header ? +header.getBoundingClientRect().height.toFixed(1) : null,
      };
    })(),
    titleTop: title ? title.getBoundingClientRect().top : null,
    figureBottom: figure ? figure.getBoundingClientRect().bottom : null,
    figureAspect: figure ? (figure.getBoundingClientRect().width / figure.getBoundingClientRect().height).toFixed(2) : null,
    scroll: content ? { scrollTop: content.scrollTop, scrollHeight: content.scrollHeight, clientHeight: content.clientHeight, lenisPrevent: content.hasAttribute('data-lenis-prevent') } : null,
    cardCount: document.querySelectorAll('ul button').length,
    firstCard: card ? card.innerText.slice(0, 40) : null,
  };
})()`;

interface Probe {
  mounted: boolean;
  open?: boolean;
  dvh?: number;
  rect?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
  };
  viewport?: { w: number; h: number };
  position?: string;
  tokens?: { surfaceContainerLow: string; onSurfaceVariant: string };
  radiusTop?: string;
  radiusBottom?: string;
  background?: string;
  maxHeight?: string;
  handleSize?: { w: string; h: string; color: string } | null;
  expanded?: string | null;
  hasHandleControl?: boolean;
  columns?: string;
  contentColumns?: string | null;
  handleVisible?: boolean;
  metrics?: {
    titleToDesc: number | null;
    actionsGap: string | null;
    closeBtn: { w: number; h: number } | null;
    closeIconW: number | null;
    closeBottom: number | null;
    contentTop: number | null;
    headerHeight: number | null;
  };
  titleTop?: number | null;
  figureBottom?: number | null;
  figureAspect?: string | null;
  scroll?: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
    lenisPrevent: boolean;
  } | null;
  cardCount?: number;
  firstCard?: string | null;
}

const probe = (page: CdpTarget) => page.evaluate<Probe>(PROBE);

/** Cold cache means every chunk is downloaded again; poll instead of guessing. */
async function waitForCards(page: CdpTarget) {
  for (let i = 0; i < 60; i++) {
    const state = await probe(page);
    if ((state.cardCount ?? 0) >= 9) return state;
    await sleep(400);
  }
  return probe(page);
}

const openFirstCard = `(() => { document.querySelector('ul button').click(); return true; })()`;
const PRESS_ESCAPE = `(() => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  return true;
})()`;
const CLICK_CLOSE = `(() => { document.querySelector('#modal-card button[aria-label="Close portfolio detail"]').click(); return true; })()`;
const CLICK_SCRIM = `(() => { document.querySelector('#modal-backdrop button').click(); return true; })()`;
/** Read from the motion wrapper — the transform lives there, not on the dialog. */
const IN_FLIGHT_STATE = `(() => {
  const wrapper = document.querySelector('#modal-card dialog').parentElement;
  const style = getComputedStyle(wrapper);
  return { transform: style.transform, opacity: style.opacity };
})()`;

/** Forcing a clip is the only way to exercise the scroll container once the
 *  sheet is tall enough to show its whole content; the contract being checked is
 *  that wheel/scroll inside the sheet is native and not hijacked by Lenis.
 *  Both bounds have to be overridden — the sheet's min-height band otherwise
 *  wins over a smaller max-height and nothing ever clips. */
const CLIP_AND_SCROLL = `(() => {
  const dialog = document.querySelector('#modal-card dialog');
  const content = document.querySelector('#modal-card [data-lenis-prevent]');
  dialog.style.minHeight = '0px';
  dialog.style.maxHeight = '300px';
  content.scrollTop = 120;
  return { scrollTop: content.scrollTop, scrollable: content.scrollHeight > content.clientHeight };
})()`;
const UNCLIP = `(() => {
  const dialog = document.querySelector('#modal-card dialog');
  dialog.style.minHeight = '';
  dialog.style.maxHeight = '';
  return true;
})()`;
const settle = (ms = 900) => sleep(ms);

/**
 * Chromium keeps a disk cache in --user-data-dir, and Next serves prerendered
 * HTML with a long max-age: a reused profile replays the previous bundle and
 * every assertion silently measures code that is no longer in the build.
 * Cache is disabled before the reload for that reason.
 */
async function load(page: CdpTarget, width: number, height: number) {
  await page.send('Network.enable');
  await page.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 640,
  });
  await page.send('Page.reload', { ignoreCache: true });
  await settle(2500);
}

async function waitForOpen(page: CdpTarget, expected: boolean) {
  for (let i = 0; i < 30; i++) {
    const state = await probe(page);
    if (state.mounted && state.open === expected) return state;
    await sleep(200);
  }
  return probe(page);
}

const browser = await connect();

// Mobile viewport: edge-to-edge, flush with the bottom of the viewport.
{
  const page = await browser.newTarget(BASE);
  await load(page, 390, 844);

  const idle = await waitForCards(page);
  check(
    'portfolio cards rendered',
    (idle.cardCount ?? 0) >= 9,
    `count=${idle.cardCount}`
  );

  await page.evaluate(openFirstCard);
  const state = await waitForOpen(page, true);
  check('sheet opens on card click', state.open === true);
  if (!state.open || !state.rect || !state.viewport) {
    console.log(lines.join('\n'));
    process.exit(1);
  }

  await settle();
  const open = await probe(page);
  if (!open.rect || !open.viewport) {
    check('sheet geometry is readable', false);
    console.log(lines.join('\n'));
    process.exit(1);
  }
  const { rect, viewport } = open;

  check(
    'sheet element mounted for the portal before opening',
    idle.mounted === true
  );
  check(
    'bottom edge flush with viewport bottom (mobile, 0dp margin)',
    Math.abs(rect.bottom - viewport.h) <= 1,
    `bottom=${rect.bottom.toFixed(1)} vh=${viewport.h}`
  );
  // Regression guard: a UA-styled <dialog> is position:absolute and therefore
  // ignored by the ancestors' flex alignment, which hangs the sheet below the
  // viewport. The geometry checks above only catch it when measured, this one
  // names the cause.
  check(
    'dialog participates in the flex layout (position static)',
    open.position === 'static',
    open.position ?? ''
  );
  check(
    'horizontally centered and edge-to-edge (mobile)',
    Math.abs(rect.left) <= 1 && Math.abs(rect.right - viewport.w) <= 1,
    `left=${rect.left.toFixed(1)} right=${rect.right.toFixed(1)} vw=${viewport.w}`
  );
  check(
    'width within the 640dp cap',
    rect.width <= 641,
    `width=${rect.width.toFixed(1)}`
  );
  check(
    'top corners 28dp, bottom corners 0dp',
    open.radiusTop === '28px' && open.radiusBottom === '0px',
    `top=${open.radiusTop} bottom=${open.radiusBottom}`
  );
  check(
    'container is surface-container-low',
    open.background === open.tokens?.surfaceContainerLow,
    `${open.background} vs ${open.tokens?.surfaceContainerLow}`
  );
  check(
    'drag handle is 32x4dp in on-surface-variant',
    open.handleSize?.w === '32px' &&
      open.handleSize?.h === '4px' &&
      open.handleSize?.color === open.tokens?.onSurfaceVariant,
    JSON.stringify(open.handleSize)
  );
  check(
    'single pointer height control present (handle button)',
    open.hasHandleControl === true
  );
  check(
    'mobile: header row keeps its 64dp height (12 + 48 + 4)',
    Math.abs((open.metrics?.headerHeight ?? 0) - 64) <= 1,
    `header=${open.metrics?.headerHeight}`
  );
  check(
    'close button is an M3 48dp target with a 24dp icon',
    Math.abs((open.metrics?.closeBtn?.w ?? 0) - 48) <= 1 &&
      Math.abs((open.metrics?.closeBtn?.h ?? 0) - 48) <= 1 &&
      Math.abs((open.metrics?.closeIconW ?? 0) - 24) <= 1,
    `btn=${JSON.stringify(open.metrics?.closeBtn)} icon=${open.metrics?.closeIconW}`
  );
  const band = open.dvh ?? viewport.h;
  check(
    'opens inside the 60-65dvh mobile peek band',
    rect.height >= band * 0.6 - 1 && rect.height <= band * 0.65 + 1,
    `height=${rect.height.toFixed(1)} band=${(band * 0.6).toFixed(1)}-${(band * 0.65).toFixed(1)} (dvh=${band})`
  );
  const figureBottom = open.figureBottom ?? Number.NEGATIVE_INFINITY;
  const titleTop = open.titleTop ?? Number.POSITIVE_INFINITY;
  check(
    'single column layout: thumbnail above the text',
    figureBottom <= titleTop,
    `figureBottom=${figureBottom} titleTop=${titleTop}`
  );
  check(
    'thumbnail keeps a 16/9 ratio',
    Number(open.figureAspect) >= 1.7 && Number(open.figureAspect) <= 1.8,
    `aspect=${open.figureAspect}`
  );
  check(
    'sheet content scrolls natively (data-lenis-prevent)',
    open.scroll?.lenisPrevent === true,
    JSON.stringify(open.scroll)
  );

  const clipped = await page.evaluate<{
    scrollTop: number;
    scrollable: boolean;
  }>(CLIP_AND_SCROLL);
  check(
    'content scrolls natively inside a clipped sheet (data-lenis-prevent)',
    clipped.scrollable && clipped.scrollTop > 0,
    `scrollTop=${clipped.scrollTop} scrollable=${clipped.scrollable}`
  );
  await page.evaluate(UNCLIP);
  await settle(300);

  await page.evaluate(
    `(() => { document.querySelector('#modal-card button[aria-expanded]').click(); return true; })()`
  );
  await settle();
  const expanded = await probe(page);
  // The rendered height may not change when the content already fits inside the
  // peek band, so this asserts the cap itself moved — that is what the control
  // does, and it keeps the check honest for short and long content alike.
  check(
    'handle toggles aria-expanded and lifts the height cap',
    expanded.expanded === 'true' && expanded.maxHeight !== open.maxHeight,
    `expanded=${expanded.expanded} peekCap=${open.maxHeight} expandedCap=${expanded.maxHeight}`
  );
  check(
    'expanded sheet stops at the 90dvh cap',
    (expanded.rect?.height ?? 0) <=
      (expanded.dvh ?? expanded.viewport?.h ?? 0) * 0.9 + 1,
    `height=${expanded.rect?.height.toFixed(1)} cap=${((expanded.dvh ?? expanded.viewport?.h ?? 0) * 0.9).toFixed(1)}`
  );
  check(
    'expanded sheet stays anchored to the bottom edge',
    Math.abs((expanded.rect?.bottom ?? 0) - (expanded.viewport?.h ?? 0)) <= 1,
    `bottom=${expanded.rect?.bottom.toFixed(1)}`
  );

  await page.evaluate(PRESS_ESCAPE);
  const closedByEscape = await waitForOpen(page, false);
  check('Escape dismisses the sheet', closedByEscape.open === false);

  await page.evaluate(openFirstCard);
  await waitForOpen(page, true);
  await settle();
  const reopened = await probe(page);
  check(
    'reopened sheet resets to the peek height',
    (reopened.rect?.height ?? 0) <= (reopened.viewport?.h ?? 0) * 0.65 + 1,
    `height=${reopened.rect?.height.toFixed(1)}`
  );

  await page.evaluate(CLICK_CLOSE);
  const closedByButton = await waitForOpen(page, false);
  check('close button dismisses the sheet', closedByButton.open === false);

  await page.evaluate(openFirstCard);
  await waitForOpen(page, true);
  await page.evaluate(CLICK_SCRIM);
  // Sampled mid-flight: a snap would already be at rest, and `inert` flips the
  // instant the store closes, so waiting for that would always look like a snap.
  await sleep(120);
  const inFlight = await page.evaluate<{ transform: string; opacity: string }>(
    IN_FLIGHT_STATE
  );
  const translateY = Number(
    /matrix\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+,\s*([-\d.]+)\)/.exec(
      inFlight.transform
    )?.[1] ?? 0
  );
  check(
    'exit animation slides the sheet down instead of snapping',
    translateY > 4 && Number(inFlight.opacity) < 1,
    `translateY=${translateY.toFixed(1)}px opacity=${inFlight.opacity}`
  );
  const closedByScrim = await waitForOpen(page, false);
  check('scrim tap dismisses the sheet', closedByScrim.open === false);
  await settle();
  const afterExit = await probe(page);
  check(
    'sheet ends fully below the viewport after the exit animation',
    (afterExit.rect?.bottom ?? 0) >= (afterExit.viewport?.h ?? 0) - 1,
    `bottom=${afterExit.rect?.bottom.toFixed(1)} vh=${afterExit.viewport?.h}`
  );

  page.close();
}

// Tablet viewport: still a bottom sheet, flush with the bottom edge.
{
  const page = await browser.newTarget(BASE);
  await load(page, 768, 1024);
  await waitForCards(page);

  await page.evaluate(openFirstCard);
  await waitForOpen(page, true);
  await settle();

  const state = await probe(page);
  if (!state.rect || !state.viewport) {
    check('sheet geometry is readable on tablet', false);
    console.log(lines.join('\n'));
    process.exit(1);
  }
  const { rect, viewport } = state;

  check(
    'tablet: bottom edge still flush with the viewport (0 gap)',
    Math.abs(viewport.h - rect.bottom) <= 1,
    `gap=${(viewport.h - rect.bottom).toFixed(1)}`
  );
  check(
    'tablet: bottom corners stay square, top corners rounded',
    state.radiusBottom === '0px' && state.radiusTop === '28px',
    `top=${state.radiusTop} bottom=${state.radiusBottom}`
  );
  check(
    'tablet: sheet is 640dp wide and centred',
    Math.abs(rect.width - 640) <= 1 &&
      Math.abs(rect.left - (viewport.w - rect.width) / 2) <= 1,
    `width=${rect.width.toFixed(1)} left=${rect.left.toFixed(1)}`
  );

  page.close();
}

// Desktop viewport (lg+): centred dialog, every corner rounded.
{
  const page = await browser.newTarget(BASE);
  await load(page, 1440, 900);
  await waitForCards(page);

  await page.evaluate(openFirstCard);
  await waitForOpen(page, true);
  await settle();

  const state = await probe(page);
  if (!state.rect || !state.viewport) {
    check('sheet geometry is readable on desktop', false);
    console.log(lines.join('\n'));
    process.exit(1);
  }
  const { rect, viewport } = state;

  check(
    'desktop: sheet is centred horizontally and vertically',
    Math.abs(rect.left - (viewport.w - rect.width) / 2) <= 1 &&
      Math.abs(rect.top - (viewport.h - rect.height) / 2) <= 1,
    `left=${rect.left.toFixed(1)} top=${rect.top.toFixed(1)}`
  );
  check(
    'desktop: sheet no longer touches the bottom edge',
    viewport.h - rect.bottom >= 8,
    `gap=${(viewport.h - rect.bottom).toFixed(1)}`
  );
  check(
    'desktop: all four corners rounded 28dp',
    state.radiusTop === '28px' && state.radiusBottom === '28px',
    `top=${state.radiusTop} bottom=${state.radiusBottom}`
  );
  check(
    'desktop: sheet is 1024dp wide, centred, with room to spare',
    Math.abs(rect.width - 1024) <= 1 &&
      Math.abs(rect.left - (viewport.w - rect.width) / 2) <= 1 &&
      rect.left >= 56 - 1 &&
      viewport.w - rect.right >= 56 - 1,
    `width=${rect.width.toFixed(1)} left=${rect.left.toFixed(1)} rightGap=${(viewport.w - rect.right).toFixed(1)}`
  );
  check(
    'desktop: content sits in two columns',
    (state.contentColumns ?? '').trim().split(/\s+/).length >= 2,
    state.contentColumns ?? ''
  );
  check(
    'desktop: content fits without scrolling',
    (state.scroll?.scrollHeight ?? 0) <= (state.scroll?.clientHeight ?? 0) + 1,
    `scrollHeight=${state.scroll?.scrollHeight} clientHeight=${state.scroll?.clientHeight}`
  );
  check(
    'desktop: drag handle hidden — nothing left to expand',
    state.handleVisible === false,
    `visible=${state.handleVisible}`
  );
  check(
    'desktop: dialog reads ~2:1, not a thin strip',
    rect.height / rect.width >= 0.42 && rect.height / rect.width <= 0.55,
    `ratio=${(rect.width / rect.height).toFixed(2)}:1 height=${rect.height.toFixed(1)}`
  );
  check(
    'desktop: media uses a 4:3 crop',
    Number(state.figureAspect) >= 1.3 && Number(state.figureAspect) <= 1.36,
    `aspect=${state.figureAspect}`
  );
  check(
    'desktop: title → body uses the M3 16dp step',
    Math.abs((state.metrics?.titleToDesc ?? 0) - 16) <= 1,
    `gap=${state.metrics?.titleToDesc}`
  );
  check(
    'desktop: action gap uses the M3 8dp step',
    Math.abs(Number.parseFloat(state.metrics?.actionsGap ?? '0') - 8) <= 1,
    `gap=${state.metrics?.actionsGap}`
  );
  check(
    'desktop: close button stays inside the header, clear of the content',
    (state.metrics?.closeBottom ?? 0) <= (state.metrics?.contentTop ?? 0),
    `closeBottom=${state.metrics?.closeBottom} contentTop=${state.metrics?.contentTop} header=${state.metrics?.headerHeight}`
  );

  page.close();
}

console.log(lines.join('\n'));
console.log(
  `\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`} (${lines.length} checks)`
);
browser.disconnect();
process.exit(failures === 0 ? 0 : 1);
