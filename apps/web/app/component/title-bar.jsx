'use client'
/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from './title-bar.module.css'
import { useRouter } from 'next/navigation'
import { MdOutlineArrowBackIos } from 'react-icons/md'

/**
 * 上部のページ名
 * @param {string} pagename - ページ名
 * @param {string} themeColor - テーマカラー
 * @returns {JSX.Element}
 */
export function TitleBar({
  pagename = '無題',
  themeColor,
}) {
  return (
    <header className={styles['title-bar']}>
      <Title pagename={pagename} themeColor={themeColor} />
    </header>
  )
}

/**
 * 上部の戻るボタン＋ページ名
 * @param {string} pagename - ページ名
 * @param {string} themeColor - テーマカラー
 * @returns {JSX.Element}
 */
export function TitleBarWithBack({
  pagename = '無題',
  themeColor,
}) {
  return (
    <header className={styles['title-bar-b']}>
      <BackButton arrowColor={themeColor} />
      <Title pagename={pagename} themeColor={themeColor} />
    </header>
  )
}

/**
 * ページ名
 * @param {string} pagename - ページ名
 * @param {string} themeColor - テーマカラー
 * @returns {JSX.Element}
 */
function Title({
  pagename = '無題',
  themeColor,
}) {
  return (
    <div
      className={styles['page-title']}
      style={{
        color: themeColor,
        fontSize: Math.min(Math.max(24, 320 / pagename.length), 32),
      }}
    >
      <span>{pagename}</span>
    </div>
  )
}

/**
 * 左上の矢印戻るボタン
 * @param {string} arrowColor - 矢印の色
 * @returns {JSX.Element}
 */
function BackButton({ arrowColor }) {
  const router = useRouter()
  return (
    <div onClick={() => router.back()} role="link" className={styles['back-button']}>
      <MdOutlineArrowBackIos size={44} color={arrowColor} />
    </div>
  )
}
