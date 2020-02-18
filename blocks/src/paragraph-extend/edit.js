/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies - refer to scripts/externals.js for `wp` global
 */

// Import the Fragment class from the wp-scripts ReactJS abstraction
const { Fragment } =  wp.element;

// Todo - doc this
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks; 

// Test import directly and not via accessing wp global from externals.js
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

// Get data 
const { select } = wp.data;

// Get translation functions
const { __ } = wp.i18n;

// Get built in editor components
const {
	InspectorControls,
	BlockControls,
} = wp.blockEditor;

const {
	PanelBody,
	ToggleControl,
} = wp.components;

// This methodology updates count when adding/removing blocks
// Is this expected behaviour or a side effect (if latter then test)
const BlockCount = () => {
  const count = useSelect( ( select ) => {
    return select( 'core/block-editor' ).getBlockCount()
  }, []);

  return count;
}

const BlockData = () => {
  const index = useSelect( ( select ) => {
    return select( 'core/block-editor' ). getBlock()
  }, [] );
	// console.log(index);
	
  return index;
}

// This does not update when removing blocks - use subscribe method to update
const BlockCountAlt = () => {
	return select( 'core/block-editor' ).getBlockCount();
}

// Filter the components for the block in the editor interface
const withParagraphExtendEdit =  createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {

		const {
			attributes,
			setAttributes,
		} = props;

		const {
			orderNumber,
		} = attributes;

		const className = classnames(
			'c-block-number',
		);

		return (
			<Fragment>
				<BlockEdit { ...props } />
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
								<span className={ className }>Block #<BlockData/> of <BlockCount /></span>
							</Fragment>
					}
				</Fragment>
			</Fragment>
		);
	};
}, "withParagraphExtendEdit" );

// Todo doc this
addFilter(
	'editor.BlockEdit',
	'core/paragraph',
	withParagraphExtendEdit
);

export default withParagraphExtendEdit;