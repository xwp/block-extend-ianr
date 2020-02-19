/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks; 

const ParagraphExtendAttributes = ( settings ) => {

	// Todo Add test to ensure orderNumber doesn't exist as it would be over written
	settings.attributes = Object.assign( settings.attributes, {
		orderNumber:{ 
			type: 'boolean',
			default: false,
		}
	});

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'core/paragraph',
	ParagraphExtendAttributes
);

export default ParagraphExtendAttributes;