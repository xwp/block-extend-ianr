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
const ToggleNotice = ( { text } ) => (
	<Notice status="success">
		<p>Testing toggle: { text }</p>
	</Notice>
);

const MyButton = () => {
	return <Button>Click Me up!</Button>;
}

// The components for the block in the editor interface
const BasicExampleEdit = ( {
	attributes,
	setAttributes,
} ) => {
	const {
		content,
		orderNumber,
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
						?
						<Fragment>
							<ToggleNotice text="Coffee" />
							<MyButton />
						</Fragment>
						:
						<ToggleNotice text="Tea" />
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

export default BasicExampleEdit;