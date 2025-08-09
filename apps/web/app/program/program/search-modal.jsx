'use client'

import { useAtom } from 'jotai'
import {
  Select,
  SelectPopover,
  SelectItems,
  SelectItem,
  PopupProvider,
  Popup,
  usePopup,
  Button,
  PopupCloseButton, SelectButton,
} from '@latimeria/ganoine'
import styles from './search-modal.module.css'
import { searchQueryAtom } from '@/app/program/program/atoms'

export function SearchModal() {
  return (
    <PopupProvider>
      <PopupToggleButton />
      <Popup>
        <div>
          <h2 className={styles.queryProperty}>種類</h2>
          <KindSelectMenu />
          <h2 className={styles.queryProperty}>場所</h2>
          <PlaceSelectMenu />
          <PopupCloseButton />
        </div>
      </Popup>
    </PopupProvider>
  )
}

function PopupToggleButton() {
  const { togglePopup } = usePopup()
  return (
    <Button kind="primary" onPress={togglePopup}>
      検索条件
    </Button>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu() {
  const [kind, setKind] = useAtom(searchQueryAtom)
  return (
    <Select
      onSelectionChange={(selected) => {
        setKind((previous) => {
          const parameters = new URLSearchParams([...previous.searchParams])
          parameters.set('kind', selected)
          return {
            ...previous,
            searchParams: parameters,
          }
        })
      }}
      selectedKey={kind.searchParams?.get('kind') ?? ''}
      placeholder="選択しない"
      className={styles.queryProperty}
    >
      <SelectButton />
      <SelectPopover>
        <SelectItems mode="single">
          <SelectItem value="選択しない" label="選択しない" />
          <SelectItem value="体験" label="体験" />
          <SelectItem value="展示" label="展示" />
          <SelectItem value="上演" label="上演" />
          <SelectItem value="販売" label="販売" />
          <SelectItem value="配布" label="配布" />
          <SelectItem value="募金" label="募金" />
        </SelectItems>
      </SelectPopover>
    </Select>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu() {
  const [place, setPlace] = useAtom(searchQueryAtom)
  return (
    <Select
      onSelectionChange={(selected) => {
        setPlace((previous) => {
          const parameters = new URLSearchParams([...previous.searchParams])
          parameters.set('place', selected)
          return {
            ...previous,
            searchParams: parameters,
          }
        })
      }}
      placeholder="選択しない"
      selectedKey={place.searchParams?.get('place') ?? ''}
      className={styles.queryProperty}
    >
      <SelectButton />
      <SelectPopover>
        <SelectItems mode="single">
          <SelectItem value="選択しない" />
          <SelectItem value="1F" />
          <SelectItem value="2F" />
          <SelectItem value="3F" />
          <SelectItem value="4F" />
          <SelectItem value="5F" />
          <SelectItem value="屋上" />
          <SelectItem value="体育館" />
          <SelectItem value="交流センター" />
        </SelectItems>
      </SelectPopover>
    </Select>
  )
}
