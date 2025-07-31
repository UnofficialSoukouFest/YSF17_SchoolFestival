'use client'
import { Link } from '@latimeria/ganoine'
import styles from './source.module.css'

export default function Source() {
  return (
    <ul className={styles.list}>
      <li>
        <Link
          href="https://www.edu.city.yokohama.lg.jp/school/hs/sfh/index.cfm/31,0,72,224,html"
          kind="external"
          target="_blank"
        >
          <p className={styles.text}>第17回蒼煌祭について(公式HP)</p>
        </Link>
      </li>
      <li>
        <p className={styles.text}>聞き込み</p>
      </li>
    </ul>
  )
}
