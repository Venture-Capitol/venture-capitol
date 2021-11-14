module.exports = {
	stories: [
		// TODO: make all stories visible at the same time

		// --- GPF components ---
		"../../../apps/frontend/src/components/**/*.stories.mdx",
		"../../../apps/frontend/src/components/**/*.stories.@(js|jsx|ts|tsx)",

		// --- UTR components ---
		"../../../apps/utr-frontend/components/**/*.stories.mdx",
		"../../../apps/utr-frontend/components/**/*.stories.@(js|jsx|ts|tsx)",

		// --- Global components ---
		"../../components/**/*.stories.mdx",
		"../../components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
