import bruce from "@yangzw/bruce-std/eslint";

export default bruce.map(config => {
	if (config.name !== "vue") return config;
	return {
		...config,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				...config.languageOptions?.parserOptions,
				extraFileExtensions: [".vue"]
			}
		},
		rules: {
			...config.rules,
			"@typescript-eslint/explicit-function-return-type": "off"
		}
	};
});