/**
 * This file defines the configuration for development and dev-server builds.
 */
// const { unlinkSync } = require( 'fs' );
const { join } = require( 'path' );
// const onExit = require( 'signal-exit' );
const webpack = require( 'webpack' );
// const ManifestPlugin = require( 'webpack-manifest-plugin' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );
const postcssNormalize = require('postcss-normalize');

const externals = require( './externals' );

// Not currently implemented
// Clean up manifest on exit.
// Extend to set (or delete) a variable that PHP can pick up to determine if 
// webpack is running in dev mode and therefore set whether to serve assets
// from localhost or the actual local hostname - IF can't modify a .env variable

// onExit( () => {
// 	try {
// 		unlinkSync( 'build/asset-manifest.json' );
// 	} catch ( e ) {
// 		// Silently ignore unlinking errors: so long as the file is gone, that is good.
// 	}
// } );

const port = parseInt( process.env.PORT, 10 ) || 3030;
const publicPath = `http://localhost:${ port }/blocks/dist/`;

/**
 * Theme development build configuration.
 */
module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	context: process.cwd(),

	// Allow config to override shared devServer properties.
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		hotOnly: true,
		disableHostCheck: true,
		allowedHosts: [
      'localhost',
      'xwp.local',
		],
		watchOptions: {
			aggregateTimeout: 300,
		},
		stats: {
			all: false,
			assets: true,
			colors: true,
			errors: true,
			performance: true,
			timings: true,
			warnings: true,
		},
		port,
	},

	// Permit importing @wordpress/* packages.
	externals,

	// Specify where the code comes from.
	entry: {
		index: join( process.cwd(), 'blocks/src', 'index.js' ),
		style: join( process.cwd(), 'blocks/src', 'style.scss' ),
		editor: join( process.cwd(), 'blocks/src', 'editor.scss' ),
	},
	output: {
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: false,
		path: join( process.cwd(), 'blocks/dist' ),
		filename: '[name].js',
		publicPath,
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
				options: {
					// Cache compilation results in ./node_modules/.cache/babel-loader/
					cacheDirectory: true,
				},
			},
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /(node_modules|bower_components)/,
				include: [ join( process.cwd(), 'blocks/src' ) ],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// Only allow hot module reloading in development.
							// hmr: process.env.NODE_ENV === 'development',
							hmr: true,
							// Force reloading if hot module reloading does not work.
							reloadAll: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
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
							sourceMap: true,
						},
					},
				],
			},
		],
	},

	plugins: [
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that PHP can pick up their paths.
		// new ManifestPlugin( {
		// 	fileName: 'asset-manifest.json',
		// 	writeToFileEmit: true,
		// 	publicPath,
		// } ),
		// Enable HMR.
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		// Ignore the files produced on the fly in memory when extracting styles from JS imports
		new IgnoreEmitPlugin(['editor.js', 'style.js']),
	],
};
