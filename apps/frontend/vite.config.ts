import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mdPlugin, { Mode } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react(), mdPlugin({ mode: [Mode.HTML] })],
	server: {
		fs: {
			allow: ["../.."],
		},
	},
});
