const corsHeaders = {
	"Access-Control-Allow-Origin": "https://venturecapitol.de",
	"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
	"Access-Control-Max-Age": "86400",
};

addEventListener("fetch", event => {
	if (event.request.method === "OPTIONS") {
		// Handle CORS preflight requests
		event.respondWith(handleOptions(event.request));
	} else if (
		event.request.method === "GET" ||
		event.request.method === "HEAD" ||
		event.request.method === "POST"
	) {
		event
			.respondWith(handleRequest(event.request))
	}
});

/**
 * An object with different URLs to fetch
 * @param {Object} ORIGINS
 */

async function handleRequest(request) {
	let url = new URL(request.url);
	url.hostname = "api-eu.mixpanel.com";


	const mixpanelResponse = await fetch(url.toString(), request);
	let response = new Response(mixpanelResponse.body, mixpanelResponse);
	response.headers.set("Access-Control-Allow-Origin", corsHeaders["Access-Control-Allow-Origin"]);
  response.headers.append('Vary', 'Origin');

	return response;
}

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}