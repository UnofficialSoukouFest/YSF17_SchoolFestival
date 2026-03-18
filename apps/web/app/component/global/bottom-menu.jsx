'use client'

import { useEffect, useState } from 'react'
import styles from './bottom-menu.module.css'
import Link from 'next/link'
import { MdHome, MdOutlineFastfood, MdWysiwyg, MdAccessTime, MdOutlineMap } from 'react-icons/md'
import { usePathname } from 'next/navigation'

export default function BottomMenu() {
  /*
    activePathの初期化・更新について:
    pathname = "/a/b/c" とすると、
    最初 (レンダリング): b以下があろうと /a に初期化
    その後 (ページ遷移): b以下がない場合に限り /a に更新
  */

  const pathname = usePathname()
  const [activePage, setActivePage] = useState(() => {
    const splitPath = pathname.split('/')
    return '/' + splitPath[1]
  })
  useEffect(() => {
    const splitPath = pathname.split('/')
    if (splitPath.length == 2) {
      setActivePage('/' + splitPath[1])
    }
  }, [pathname])

  const items = [
    { label: '案内', href: '/', Icon: MdHome },
    { label: '食品', href: '/dining', Icon: MdOutlineFastfood },
    { label: '企画', href: '/program', Icon: MdWysiwyg },
    { label: '時間割', href: '/timetable', Icon: MdAccessTime },
    { label: '地図', href: '/map', Icon: MdOutlineMap },
  ]
  return (
    <footer className={styles['btmenu-base']}>
      <div className={styles['btmenu-blur']} />
      <nav className={styles['btmenu-main']}>
        <ul className={styles['btmenu-list']}>
          {items.map(({ label, href, Icon }) => {
            const isActive = href === activePage
            return (
              <li key={href}>
                <Link
                  href={href}
                  // onClick={() => setActivePage(href)}
                  className={`${styles['btmenu-item']} ${isActive ? styles['btmenu-item-active'] : styles['btmenu-item-normal']}`}
                >
                  <Icon size={40} className={styles['btmenu-icon']} />
                  <span className={styles['btmenu-label']}>
                    {' '}
                    {label}
                    {' '}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}
