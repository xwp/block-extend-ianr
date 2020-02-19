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
import { useSelect } from '@wordpress/data';

// Get data 
const { select } = wp.data;

// Get translation functions
const { __ } = wp.i18n;

// Get built in editor components
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

const {
	PanelBody,
	ToggleControl,
} = wp.components;

/**
 * Internal dependencies
 */
import metadata from './block.json';

// Whitelist to restrict to specific blocks
const allowedBlocks = metadata.allowedBlocks;

// This methodology updates count when adding/removing blocks
// Is this expected behaviour or a side effect (if latter then test)
const BlockCount = () => {
  const count = useSelect( ( select ) => {
    return select( 'core/block-editor' ).getBlockCount()
  }, []);

  return count;
}

const BlockIndex = ( clientId ) => {
	return select( 'core/block-editor' ).getBlockIndex( clientId );
}

// Filter the components for the block in the editor interface
const withParagraphExtendEdit =  createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {

		if ( allowedBlocks.includes( props.name ) ) {

			const {
				attributes,
				clientId,
				setAttributes,
			} = props;

			const {
				orderNumber,
			} = attributes;

			const className = classnames(
				'c-block-number',
			);

			// Quick hack whilst getting <BlockIndex clientId={clientId} /> to work
		  const getIndexCount = ( clientId ) => {
				return select( 'core/block-editor' ).getBlockIndex( clientId ) + 1;
			};

			return (
				<Fragment>
					<InspectorControls>
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
									<span className={ className }>
										{/* <BlockIndex clientId={clientId} /> */}
										Block #{ getIndexCount( clientId ) } of <BlockCount />
									</span>
								</Fragment>
						}
					</Fragment>
					<BlockEdit { ...props } />
				</Fragment>
			);

		} else
		{
			return <BlockEdit {...props} />;
		};
	};
}, "withParagraphExtendEdit" );

// Todo doc this
addFilter(
	'editor.BlockEdit',
	'core/paragraph',
	withParagraphExtendEdit
);

export default withParagraphExtendEdit;