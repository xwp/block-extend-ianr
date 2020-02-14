/**
 * This file defines the configuration that is used for the production build.
 */
const { join } = require( 'path' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );
const postcssNormalize = require('postcss-normalize');

const externals = require( './externals' );

/**
 * Theme production build configuration.
 */
module.exports = {
	mode: 'production',
	devtool: 'hidden-source-map',
	context: process.cwd(),

	// Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
	},

	// Permit importing @wordpress/* packages.
	externals,

	// Optimize output bundle.
	optimization: {
		minimize: true,
		noEmitOnErrors: true,
	},

	// Specify where the code comes from.
	entry: {
		index: join( process.cwd(), 'blocks/src', 'index.js' ),
		style: join( process.cwd(), 'blocks/src', 'style.scss' ),
		editor: join( process.cwd(), 'blocks/src', 'editor.scss' ),
	},
	output: {
		pathinfo: false,
		path: join( process.cwd(), 'blocks/dist' ),
		filename: '[name].js',
	},

	module: {
		strictExportPresence: true,
		rules: [
			{
				// Process JS with Babel.
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				include: [ join( process.cwd(), 'blocks/src' ) ],
				loader: require.resolve( 'babel-loader' ),
			},
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /(node_modules|bower_components)/,
				include: [ join( process.cwd(), 'blocks/src' ) ],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [ 
								require('postcss-flexbugs-fixes'),
								require('postcss-preset-env')({
									autoprefixer: {
										flexbox: 'no-2009',
									},
									stage: 3,
								}),
								// Adds PostCSS Normalize as the reset css with default options,
								// so that it honors browserslist config in package.json
								// which in turn let's users customize the target behavior as per their needs.
								postcssNormalize(),
							 ],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
						},
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new IgnoreEmitPlugin(['index.css', 'editor.js', 'style.js']),
	],

};