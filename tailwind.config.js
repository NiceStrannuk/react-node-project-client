/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"semi-black": "#1A1D1F",
				"main-blue": "#475BE8",
				"main-white": "#EFEFEF",
				"text-second": "#6F767E",
				"border-black": "#272B30"
			},
			fontFamily: {
				"manrope": ['Manrope', "sans-serif"]
			}
		},
	},
	plugins: [],
}