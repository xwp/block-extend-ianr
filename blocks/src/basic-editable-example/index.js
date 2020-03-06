/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

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
export const name = 'ir-block-extend/basic-editable-example';

/**
 * Block configuration
 */
export const settings = {

	// The display title shown in the block inserter
	title: __( 'Basic Editable Example Block', 'ir-block-extend' ),

	// A more detailed description
	description: __( 'This is just a basic example of an editable block.', 'ir-block-extend' ),

	// The icon, from the list of dashicons or material UI icons
	// https://material.io/tools/icons/
	icon: 'widget',

	// The category is the section of the block inserter where this shows
	category: 'widgets',

	// Keywords help users search for & find a block
	keywords: [
		__( 'custom block', 'ir-block-extend' ),
	],

	// Attributes define the data sources for the block
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
	},
	edit,
	save,
};
