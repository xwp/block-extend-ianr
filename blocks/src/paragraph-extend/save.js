/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks; 

/**
 * The markup to be serialized back when a post is saved
 */
const ParagraphExtendSave =  ( extraProps, attributes ) => {

	const { orderNumber } = attributes;

	return extraProps;

}

// Todo doc this
addFilter(
	'blocks.getSaveContent.extraProps',
	'core/paragraph',
	ParagraphExtendSave
);

export default ParagraphExtendSave;