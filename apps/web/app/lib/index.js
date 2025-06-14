import nextConfig from "@/next.config.mjs";
import path from "path";

export * from "@latimeria/core";

/**
 * URLパスを取得する。
 * `NODE_ENV`が有効時、`next.config.js`の`basePath`を参照してそこから始まるパスを返します。開発時は`src`をそのまま返します。
 * @param {string} src
 * @return {string}
 */
export function solveBasePath(src) {
  return process.env.NODE_ENV === "production"
    ? path.join(nextConfig.basePath || "", src)
    : src;
}
