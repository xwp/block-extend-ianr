module.exports = {
	presets: [
		'@wordpress/default',
	],
	plugins: [
		["@babel/plugin-transform-react-jsx", {
      "pragma": "wp.element.createElement"
    }],
	],
};
