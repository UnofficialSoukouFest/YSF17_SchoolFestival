'use client'

import { Button } from '@latimeria/ganoine'

/**
 * リンクボタンコンポーネント
 * @param {string} href
 * @param {React.ReactNode} children
 * @param properties
 * @return {JSX.Element}
 * @constructor
 */
export function LinkButton({ href, children, ...properties }) {
  return (
    <Button component="a" href={href} kind="primary" {...properties}>{children}</Button>
  )
}
