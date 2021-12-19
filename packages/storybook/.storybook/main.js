module.exports = {
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: prop =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
	stories: [
		// --- GPF components ---
		"../../../apps/frontend/src/components/**/*.stories.mdx",
		"../../../apps/frontend/src/components/**/*.stories.@(js|jsx|ts|tsx)",

		// --- Global components ---
		"../../ui/**/*.stories.mdx",
		"../../ui/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
