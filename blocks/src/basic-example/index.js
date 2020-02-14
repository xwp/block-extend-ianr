/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

import './style.scss';

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
export const name = 'ir-block-extend/basic-example';

/**
 * Block configuration for functionality and settings
 */
export const settings = {
	title: __( 'Basic Example Block', 'ir-block-extend' ),
	description: __( 'This is just a basic example of a static block.', 'ir-block-extend' ),
	icon: 'image-filter',
	category: 'common',
	edit,
	save,
};