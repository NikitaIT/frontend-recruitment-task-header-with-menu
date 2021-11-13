const {
	colors: { white, black },
} = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	corePlugins: {
		// ie11
		backgroundOpacity: false,
		textOpacity: false,
	},
	purge: [
		"./app/parts/**/*.html",
		"./app/styles/functions/**/*.css",
		"./app/styles/utils.css",
	],
	theme: {
		fontSize: {
			xs: [".67rem", ""], // 8pt 10.67px (2), -cost, item name
			sm: [".75rem", ""], // 9pt 12px text, top-bar, smal cost, item count
			base: [".83rem", ""], // 10pt 13.33px cost, menu item
			button: [".88rem", ""], // 10.5pt 14px button
			xl: ["1rem", ""], // 12pt 16px big cost
		},
		fontFamily: {
			// esceped with quotes
			// html font sans by default
			sans: [
				'"Lato"',
				'"ui-sans-serif"',
				'"system-ui"',
				'"-apple-system"',
				'"BlinkMacSystemFont"',
				'"Segoe UI"',
				'"Roboto"',
				'"Helvetica Neue"',
				'"Arial"',
				'"Noto Sans"',
				'"sans-serif"',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			hsans: [
				'"Helvetica"',
				'"Lato"',
				'"ui-sans-serif"',
				'"system-ui"',
				'"-apple-system"',
				'"BlinkMacSystemFont"',
				'"Segoe UI"',
				'"Roboto"',
				'"Helvetica Neue"',
				'"Arial"',
				'"Noto Sans"',
				'"sans-serif"',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
		},
		colors: {
			white,
			black,
			gray: {
				// sorted by gray-scale
				200: "#f7f7f7", // menu item hover
				300: "#eeeeee", // popup border, content splitter line
				400: "#d3d3d3", // default border
				500: "#cbcbcb", // input border
			},
			accent: {
				// now in red-pink scale
				light: "#ecc7d0",
				DEFAULT: "#ea2260",
				// dark: "#ea2260",
			},
		},
		borderColor: (theme) => ({
			...theme("colors"),
			DEFAULT: theme("colors.gray.400", "currentColor"),
		}),
		extend: {},
	},
	darkMode: false,
	variants: { extend: {} },
	plugins: [],
};
