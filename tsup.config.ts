import { defineConfig } from "tsup";

/**
 * 各エントリーポイントを単一ファイルにバンドルし、型定義とソースマップを生成する設定。
 * React 依存のAPIは `react` サブパスとして分離し、関連パッケージはバンドルに含めず利用側に委ねる。
 */
export default defineConfig({
  entry: {
    index: "src/ts-utility/index.ts",
    react: "src/react/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    entry: {
      index: "src/ts-utility/index.ts",
      types: "src/types/index.ts",
      react: "src/react/index.ts",
    },
  },
  sourcemap: true,
  clean: true,
  splitting: false,
  target: "es2020",
  minify: false,
  external: ["react", "html-react-parser"],
  outDir: "dist",
  outExtension: ({ format }) => {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
