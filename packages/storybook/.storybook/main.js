module.exports = {
	stories: [
		// TODO: make all stories visible at the same time

		// --- GPF components ---
		"../../../apps/frontend/src/components/**/*.stories.mdx",
		"../../../apps/frontend/src/components/**/*.stories.@(js|jsx|ts|tsx)",

		// --- Global components ---
		"../../ui/**/*.stories.mdx",
		"../../ui/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
