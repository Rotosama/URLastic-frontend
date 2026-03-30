const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					coral: "#F26076",
					orange: "#FF9760",
					yellow: "#FFD150",
					teal: "#458B73",
					cream: "#FFFAF5",
					dark: "#1C1C1C",
				},
			},
			fontFamily: {
				sans: ["Space Grotesk", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
});
