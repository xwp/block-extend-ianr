<?php
/**
 * Plugin Name: IR Block Extend 
 * Description: Extend Gutenberg editor blocks. This is a coding challeng by XWP for Ian Register. 
 * Version: 0.1.0
 * Author: XWP & Ian Register
 * Author URI: https://github.com/xwp/block-extend-ianr
 * Text Domain: ir-block-extend
 */

namespace XWP\BlockExtend;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

// Support for site-level autoloading.
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

$router = new Router( new Plugin( __FILE__ ) );

add_action( 'plugins_loaded', [ $router, 'init' ] );
