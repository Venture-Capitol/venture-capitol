import { defineConfig } from "orval";

export default defineConfig({
	gpf: {
		input: "./openapi.yaml",
		output: {
			mode: "split",
			target: "./api.ts",
			client: "axios-functions",
		},
	},
});
