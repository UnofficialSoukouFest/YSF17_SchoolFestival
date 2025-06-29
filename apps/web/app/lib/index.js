import nextConfig from '@/next.config.js'

export * from './svg-controller.js'
export * from '@latimeria/core'

/**
 * URLパスを取得する。
 * `NODE_ENV`が有効時、`next.config.js`の`basePath`を参照してそこから始まるパスを返します。開発時は`src`をそのまま返します。
 * @param {string} source
 * @return {string}
 */
export function solveBasePath(source) {
  return process.env.NODE_ENV === 'production'
    ? `${nextConfig.basePath}${source}`
    : source
}
