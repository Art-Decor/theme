module.exports = (ctx) => ({
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		'postcss-import': { root: ctx.file.dirname },
		cssnano:
			ctx.env === 'production'
				? {
						preset: 'default',
				  }
				: false,
	},
})
