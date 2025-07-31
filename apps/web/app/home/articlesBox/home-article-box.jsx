import Link from 'next/link'
import Image from 'next/image'
import { solveBasePath } from '@/app/lib'
import styles from './home-article-box.module.css'

export default async function HomeArticleBox({ data, keyValue }) {
  /** @type {Date} */
  const date = data.date

  return (
    <Link href={data.link} key={keyValue} className={styles.boxLink}>
      <div className={styles.box}>
        <div className={styles.boxTitles}>
          <h3 className={styles.boxArticleTitle}>{data.title}</h3>
          <p className={styles.boxArticleDate}>{`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日投稿`}</p>
        </div>
        <div className={styles.boxImage}>
          <Image className={styles.image} src={solveBasePath(data.image ?? '/kari-fallback.png')} alt={`${data.title}のサムネイル`} fill={true} />
        </div>
      </div>
    </Link>
  )
}
