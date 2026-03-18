'use client'
import { Callout } from '@latimeria/ganoine'

/**
 * 警告のコールアウトコンポーネント
 * @param {JSX.Element} children
 * @return {JSX.Element}
 * @constructor
 */
export default function WarnCallout({ children }) {
  return (
    <Callout kind="warn">
      {children}
    </Callout>
  )
}
