import styles from './header.module.css'
import Link from 'next/link'

/**
 * ヘッダー部分を表示
 * @param {"smartphone" | "PC"} [view="PC"]
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({ view = 'PC' }) {
  if (view === 'PC') {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">🐟</Link>
        </div>
        <div className={styles.menu}>
          <Link href="/program">企画</Link>
          <Link href="/dining">食事</Link>
          <Link href="/timetable">タイムテーブル</Link>
          <Link href="/map">地図</Link>
        </div>
      </header>
    )
  }
}
