'use client'

import { isMobile } from 'react-device-detect'
import Header from '@/app/compoent/header'
import Footer from '@/app/compoent/footer'

export default function Menu() {
  return (
    <>
      {isMobile ? <Footer /> : <Header />}
    </>
  )
}
