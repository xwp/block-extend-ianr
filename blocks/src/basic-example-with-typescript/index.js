import './editor.scss';

// Get translation functions
const { __ } = wp.i18n;

export const name = 'ir-block-extend/basic-example-with-typescript';

export const settings = {
	title: __( 'Basic Example Block with Tyepscript', 'ir-block-extend' ),

	description: __( 'This is just a basic example of a static block.', 'ir-block-extend' ),

	icon: 'image-filter',

	category: 'common',

	edit() {
		return (
			<div>
				<h2 className="c-block">Cannot edit me.</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Front end text.</h2>
			</div>
		);
	},
};
