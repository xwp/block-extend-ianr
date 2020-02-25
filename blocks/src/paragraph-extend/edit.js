/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import {
	InspectorControls,
} from '@wordpress/block-editor'
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components'
import { createHigherOrderComponent } from '@wordpress/compose'
import { useSelect, select } from '@wordpress/data'

// Event hooks from global object
const { addFilter } = wp.hooks

/**
 * Internal dependencies
 */
import metadata from './block.json'

// Whitelist to restrict to specific blocks
const allowedBlocks = metadata.allowedBlocks

// This methodology updates count when adding/removing blocks
// Is this expected behaviour or a side effect (if latter then test)
const BlockCount = () => {
  const count = useSelect( () => {
    return select( 'core/block-editor' ).getBlockCount()
  }, [])

  return count
}

// TODO Use data API to get index count
// const BlockIndex = ( clientId ) => {
// 	return select( 'core/block-editor' ).getBlockIndex( clientId )
// }

// Filter the components for the block in the editor interface
const withParagraphExtendEdit =  createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {

		if ( allowedBlocks.includes( props.name ) ) {

			const {
				attributes,
				clientId,
				setAttributes,
			} = props

			const {
				orderNumber,
			} = attributes

			const className = classnames(
				'c-block-number',
			);

			// Quick hack whilst getting <BlockIndex clientId={clientId} /> to work
		  const getIndexCount = () => {
				return select( 'core/block-editor' ).getBlockIndex( clientId ) + 1
			}

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
										{ /* <BlockIndex clientId={ clientId } /> */ }
										Block #{ getIndexCount( clientId ) } of <BlockCount />
									</span>
								</Fragment>
						}
					</Fragment>
					<BlockEdit { ...props } />
				</Fragment>
			)

		} 
			return <BlockEdit { ...props } />
		;
	};
}, "withParagraphExtendEdit" )

// Todo doc this
addFilter(
	'editor.BlockEdit',
	'core/paragraph',
	withParagraphExtendEdit
);

export default withParagraphExtendEdit