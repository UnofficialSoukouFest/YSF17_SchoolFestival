'use client'

import { TitleBar } from '@/app/component/title-bar.jsx'
import { BrowserView, MobileView } from 'react-device-detect'

export function Titlebar({ pagename = '無題' }) {
  return (
    <>
      <MobileView>
        <TitleBar pagename={pagename} />
      </MobileView>
      <BrowserView>
        <h1>{pagename}</h1>
      </BrowserView>
    </>
  )
}
