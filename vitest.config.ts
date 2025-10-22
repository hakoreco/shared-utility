import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.{js,ts,jsx,tsx}"],
		environment: "jsdom",
		coverage: {
			include: ["src/**/*.{js,ts,jsx,tsx}"],
			provider: "v8",
		},
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
