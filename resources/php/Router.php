<?php
/**
 * Router class.
 *
 * @package BlockExtend
 */

namespace XWP\BlockExtend;

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin Router.
 */
class Router {

	/**
	 * Plugin interface.
	 *
	 * @var Plugin
	 */
	protected $plugin;

	/**
	 * Setup the plugin instance.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Hook into WP.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_front_assets' ) );
	}

	/**
	 * Load our block assets into editor.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {

		// Quick and dirty hack to set HMR.
		$hmr         = true;
		$hmr ? $host = 'http://localhost:3030/' : $host = plugin_dir_url( __DIR__ );

		wp_enqueue_script(
			'block-extend-js',
			$host . 'blocks/dist/index.js',
			array(
				'lodash',
				'react',
				'wp-blocks',
				'wp-element',
				'wp-i18n',
				'wp-polyfill',
				'wp-block-editor',
			),
			$this->plugin->asset_version()
		);

		wp_enqueue_style(
			'block-extend-style-css',
			$host . 'blocks/dist/style.css',
			array(),
			$this->plugin->asset_version()
		);

		wp_enqueue_style(
			'block-extend-editor-css',
			$host . 'blocks/dist/editor.css',
			array(),
			$this->plugin->asset_version()
		);
	}

	/**
	 * Load our block assets into front end.
	 *
	 * @return void
	 */
	public function enqueue_front_assets() {
		wp_enqueue_style(
			'block-extend-css',
			$this->plugin->asset_url( 'blocks/dist/style.css' ),
			array(),
			$this->plugin->asset_version()
		);
	}
}
