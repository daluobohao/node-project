import { registerHooks } from "node:module";

const HAS_EXTENSION = /\.[^./]+$/;

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (
			specifier.startsWith("node:") ||
			specifier.startsWith("data:") ||
			HAS_EXTENSION.test(specifier)
		) {
			return nextResolve(specifier, context);
		}

		try {
			return nextResolve(specifier, context);
		} catch (error) {
			if (error?.code !== "ERR_MODULE_NOT_FOUND") throw error;
			try {
				return nextResolve(`${specifier}.js`, context);
			} catch {
				throw error;
			}
		}
	},
});
