# Deployment boundaries

- Public viewer target: **Cloudflare Pages** project `media-data-network-tv`.
- Administrator application: **Cloudflare Worker** `mdn-tv-f16a` (must remain untouched).
- Database: existing Supabase project `jofpkbiughfbdbxbmcvc`, with administrator RLS and rights checks unchanged.
- Before deployment, verify `npm test`, manual desktop/mobile playback, feed error handling, accessibility, and rights clearance.
- The Pages project uses **Direct Upload**, so new GitHub commits do not automatically deploy.
- After authorization and successful checks, deploy via `npx wrangler pages deploy public --project-name media-data-network-tv` with Cloudflare authorization.
- Do not commit `.env`, any Supabase service-role key, Cloudflare API tokens, administrator credentials, or private media.
