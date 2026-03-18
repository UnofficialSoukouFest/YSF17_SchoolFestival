'use client'

import styles from './image-button.module.css'
import { solveBasePath } from '@/app/lib/index.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'

/**
 * 画像を主体としたボタンのようなリンク
 * @param name 表示される文字
 * @param pageUrl 遷移先URL
 * @param imageSrc 画像参照先
 * @returns
 */
export function ImageButton(property) {
  const bodyReference = useRef(null)
  const [imageWidth, setImageWidth] = useState(1)

  useEffect(() => {
    setImageWidth(bodyReference.current.offsetWidth)
  }, [])

  return (
    <div className={`${styles.imagebutton} bigButton`} ref={bodyReference}>
      <Link href={property.pageUrl}>
        <Image
          src={solveBasePath(property.imageSrc)}
          alt={`いい感じの${property.name}の画像`}
          width={imageWidth}// 560
          height={imageWidth * 33 / 56}// 330
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.imagebuttonImage}></div>
        <div className={styles.imagebuttonTexts}>
          <h1>{property.name}</h1>
          <MdNavigateNext className={styles.rightArrow} />
        </div>
      </Link>
    </div>
  )
}
