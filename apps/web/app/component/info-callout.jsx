'use client'
import { Callout } from '@latimeria/ganoine'

/**
 * 情報のコールアウトコンポーネント
 * @param {JSX.Element} children
 * @return {JSX.Element}
 * @constructor
 */
export default function InfoCallout({ children }) {
  return (
    <Callout kind="info">
      {children}
    </Callout>
  )
}
