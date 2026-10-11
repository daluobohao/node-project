import stylistic from "@stylistic/stylelint-plugin";
import bruce from "@yangzw/bruce-std/stylelint";

export default {
	...bruce,
	plugins: bruce.plugins.concat(stylistic),
	rules: {
		...bruce.rules,
		"@stylistic/block-closing-brace-empty-line-before": "never"
	}
};