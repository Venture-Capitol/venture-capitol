addEventListener("fetch", event => {
	event.respondWith(
		handleRequest(event.request).catch(
			err => new Response(err.message, { status: 500 })
		)
	);
});

/**
 * Proxy request to storage bucket
 * @param {Request} request
 * @returns promise containing fetch to bucket url
 */
function handleRequest(request) {
	let url = new URL(request.url);

	if (!url.pathname.startsWith("/media/"))
		throw new Error("Access media storage!");

	url.pathname = "/vc-media" + url.pathname;
	url.hostname = "storage.googleapis.com";

	return fetch(url.toString(), request);
}
