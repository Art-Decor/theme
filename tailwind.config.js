/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./assets/styles.css',
		'./components/**/*.{html,js,twig,css}',
		'./src/**/*.{html,twig,php}',
		'./templates/**/*.{html,js,twig}',
		'./wallsociety.theme',
	],
	theme: {
		container:{
			center: true,
			padding: '1.25rem'
		},
		extend: {
			fontSize:{
				'2xl': ['25px','2rem'],
				'4xl': ['35px','2.5rem'],
				'5xl': ['50px','1'],
			},
			colors: {
				neutral: {
					90: '#F5F4F5',
				},
				primary: {
					100: '#382335',
					80: '#604F5D',
					60: '#887B86',
					40: '#AFA7AE',
					20: '#D7D3D7',
				},
				brown: {
					100: '#CB925F',
					80: '#D5A87F',
					60: '#E0BE9F',
					40: '#EAD3BF',
					20: '#F5E9DF',
				},
				'brown-light': {
					100: '#EDC583',
					80: '#F1D19C',
					60: '#F4DCB5',
					40: '#F8E8CD',
					20: '#FBF3E6',
				},
				mint: {
					100: '#AACFCA',
					80: '#BBD9D5',
					60: '#CCE2DF',
					40: '#DDECEA',
					20: '#EEF5F4',
				},
				gray: {
					100: '#8D99AE',
					80: '#A4ADBE',
					60: '#BBC2CE',
					40: '#D1D6DF',
					20: '#E8EBEF',
					10: '#F9F8F9',
				},
				black: {
					DEFAULT: '#000000',
					80: '#191919',
					60: '#D2D2D2',
					40: '#EDEDED',
				},
				green: {
					100: '#0A5C30',
					80: '#10934D',
					60: '#16C568',
					40: '#93EBBC',
					20: '#D2F9E4',
				},
				red: {
					100: '#6E0C0C',
					80: '#A51212',
					60: '#E51A1A',
					40: '#F28C8C',
					20: '#FAD1D1',
				},
				yellow: {
					100: '#7A4800',
					80: '#B26800',
					60: '#FFBF00',
					40: '#FFDF80',
					20: '#FFF2CC',
				},
				blue: {
					100: '#103970',
					80: '#16509C',
					60: '#2073DF',
					40: '#89B8F5',
					20: '#D2E3F9',
				},
			},
			screens: {
				'md-wide': '992px',
			},
			fontFamily: {
				'header':['Playfair Display', 'serif'],
				'body':['Montserrat', 'sans-serif']
			}
		},
	},
	plugins: [],
}
