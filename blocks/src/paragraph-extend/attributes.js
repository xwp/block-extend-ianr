/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

/**
 * Internal dependencies
 */
import metadata from './block.json';

// Whitelist to restrict to specific blocks
const allowedBlocks = metadata.allowedBlocks;

const ParagraphExtendAttributes = ( settings ) => {
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, {
			orderNumber: {
				type: 'boolean',
				default: false,
			},
		} );
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'core/paragraph',
	ParagraphExtendAttributes
);

export default ParagraphExtendAttributes;
