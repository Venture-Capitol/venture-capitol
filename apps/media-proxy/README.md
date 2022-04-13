# Media Proxy

This is a cloudflare worker, proxying all requests to our media storage bucket. This would usually go through a load balancer, but firebase hosting doesn't allow forwarding requests to a storage bucket.

# Deploy

It is deployed automatically, but doesn't have a preview environment.
The deploy process calls `wrangler publish` in a GitHub action. The deployment needs a Cloudflare API Key with permissions to edit CloudFlare workers. You can generate one using [this](https://developers.cloudflare.com/api/tokens/create/) guide by cloudflare, or by clicking [here](https://dash.cloudflare.com/profile/api-tokens).
