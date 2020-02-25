/**
 * Internal dependencies
 */
import attributes from "./attributes";
import edit from "./edit";

// Styles imported for development mode (discarded on build)
import "./editor.scss";

/**
 * Block configuration object
 */
export const settings = {
	attributes,
	edit
};
