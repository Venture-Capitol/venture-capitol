const path = require("path");

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

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-scss",
	],

	webpackFinal: async config => {
		// add SCSS support for CSS Modules
		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader?modules&importLoaders", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		});

		return config;
	},
};
