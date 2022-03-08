import del from "rollup-plugin-delete";
import ts from "@rollup/plugin-typescript";

const production = process.env.NODE_ENV=='production';

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "esm",
      format: "esm",
      sourcemap: false
    },
    plugins: [
      production && del({ targets: "esm/*"}),
      ts({
          declaration: true,
          outDir: "esm",
          sourceMap: false
      }),
    ],
    external: ["mime-types", "file-type", "read-chunk", "fs", "util", "url"],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "cjs",
      format: "cjs",
      sourcemap: false
    },
    plugins: [
      production && del({ targets: "cjs/*" }),
      ts({
          declaration: false,
          outDir: "cjs",
          sourceMap: false
      }),
    ],
    external: ["mime-types", "file-type", "read-chunk", "fs", "util", "url"],
  },
];
