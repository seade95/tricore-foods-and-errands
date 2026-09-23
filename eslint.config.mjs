import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Root utility scripts (CommonJS, not part of the Next app):
    "auth.js",
    "server.js",
  ]),
  {
    rules: {
      // Dynamic JSON content store intentionally uses `any` in places.
      "@typescript-eslint/no-explicit-any": "warn",
      // Prefer next/image but allow plain <img> for admin previews / dynamic CMS URLs.
      "@next/next/no-img-element": "warn",
    },
  },
]);

export default eslintConfig;
