/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies - refer to scripts/externals.js for `wp` global
 */

// Import the Fragment class from the wp-scripts ReactJS abstraction
const { Fragment } =  wp.element;

// Get translation functions
const { __ } = wp.i18n;

// Get built in editor components
const {
	RichText,
	InspectorControls,
	BlockControls,
} = wp.blockEditor;

// The components for the block in the editor interface
const BasicExampleEdit = ( {
	attributes,
	setAttributes,
} ) => {
	const {
		content,
	} = attributes;

	const className = classnames(
		'is-basic-editable-example',
	);

	return (
		<Fragment>
			<BlockControls>
				I appear inline
			</BlockControls>
			<InspectorControls>
				<p>I'm in the block settings sidebar and need padding.</p>
			</InspectorControls>
			<RichText
				identifier="content"
				tagName="p"
				multiline={ true }
				className={ className ? className : undefined }
				onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
				value={ content }
			/>
		</Fragment>
	);
}

export default BasicExampleEdit;