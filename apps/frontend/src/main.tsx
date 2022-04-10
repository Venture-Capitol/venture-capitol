import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import mixpanel from "mixpanel-browser";

if (import.meta.env.PROD) {
	Sentry.init({
		dsn: "https://4a6047aa227744c3a069f323ff2dc54a@o1053443.ingest.sentry.io/6037959",
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

try {
	mixpanel.init("10f241f69734499fd9ade38e6172637d", {
		api_host: "https://mix.venturecapitol.de",
		debug: !import.meta.env.PROD,
	});

	mixpanel.track("Page Load");
} catch (e) {
	console.log(e);
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
