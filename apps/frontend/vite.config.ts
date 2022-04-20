import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import mdxesb from "@mdx-js/esbuild";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		// mdxesb({
		// 	// development: true,
		// 	providerImportSource: '@mdx-js/react'
		// }),
		mdx(),
		react(),
	],

	server: {
		fs: {
			allow: ["../.."],
		},
		proxy: {
			"/api": "http://localhost:8101",
			"/dlr": "http://localhost:8103",
		},
	},
	resolve: {
		alias: {
			"react/jsx-runtime": "react/jsx-runtime.js",
		},
	},
});
