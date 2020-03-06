/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

/**
 * The markup to be serialized back when a post is saved
 *
 * @param {Object} extraProps Pass in additional props
//  * @param {Object} attributes
 */
const ParagraphExtendSave = ( extraProps ) => {
	// const { orderNumber } = attributes;

	return extraProps;
};

// Todo doc this
addFilter(
	'blocks.getSaveContent.extraProps',
	'core/paragraph',
	ParagraphExtendSave
);

export default ParagraphExtendSave;
