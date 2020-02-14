// Import the Component & Fragment classes from the wp-scripts ReactJS abstraction
const { Component, Fragment } =  wp.element;

// Add the CSS
import './style.scss';

// Get translation functions
const { __ } = wp.i18n;

// Get built in editor components
const {
	RichText,
	InspectorControls,
	BlockControls,
} = wp.editor;

export const name = 'learning-hmr-blocks/lifecycle';

export const settings = {

	// The title shown in the block picker
	title: __( 'React Lifecycle Block', 'learning-hmr-blocks' ),

	// A more detailed description
	description: __( 'Example block description', 'learning-hmr-blocks' ),

	// The icon, from the list of dashicons or material UI icons
	// https://material.io/tools/icons/
	icon: 'widget',

	// The category is the section of the block picker where this shows
	category: 'widgets',

	// Keywords help users search for & find a block
	keywords: [
		__( 'custom block', 'learning-hmr-blocks' ),
	],

	// Attributes define the data sources for the block
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
	},

	// The block in edit mode
	// React not available by default in frontend thus use lifecycle on edit
	edit: class extends Component {

		//standard constructor for a component
		constructor() {
			super(...arguments);
			console.log(this.props.name, ": constructor()");

			// example how to bind `this` to the current component for our callbacks
			this.onChangeContent = this.onChangeContent.bind(this);

			// some place for your state
			this.state = {};
		}

		componentDidMount() {
			console.log(this.props.name, ": componentDidMount()");
		}

		componentDidUpdate() {
			console.log(this.props.name, ": componentDidUpdate()");
		}


		componentWillUnmount() {
			console.log(this.props.name, ": componentWillUnmount()");
		}

		// update attributes when content is updated
		onChangeContent(data) {
			// set attribute the react way
			this.props.setAttributes({ content: data });
		}

		// edit: function (props) {
		// Creates a <p class='wp-block-cgb-block-react-lifecycle-block'></p>.
		render() {

			const { title, description } = this.attributes;

			return (

				<Fragment >
					<BlockControls>
						I appear inline with the block itself 😎
					</BlockControls>
					<InspectorControls>
					{/* <p className={this.props.className}> */}
					<p>
							I'm in the block settings sidebar 🧐
						</p>
					</InspectorControls>
					<div className={`learning-hmr-blocks ${className}`}>
						<RichText
							tagName="h2"
							value={ title }
							// onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<RichText
							tagName="p"
							multiline={ true }
							value={ description }
							// onChange={ ( description ) => setAttributes( { description } ) }
						/>
					</div>
				</Fragment>

			);
		}
	},

	// The output to save to the post content
	// save( { className, attributes } ) {
	save: ( props ) => {
		const { title, description } = props;

		return (
			<div className={`learning-hmr-blocks`}>
				<RichText.Content tagName="h2" value={ title } />
				<RichText.Content tagName="p" multiline={ true } value={ description } />
			</div>
		);
	},

};