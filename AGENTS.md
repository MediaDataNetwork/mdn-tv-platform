# MDN TV development guidance

- Preserve the existing Cloudflare Worker administrator Control Room at https://mdn-tv-f16a.scoryell.workers.dev/.
- The public viewer is a distinct Cloudflare Pages project: media-data-network-tv. Do not deploy to the Worker.
- Preserve Supabase Auth, row-level security and publishing rights reviews. Never add service-role keys or admin secrets to browser code.
- The public feed endpoint is https://jofpkbiughfbdbxbmcvc.supabase.co/functions/v1/mdn-tv-public-feed.
- Four AI-only channels: News; Talks & Podcasts; Past, Present & Future; Applications & Learning.
- The original starter ZIP includes four sample MP4 files; those binary media files have not been imported by this GitHub integration. The viewer references them as local demo paths, so playback of those demos will not work from a GitHub-only checkout until media is uploaded.
- Changes should be developed and tested in source control before manual/direct-upload Cloudflare Pages deployment.
- White-label tenant provisioning, ad administration and independent tenant security remain future work, not live functionality.
