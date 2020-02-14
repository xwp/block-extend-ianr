/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies - refer to scripts/externals.js for `wp` global
 */

// Get built in editor components
const {
	RichText,
} = wp.blockEditor;

/**
 * The markup to be serialized back when a post is saved
 */
export default function save( { attributes } ) {
	const {
		content,
	} = attributes;

	const className = classnames(
		'is-basic-editable-example',
	);

	return (
		<RichText.Content
			tagName="p"
			className={ className ? className : undefined }
			value={ content }
		/>
	);
}