module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
		  		red: {dark: '#8b0909'},
		  		indigo: {dark: '#1E0B53'},
		  		green: {dark: '#2A5B0B'}
			},
			height: {
				seventy: '70vh',
				eighty: '80vh',
			}
		}
	},
	variants: {
		extend: {},
	},
		plugins: [],
	}
