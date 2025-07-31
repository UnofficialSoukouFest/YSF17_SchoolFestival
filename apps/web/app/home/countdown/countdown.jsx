'use client'

import { useState } from 'react'
import styles from './countdown.module.css'

export default function Countdown() {
  const now = new Date()
  const openingTime = new Date('2025-09-06T10:00+09:00')
  const gap = (openingTime.getTime() - now.getTime()) / 1000
  const [timeInfo, setTimeInfo] = useState(
    [
      Math.floor(gap / (60 * 60 * 24)),
      Math.floor((gap / (60 * 60)) % 24),
      Math.floor((gap / 60) % 60),
      Math.floor(gap % 60),
    ])

  const change_text = () => {
    const times = [
      Math.floor(gap / (60 * 60 * 24)),
      Math.floor((gap / (60 * 60)) % 24),
      Math.floor((gap / 60) % 60),
      Math.floor(gap % 60),
    ]
    setTimeInfo(times)
  }

  setTimeout(change_text, 1000)

  return (
    <div id="countdown_display" className={styles.countdownText}>
      <span className={styles.number}>{timeInfo[0]}</span>
      日
      <span className={styles.number}>{timeInfo[1]}</span>
      時間
      <span className={styles.number}>{timeInfo[2]}</span>
      分
      <span className={styles.number}>{timeInfo[3]}</span>
      秒
    </div>
  )
}
