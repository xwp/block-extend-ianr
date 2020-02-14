/**
 * Dynamically locate, load & register all Gutenberg blocks.
 */
import { autoloadBlocks } from 'block-editor-hmr';

// TODO
// Remove or make optional the dynamic autoloading of all blocks
// so that blocks can be loaded in relevant order ie for UI or any backend
// logic requirements rather than alphabetical

// Load all block index files.
autoloadBlocks(
	{
		/**
		 * Return a project-specific require.context.
		 */
		getContext: () => require.context( './', true, /index\.js$/ ),
	},
	( context, loadModules ) => {
		if ( module.hot ) {
			module.hot.accept( context.id, loadModules );
		}
	}
);