/* eslint-disable @typescript-eslint/no-var-requires */

// See https://cssdb.org/
const stage = {
	experimental: 0, // This is a crazy idea. Unofficial Draft
	aspirational: 1, // This idea might not be crazy. Editor’s Draft
	allowable: 2, // This idea is not crazy. Working Draft
	embraced: 3, // This idea is becoming part of the web. Candidate Recommendation
	standardized: 4, // This idea is part of the web. Recommendation
};

module.exports = {
	plugins: [
		require("postcss-import"), // css @import
		require("postcss-focus-visible"),
		require("postcss-preset-env")({
			stage: stage.aspirational,
			preserve: false,
			"nesting-rules": true,
			autoprefixer: { grid: "autoplace" },
		}),
		require("tailwindcss"),
		require("cssnano")({
			preset: ["default", { discardComments: { removeAll: true } }],
		}),
	],
};
