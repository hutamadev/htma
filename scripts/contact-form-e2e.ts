/**
 * End-to-end check of the contact form in a real Chromium, driven over CDP.
 *
 * Why not a framework: the form's contract is small (validation, request
 * payload, toast, reset) and the project has no test runner. Why a real
 * browser and not a DOM-only one: a headless DOM engine without paint/layout
 * fails silently on React — it no-ops react-hook-form's reset() and leaves
 * stale toast nodes behind without throwing anything, which reads as an app
 * bug. See the `local-browser-verification` skill.
 *
 * Run (three terminals' worth of steps, in order):
 *   1. NEXT_PUBLIC_EMAILJS_SERVICE_ID=dummy_service \
 *      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=dummy_template \
 *      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=dummy_key bun run build
 *   2. bun run start
 *   3. /usr/bin/chromium --headless=new --remote-debugging-port=9222 \
 *        --user-data-dir=/tmp/cr-e2e --no-sandbox --disable-gpu \
 *        --disable-dev-shm-usage --disable-extensions --no-first-run about:blank
 *   4. bun run scripts/contact-form-e2e.ts
 *
 * The dummy ids exist because NEXT_PUBLIC_* is inlined at build time — with the
 * variables unset, emailjs throws before it ever reaches fetch, so the success
 * path is unreachable. Nothing leaves the machine: window.fetch is stubbed in
 * the page, and the payload is asserted from that stub. Rebuild without the
 * dummies before shipping.
 */
/* eslint-disable no-await-in-loop -- these are polling loops: every attempt
   depends on the previous observation, and firing them in parallel would race
   the app instead of waiting for it. */
import { connect } from './cdp-client';

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

const HYDRATION_PROBE = `(() => {
  const form = document.querySelector('form');
  if (!form) return { form: false, hydrated: false, fields: [] };
  const fields = Array.from(form.querySelectorAll('input, textarea')).map((el) => el.name);
  const hydrated = Object.keys(form).some((k) => k.startsWith('__react'));
  return { form: true, hydrated, fields };
})()`;

const FILL_AND_SUBMIT = `(async (values) => {
  const setValue = (el, value) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const form = document.querySelector('form');
  for (const [name, value] of Object.entries(values)) {
    const el = form.querySelector('[name="' + name + '"]');
    if (!el) return { error: 'missing field ' + name };
    setValue(el, value);
  }
  await new Promise((r) => setTimeout(r, 80));
  form.requestSubmit();
  return { submitted: true };
})`;

const READ_FORM_STATE = `(() => {
  const form = document.querySelector('form');
  const toasts = Array.from(document.querySelectorAll('[role="status"], [class*="toast"]'))
    .map((el) => el.textContent).filter(Boolean).join(' | ');
  const helpers = Array.from(form.querySelectorAll('[aria-describedby], p')).map((el) => el.textContent);
  return {
    bodyText: document.body.innerText,
    toastText: toasts,
    captures: window.__captures || [],
    invalid: Array.from(form.querySelectorAll('[aria-invalid="true"]')).map((el) => el.name),
    values: Object.fromEntries(Array.from(form.querySelectorAll('input, textarea')).map((el) => [el.name, el.value])),
    sendDisabled: document.querySelector('form button')?.disabled ?? null,
    helperTexts: helpers,
  };
})()`;

interface FormState {
  bodyText: string;
  toastText: string;
  captures: { url: string; method: string; body: string | null }[];
  invalid: string[];
  values: Record<string, string>;
  sendDisabled: boolean | null;
  helperTexts: string[];
}

/** window.fetch is replaced so nothing reaches api.emailjs.com. */
const STUB_FETCH = `(() => {
  window.__captures = [];
  window.fetch = async (url, init) => {
    window.__captures.push({
      url: String(url),
      method: init && init.method ? init.method : 'GET',
      body: init && typeof init.body === 'string' ? init.body : null,
    });
    return new Response(JSON.stringify({ status: 200, text: 'OK' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return true;
})()`;

const browser = await connect();

