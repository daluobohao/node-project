export const types = [
	{ name: "feat:     新功能1", value: "feat" },
	{ name: "fix:      修复缺陷", value: "fix" },
	{ name: "docs:     文档变更", value: "docs" },
	{ name: "style:    代码格式，不影响逻辑", value: "style" },
	{ name: "refactor: 重构，不是新功能也不是修缺陷", value: "refactor" }
];

export const scopes = [{ name: "vue-demo" }, { name: "eslint" }, { name: "stylelint" }];

export const allowCustomScopes = true;

export const allowBreakingChanges = ["feat", "fix"];

export const subjectLimit = 72;