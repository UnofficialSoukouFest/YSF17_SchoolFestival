'use client'

import styles from './popup.module.css'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from './button'

export type PopupKinds = 'default'

export type PopupProperties = {
  children: ReactNode
  buttonChildren?: ReactNode
  hasOpenButton?: boolean
  kind?: PopupKinds
  popwidth?: number
  popheight?: number
}

/**
 * ## Ganoineのポップアップコンポーネント
 * `ProgramPopup`を使うことでポップアップを作成することができます。
 * Popupでは予約語であることが多いため、`ProgramPopup`となっていることに気をつけてください。
 *
 * `hasOpenButton`プロパティに`true`を指定することで、開くためのボタンをつけることができます。
 * ボタンがない場合(例: react leafletの図形など)には、必ず親要素でコールバック関数が必要となります。
 *
 * `PopupKind`プロパティに種類を指定することで子要素の中身を指定することもできます。子要素を自由に取りたい場合は`default`を使用します。
 * (現在`PopupKind`に指定できるのは`default`のみです。)
 *
 **/

export function ProgramPopup(properties: PopupProperties): ReactNode {
  const popheight = properties.popheight ?? window.innerHeight - 144
  const popwidth = properties.popwidth ?? widthAdjust(window.innerWidth - 24)
  const screenSize = {
    '--popwidth': `${popwidth}px`,
    '--popheight': `${popheight}px`,
  }
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      { properties.hasOpenButton
        && (
          <Button onPress={() => setOpen(true)}>
            <p>ポップアップを開く</p>
          </Button>
        )}
      { properties.buttonChildren
        && (
          <div>
            {properties.buttonChildren}
          </div>
        )}
      <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={setOpen} className={styles.backdrop}>
        <Modal>
          <Dialog>
            <div className={styles.main} style={screenSize as React.CSSProperties}>
              <Button onPress={() => setOpen(false)}>
                <p>✕</p>
              </Button>
              {properties.children}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

function widthAdjust(width: number) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}
