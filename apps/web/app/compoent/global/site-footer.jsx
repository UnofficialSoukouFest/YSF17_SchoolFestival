'use client'

import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import styles from './site-footer.module.css'
import { solveBasePath } from '@/app/lib/index.js'

export default function SiteFooter() {
  const height = isMobile ? 192 : 128
  const padding = isMobile ? 64 : 0
  return (
    <footer className={styles['ft-base']} style={{ height: height }}>
      <div className={styles['ft-bg']} />
      <div className={styles['ft-main']} style={{ height: height, paddingBottom: padding }}>
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
