import Image from 'next/image'
import Link from 'next/link'

import styles from './small-program-page.module.css'

export default function ProgramPopup({ title, id, images, place, text }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.main}>
        <h1>{ title }</h1>
        <Image src={images} alt="サンプルPR画像" className={styles.images} />
        <p>{place}</p>
        <p>{text}</p>
        <Link href={`/program/${id}`} className={styles.link}>
          <span>
            この企画のページへ
          </span>
        </Link>
      </div>
    </div>
  )
}
