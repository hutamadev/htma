/**
 * Minimal CDP client over Bun's native WebSocket — no puppeteer, no extra
 * dependency. Enough to attach to a local Chromium, open a page, evaluate
 * JavaScript in it, and wait for navigation events.
 *
 * Used by scripts/contact-form-e2e.ts, and handy on its own:
 *   const browser = await connect();            // ws://127.0.0.1:9222 by default
 *   const page = await browser.newTarget('http://127.0.0.1:3000/');
 *   await page.evaluate(`document.title`);
 *
 * The endpoint can be overridden with CDP_WS. Chromium only accepts remote
 * debugging on loopback (`--remote-debugging-address` was removed upstream), so
 * this is a local-only tool by construction.
 */
export interface CdpTarget {
  sessionId: string;
  send<T = unknown>(
    method: string,
    params?: Record<string, unknown>
  ): Promise<T>;
  evaluate<T>(expression: string, awaitPromise?: boolean): Promise<T>;
  close(): void;
}

interface Pending {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
}

interface CdpMessage {
  id?: number;
  method?: string;
  params?: unknown;
  sessionId?: string;
  result?: unknown;
  error?: { message?: string };
}

/** Malformed frames are ignored: a bad frame must not throw inside the
 *  WebSocket listener, where nothing is left to catch it. */
function parseMessage(data: string): CdpMessage | null {
  try {
    return JSON.parse(String(data)) as CdpMessage;
  } catch {
    return null;
  }
}

/**
 * Chromium serves the browser-level WebSocket at /devtools/browser/<id> and
 * rejects the bare origin that other CDP servers (Lightpanda) accept, so the
 * endpoint is discovered from /json/version unless a full path was given.
 */
async function resolveEndpoint(endpoint: string): Promise<string> {
  try {
    const url = new URL(endpoint);
    if (url.pathname !== '/' && url.pathname !== '') return endpoint;
    const res = await fetch(`http://${url.host}/json/version`);
    const body = (await res.json()) as { webSocketDebuggerUrl?: string };
    return body.webSocketDebuggerUrl ?? endpoint;
  } catch {
    return endpoint;
  }
}

export async function connect(
  endpoint = process.env.CDP_WS ?? 'ws://127.0.0.1:9222'
): Promise<{
  newTarget(url: string): Promise<CdpTarget>;
  disconnect(): void;
}> {
  const ws = new WebSocket(await resolveEndpoint(endpoint));
  let nextId = 0;
  const pending = new Map<number, Pending>();
  const waiters: {
    method: string;
    sessionId?: string;
    resolve: (params: unknown) => void;
  }[] = [];

  const raw = (
    method: string,
    params: Record<string, unknown>,
    sessionId?: string
  ): Promise<unknown> => {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(
        JSON.stringify(
          sessionId ? { id, method, params, sessionId } : { id, method, params }
        )
      );
    });
  };

  const waitEvent = (
    method: string,
    sessionId?: string,
    timeoutMs = 30_000
  ): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`timeout waiting for ${method}`)),
        timeoutMs
      );
      waiters.push({
        method,
        sessionId,
        resolve: (params) => {
          clearTimeout(timer);
          resolve(params);
        },
      });
    });

  await new Promise<void>((resolve, reject) => {
    ws.addEventListener('open', () => resolve(), { once: true });
    ws.addEventListener(
      'error',
      () => reject(new Error('CDP connect failed')),
      {
        once: true,
      }
    );
  });

  ws.addEventListener('message', (event) => {
    const msg = parseMessage(String(event.data));
    if (!msg) return;

    if (msg.id !== undefined) {
      const entry = pending.get(msg.id);
      if (!entry) return;
      pending.delete(msg.id);
      if (msg.error) entry.reject(new Error(msg.error.message ?? 'CDP error'));
      else entry.resolve(msg.result);
      return;
    }

    if (msg.method) {
      for (let i = waiters.length - 1; i >= 0; i--) {
        const waiter = waiters[i];
        if (!waiter || waiter.method !== msg.method) continue;
        if (waiter.sessionId && waiter.sessionId !== msg.sessionId) continue;
        waiters.splice(i, 1);
        waiter.resolve(msg.params);
      }
    }
  });

  const makeTarget = (sessionId: string, targetId: string): CdpTarget => ({
    sessionId,
    send: <T>(method: string, params: Record<string, unknown> = {}) =>
      raw(method, params, sessionId) as Promise<T>,
    async evaluate<T>(expression: string, awaitPromise = true) {
      const res = (await raw(
        'Runtime.evaluate',
        { expression, awaitPromise, returnByValue: true },
        sessionId
      )) as {
        result?: { value?: T };
        exceptionDetails?: {
          text?: string;
          exception?: { description?: string };
        };
      };
      if (res.exceptionDetails) {
        throw new Error(
          `page exception: ${
            res.exceptionDetails.exception?.description ??
            res.exceptionDetails.text
          }`
        );
      }
      return res.result?.value as T;
    },
    close: () => void raw('Target.closeTarget', { targetId }),
  });

  return {
    async newTarget(url: string) {
      const { targetId } = (await raw('Target.createTarget', {
        url: 'about:blank',
      })) as { targetId: string };
      const { sessionId } = (await raw('Target.attachToTarget', {
        targetId,
        flatten: true,
      })) as { sessionId: string };
      const target = makeTarget(sessionId, targetId);
      await target.send('Page.enable');
      await target.send('Runtime.enable');
      const loaded = waitEvent('Page.loadEventFired', sessionId, 60_000);
      await target.send('Page.navigate', { url });
      await loaded;
      return target;
    },
    disconnect: () => ws.close(),
  };
}
