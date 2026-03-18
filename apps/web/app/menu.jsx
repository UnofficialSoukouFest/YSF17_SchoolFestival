'use client'

import { isMobile } from 'react-device-detect'
import Header from '@/app/component/header'
import BottomMenu from '@/app/component/global/bottom-menu'
import { ClientProvider } from '@/app/provider.jsx'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return

  document.body.classList.toggle('isMobile', isMobile)

  return (
    <ClientProvider>
      {isMobile ? <BottomMenu /> : <Header /> }
    </ClientProvider>
  )
}
