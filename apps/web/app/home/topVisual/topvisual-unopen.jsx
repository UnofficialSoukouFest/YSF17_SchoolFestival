import { solveBasePath } from '@/app/lib/index.js'
import Image from 'next/image'
import Countdown from '@/app/home/countdown/countdown.jsx'
import styles from './topvisual-unopen.module.css'

export default function TopVisualUnopen() {
  return (
    <div id="top_visual" className={styles.topVisualContainer}>
      {/* 仮作成のトップです */}
      <Image
        className={styles.topImage}
        src={solveBasePath('/ysf_top.png')}
        alt="横浜サイエンスフロンティア高校の画像です"
        width={780}
        height={450}
      />

      <div className={`${styles.top_cover}`}></div>

      <div className={styles.topInfoContainer}>
        <p className={styles.headText}>蒼煌祭非公式HP</p>
      </div>

      <div className={styles.middleInfoContainer}>
        <p className={styles.countdownText}>蒼煌祭の開催まで:</p>
        <Countdown />
      </div>

      <div className={styles.subInfoContainer}>
        <p className={styles.subtitle}>17th SOKO-FESTIVAL</p>
        <h1 className={styles.title}>
          蒼煌祭
          <span className={styles.title_thin}>「</span>
          澄
          <span className={styles.title_thin}>」</span>
        </h1>
        <p className={styles.titleInfo}>@YSFH・YSFJH</p>
        <p className={styles.titleInfo}>9/6 - 9/7 10:00≫15:00</p>
      </div>
    </div>
  )
}
