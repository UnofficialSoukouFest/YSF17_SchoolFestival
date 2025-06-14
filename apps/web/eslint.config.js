import { FlatCompat } from "@eslint/eslintrc";
import { config } from "@latimeria/eslint-config/base";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...config, ...compat.extends("next/core-web-vitals")];

export default eslintConfig;
