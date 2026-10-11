export default {
	extends: [
		"cz"
	],
	rules: {
		"body-leading-blank": [2, "always"],
		"subject-empty": [2, "never"],
		"subject-max-length": [2, "always", 72],
		"type-empty": [2, "never"]
	}
};