'use client'

import Image from 'next/image'
import styles from './site-footer.module.css'
import './site-footer.rwd.css'
import { solveBasePath } from '@/app/lib/index.js'

export default function SiteFooter() {
  return (
    <footer className={`${styles['ft-base']} ft-rwd-height ft-rwd-visible`}>
      <div className={`${styles['ft-bg']} ft-rwd-height`} />
      <div className={`${styles['ft-main']} ft-main-rwd-padding-bottom ft-rwd-height`}>
        <Image
          src={solveBasePath('/latimeria_logo_768.png')}
          alt="シーラカンスのロゴです"
          width={100}
          height={100}
        />
        <div className={styles['ft-text']}>
          <p className={styles['ft-producedby']}>サイト制作</p>
          <p className={styles['ft-us']}>シーラカンス</p>
        </div>
      </div>
    </footer>
  )
}
