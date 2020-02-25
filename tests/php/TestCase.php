<?php
/**
 * Tests Case class.
 *
 * @package BlockExtend
 */

namespace XWP\BlockExtend;

use Mockery;
use WP_Mock;

/**
 * Tests for the Router class.
 */
class TestCase extends WP_Mock\Tools\TestCase {

	use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;

}
