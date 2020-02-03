/**
 * Dynamically locate, load & register all Gutenberg blocks.
 */
import { autoloadBlocks } from 'block-editor-hmr';

// Load all block index files.
autoloadBlocks(
	{
		/**
		 * Return a project-specific require.context.
		 */
		getContext: () => require.context( './blocks', true, /index\.js$/ ),
	},
	( context, loadModules ) => {
		if ( module.hot ) {
			module.hot.accept( context.id, loadModules );
		}
	}
);