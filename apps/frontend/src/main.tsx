import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

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

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
