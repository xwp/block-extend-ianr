/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies - refer to scripts/externals.js for `wp` global
 */

// Import the Fragment class from the wp-scripts ReactJS abstraction
const { Fragment } =  wp.element;

// Test import directly and not via accessing wp global from externals.js
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

// Get data 
const { select } = wp.data;

// Get translation functions
const { __ } = wp.i18n;

// Get built in editor components
const {
	RichText,
	InspectorControls,
	BlockControls,
} = wp.blockEditor;

const {
	Notice,
	PanelBody,
	ToggleControl,
} = wp.components;

// Use built in Notice to test toggle
const ToggleNotice = () => (
	<Notice status="success">
		<p>There are:</p>
	</Notice>
);

const MyButton = () => {
	return <Button>Click Me up!</Button>;
}

// This methodology updates count when adding/removing blocks
// Is this expected behaviour or a side effect (if latter then test)
const BlockCount = () => {
  const count = useSelect( ( select ) => {
    return select( 'core/block-editor' ).getBlockCount()
  }, '[]');

  return count;
}

const BlockData = () => {
  const index = useSelect( ( select ) => {
    return select( 'core/block-editor' ).getSelectedBlockCount()
  }, '[]' );

  return index;
}

// This does not update when removing blocks - use subscribe method to update
const BlockCountAlt = () => {
	return select( 'core/block-editor' ).getBlockCount();
}

// The components for the block in the editor interface
const ParagraphExtendEdit = ( {
	attributes,
	setAttributes,
} ) => {
	const {
		content,
		orderNumber,
		blocksTotal,
	} = attributes;

	const className = classnames(
		'c-block-number',
	);

	return (
		<Fragment>
			<BlockControls>
				I appear inline
			</BlockControls>
			<InspectorControls>
				<p>I'm in the block settings sidebar and need padding.</p>
				<PanelBody title={ __( 'Display Settings' ) } className="blocks-">
					<ToggleControl
						label={ __( 'Show Order Number' ) }
						checked={ !! orderNumber }
						onChange={ () => setAttributes( { orderNumber: ! orderNumber } ) }
						help={ orderNumber ?
							__( 'Showing order.' ) :
							__( 'Toggle to show order of paragraph blocks.' )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Fragment>
				{ orderNumber 
						&&
						<Fragment>
							<span className={ className ? className : undefined }>Block #<BlockData/> of <BlockCount /></span>
						</Fragment>
				}
			</Fragment>
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

export default ParagraphExtendEdit;