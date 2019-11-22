// Add the JS code to this file. On running npm run dev, it will compile to js/dist/.

import {__} from "@wordpress/i18n";
import {registerBlockType} from "@wordpress/blocks";

import {RichText, AlignmentToolbar, BlockControls, InspectorControls} from "@wordpress/block-editor";

registerBlockType("xwp-wp-test/modify-paragraph", {
	title: __("XWP Test: Paragraph ", "gutenberg-examples"),
	icon: "universal-access-alt",
	category: "layout",
	attributes: {
		content: {
			type: "array",
			source: "children",
			selector: "p"
		},
		alignment: {
			type: "string",
			default: "none"
		}
	},
	example: {
		attributes: {
			content: __("Hello world"),
			alignment: "right"
		}
	},
	edit: props => {
		const {
			attributes: {
				content,
				alignment
			},
			className
		} = props;

		const onChangeContent = newContent => {
			props.setAttributes({content: newContent});
		};

		const onChangeAlignment = newAlignment => {
			props.setAttributes({
				alignment: newAlignment === undefined
					? "none"
					: newAlignment
			});
		};

		return (<div>
			{
				<BlockControls>
						<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
					</BlockControls>
			}
			<InspectorControls>
				<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
			</InspectorControls>
			<RichText className={className} style={{
					textAlign: alignment
				}} tagName="p" onChange={onChangeContent} value={content}/>
		</div>);
	},
	save: props => {
		return (<RichText.Content className={`gutenberg-examples-align-${props.attributes.alignment}`} tagName="p" value={props.attributes.content}/>);
	}
});