// ---------------------------------------------------------------- happy path
{
  const page = await browser.newTarget(`${BASE}/contact`);

  let probe = { form: false, hydrated: false, fields: [] as string[] };
  for (let i = 0; i < 40; i++) {
    probe = await page.evaluate<typeof probe>(HYDRATION_PROBE);
    if (probe.form && probe.hydrated) break;
    await sleep(500);
  }
  check('form rendered in DOM', probe.form);
  check('react hydration marker present', probe.hydrated);
  check(
    'field names as expected',
    ['from_name', 'from_email', 'subject', 'message'].every((n) =>
      probe.fields.includes(n)
    ),
    probe.fields.join(',')
  );

  await page.evaluate(STUB_FETCH);

  const submit = await page.evaluate<{ submitted?: boolean; error?: string }>(
    `${FILL_AND_SUBMIT}({ from_name: 'E2E Tester', from_email: 'e2e@example.com', subject: 'Stubbed request', message: 'Body sent from the CDP test.' })`
  );
  check(
    'form filled and submitted',
    submit.submitted === true,
    submit.error ?? ''
  );

  let state = await page.evaluate<FormState>(READ_FORM_STATE);
  for (let i = 0; i < 20 && state.captures.length === 0; i++) {
    await sleep(400);
    state = await page.evaluate<FormState>(READ_FORM_STATE);
  }

  check(
    'outgoing request captured',
    state.captures.length === 1,
    `count=${state.captures.length}`
  );
  const call = state.captures[0];
  check(
    'posts to the EmailJS send endpoint',
    call?.url === 'https://api.emailjs.com/api/v1.0/email/send',
    call?.url ?? '(none)'
  );
  check('method is POST', call?.method === 'POST', call?.method ?? '(none)');

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(call?.body ?? '{}') as Record<string, unknown>;
  } catch {
    /* assertion below reports the miss */
  }
  const params = (payload.template_params ?? {}) as Record<string, unknown>;
  check(
    'template_params carry the four form values',
    params.from_name === 'E2E Tester' &&
      params.from_email === 'e2e@example.com' &&
      params.subject === 'Stubbed request' &&
      params.message === 'Body sent from the CDP test.',
    JSON.stringify(params)
  );
  check(
    'service/template/user ids are inlined from env',
    Boolean(payload.service_id && payload.template_id && payload.user_id),
    JSON.stringify({
      s: payload.service_id,
      t: payload.template_id,
      u: payload.user_id,
    })
  );

  for (let i = 0; i < 20 && !/sent successfully/i.test(state.bodyText); i++) {
    await sleep(400);
    state = await page.evaluate<FormState>(READ_FORM_STATE);
  }
  check(
    'success toast shown',
    /sent successfully/i.test(state.bodyText),
    state.toastText.slice(0, 120)
  );
  check(
    'form reset after success',
    state.values.from_name === '' && state.values.message === '',
    JSON.stringify(state.values)
  );
  check(
    'send button back to idle',
    state.sendDisabled === false,
    `disabled=${state.sendDisabled}`
  );

  page.close();
}

// ---------------------------------------------------------------- error path
{
  const page = await browser.newTarget(`${BASE}/contact`);
  for (let i = 0; i < 40; i++) {
    const probe = await page.evaluate<{ hydrated: boolean }>(HYDRATION_PROBE);
    if (probe.hydrated) break;
    await sleep(500);
  }

  await page.evaluate(`${STUB_FETCH}`);
  await page.evaluate(
    `(() => { document.querySelector('form').requestSubmit(); return true; })()`
  );

  let state = await page.evaluate<FormState>(READ_FORM_STATE);
  for (let i = 0; i < 20 && state.invalid.length === 0; i++) {
    await sleep(400);
    state = await page.evaluate<FormState>(READ_FORM_STATE);
  }

  check(
    'empty submit flags 4 fields invalid',
    state.invalid.length === 4,
    JSON.stringify(state.invalid)
  );
  for (const message of [
    'Name is required',
    'Email is required',
    'Subject is required',
    'Message is required',
  ]) {
    check(
      `validation message shown: "${message}"`,
      state.bodyText.includes(message)
    );
  }
  check(
    'no request sent while invalid',
    state.captures.length === 0,
    `count=${state.captures.length}`
  );

  page.close();
}

console.log(lines.join('\n'));
console.log(
  `\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`} (${lines.length} checks)`
);
browser.disconnect();
process.exit(failures === 0 ? 0 : 1);
