const { pathToFileURL } = require("url");

module.exports = function ({ types: t }) {
	return {
		visitor: {
			MemberExpression(path, state) {
				const { node } = path;
				if (
					!t.isMetaProperty(node.object) ||
					node.object.meta.name !== "import" ||
					node.object.property.name !== "meta" ||
					!t.isIdentifier(node.property, { name: "url" })
				) {
					return;
				}

				const filename = state.file.opts.filename;
				path.replaceWith(t.stringLiteral(pathToFileURL(filename).href));
			},
		},
	};
};
