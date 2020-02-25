<?php
/**
 * Tests for Router class.
 *
 * @package BlockExtend
 */

namespace XWP\BlockExtend;

use Mockery;
use WP_Mock;

/**
 * Tests for the Router class.
 */
class TestRouter extends TestCase {

	/**
	 * Test init.
	 *
	 * @covers \XWP\BlockExtend\Router::init()
	 */
	public function test_init() {
		$plugin = new Router( Mockery::mock( Plugin::class ) );

		WP_Mock::expectActionAdded( 'enqueue_block_editor_assets', [ $plugin, 'enqueue_editor_assets' ], 10, 1 );

		$plugin->init();
	}

	/**
	 * Test enqueue_editor_assets.
	 *
	 * @covers \XWP\BlockExtend\Router::enqueue_editor_assets()
	 */
	public function test_enqueue_editor_assets() {
		$plugin = Mockery::mock( Plugin::class );

		$plugin->shouldReceive( 'asset_url' )
			->once()
			->with( 'index.js', true, true )
			->andReturn( 'http://example.com/blocks/dist/index.js' );

		$plugin->shouldReceive( 'asset_version' )
			->once()
			->andReturn( '1.2.3' );

		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->with(
				'block-extend-js',
				'http://example.com/blocks/dist/index.js',
				Mockery::type( 'array' ),
				'1.2.3'
			);

		$block_extend = new Router( $plugin );
		$block_extend->enqueue_editor_assets();
	}
}
