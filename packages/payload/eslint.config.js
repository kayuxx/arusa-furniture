import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default {
  ignores: ["src/payload.types.ts"],
  name: "Ignore Payload types",
  ...nextJsConfig,
};
