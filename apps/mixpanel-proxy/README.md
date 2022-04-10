# Mixpanel Proxy

This is a cloudflare worker, proxying all requests to mixpanel through our domain.

# Deploy

It is deployed automatically, but doesn't have a preview environment.
The deploy process calls `wrangler publish` in a GitHub action. The deployment needs a Cloudflare API Key with permissions to edit CloudFlare workers. You can generate one using [this](https://developers.cloudflare.com/api/tokens/create/) guide by cloudflare, or by clicking [here](https://dash.cloudflare.com/profile/api-tokens).
