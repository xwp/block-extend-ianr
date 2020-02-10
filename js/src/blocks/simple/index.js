import './editor.scss';

export const name = 'ir-block-extend/simple';

export const settings = {
	title: 'Simple',

	description: 'Simple block.',

	icon: 'image-filter',

	category: 'common',

	edit() {

		return (
			<div>
				<h2 className='c-dawg'>Simply the messed yo</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Nap time yo!</h2>
			</div>
		);
	},
};