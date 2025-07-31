import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'

import styles from './small-program-page.module.css'

const handleContentClick = (event) => {
  event.stopPropagation()
}

export default function ProgramPopup({ detail, popheight, popwidth, isDisplayPage, handleClick }) {
  if (!popheight) {
    popheight = window.innerHeight - 144
  }
  if (!popwidth) {
    popwidth = widthAdjust(window.innerWidth - 24)
  }
  return (
    <div>
      {
        isDisplayPage && createPortal(
          <div className={styles.backdrop} onClick={handleClick}>
            <div className={styles.main} onClick={handleContentClick} style={{ width: popwidth, height: popheight }}>
              <label className={styles.popupCloseButton}>
                <button type="button" onClick={handleClick} />
                <span>
                  ✕
                </span>
              </label>
              <div className={styles.content}>
                <h1>{ detail.name }</h1>
                <Image src={detail.options.imagePath} alt="サンプルPR画像" width={100} height={100} />
                <p className={styles.area}>{detail.aria + '@' + detail.location }</p>
                <p className={styles.prText}>{ detail.prText }</p>
                <Link href={`/program/${detail.id}`} className={styles.link}>
                  <span>
                    この企画の詳細ページへ
                  </span>
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      }
    </div>
  )
}

/**
 * レスポンシブな幅を提供 (お好みに合わせて値をいじってください)
 * @param {Number} width
 * @returns {Number} 調整された幅
 */

function widthAdjust(width) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}
