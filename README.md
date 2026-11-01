# Media Data Network TV

Four-channel, AI-focused OTT television viewer and future branded-network platform.

## Current assets

The tested starter bundle is named `MDN_TV_Cursor_Development_Starter_v1.zip`. Its production viewer files belong in `public/`, with tests in `tests/`. The starter's original source has **not yet been imported** into this repository; this README initializes the repository and documents the safe import.

- Public viewer: Cloudflare Pages project `media-data-network-tv` (Direct Upload).
- Admin Control Room: https://mdn-tv-f16a.scoryell.workers.dev/ — **separate existing Cloudflare Worker, do not overwrite**.
- Public programming feed: https://jofpkbiughfbdbxbmcvc.supabase.co/functions/v1/mdn-tv-public-feed
- Supabase project: `jofpkbiughfbdbxbmcvc` — existing policies and content retained.

## Four channels
1. Media Data Network AI News
2. MDN AI Talks & Podcasts
3. MDN AI Past, Present & Future
4. MDN AI Applications & Learning

## Safe development process
1. Import the starter bundle source into `public/`, `tests/`, and the repository root, without committing secrets.
2. Run `npm test` before each proposed release.
3. Develop against the public *approved-programming* feed; do not embed administrator secrets or service-role keys.
4. Treat demo videos as demos, not as live editorial programming.
5. Deploy the viewer to the *Pages* project only after approval; never deploy the viewer to the separate admin Worker.
6. White-label tenancy is planned; do not claim tenant isolation is implemented until independently tested.

## Copyright
Only publish material after verifying ownership and broadcast/redistribution rights including music, logos, and third-party footage.
