addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

/**
 * An object with different URLs to fetch
 * @param {Object} ORIGINS
 */

function handleRequest(request) {
  let url = new URL(request.url);
  url.hostname = "api-eu.mixpanel.com";
  return fetch(url.toString(), request);
}

