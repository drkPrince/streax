module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
		  		indigo: {dark: '#5d13e7'},
		  		red: {dark: '#c10e23'},
		  		orange: {dark: '#ef5b09'},
		  		green: {dark: '#167e80'},
		  		pink: {dark: '#ff008e'}
			}
		}
	},
	variants: {
		extend: {},
	},
		plugins: [],
	}
