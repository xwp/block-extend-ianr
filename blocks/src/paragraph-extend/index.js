/**
 * Internal dependencies
 */
import attributes from './attributes';
import edit from './edit';
// import save from './save';

// Styles imported for HMR
import './editor.scss';

/**
 * WordPress dependencies
 * 
 * Refer to scripts/externals.js for importing @wordpress/* packages to `wp` global
 */

// Get translation functions
const { __ } = wp.i18n;

/**
 * Block configuration
 */
// Whitelist to restrict to specific blocks
// To do - how to exit or if gate block/settings?
const allowedBlocks = [ 'core/paragraph' ];

export const settings = {
	attributes,
	edit,
};