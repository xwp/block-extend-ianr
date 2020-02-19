/**
 * Internal dependencies
 */
import attributes from './attributes';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
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
 * Block name
 */
// export const name = 'ir-block-extend/paragraph-extend';

/**
 * Block configuration
 */

// const { attributes } = metadata;

// Whitelist to restrict to specific blocks
// To do - how to exit or if gate block/settings?
const allowedBlocks = [ 'core/paragraph' ];

export const settings = {

	// The display title shown in the block inserter
	// title: __( 'Paragraph: With Counter', 'ir-block-extend' ),

	// A more detailed description
	// description: __( 'This is the XWP coding challenge for Ian Register.', 'ir-block-extend' ),

	// The icon, from FontAwesome
	// Todo addFilter for this
	// icon,

	// The category is the section of the block inserter where this shows
	// category: 'common',

	// Keywords help users search for & find a block
	// keywords: [
		// __( 'custom block', 'ir-block-extend' ),
	// ],

	// Attributes define the data sources for the block
	attributes,

	edit,
	// save,
};