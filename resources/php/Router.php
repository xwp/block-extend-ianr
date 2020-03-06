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
		wp_enqueue_script(
			'block-extend-js',
			$this->plugin->asset_url( 'index.js', true, false ),
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
			$this->plugin->asset_url( 'style.css', true, false ),
			array(),
			$this->plugin->asset_version()
		);

		wp_enqueue_style(
			'block-extend-editor-css',
			$this->plugin->asset_url( 'editor.css', true, false ),
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
			$this->plugin->asset_url( 'style.css', true, false ),
			array(),
			$this->plugin->asset_version()
		);
	}
}
