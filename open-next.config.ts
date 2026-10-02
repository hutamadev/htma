import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// No incrementalCache override: this repo has no ISR, no `revalidate` and no
// dynamic routes, so nothing is ever cached and the R2 binding would be dead
// weight. Add `incrementalCache: r2IncrementalCache` back together with an
// `r2_buckets` binding named NEXT_INC_CACHE_R2_BUCKET in wrangler.jsonc if ISR
// is ever introduced.
export default defineCloudflareConfig({});
