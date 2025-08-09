import { useSetAtom } from 'jotai'
import { searchQueryAtom } from '@/app/program/program/atoms.js'
import { Button } from 'react-aria-components'
import styles from '@/app/program/programs.module.css'
import { MdOutlineCancel } from 'react-icons/md'

export default function SearchQueryClearButton() {
  const resetSearchQuery = useSetAtom(searchQueryAtom)
  return (
    <Button
      onPress={() => {
        resetSearchQuery(previous => ({ ...previous, searchParams: new URLSearchParams() }))
      }}
      className={styles.programSelectResetButton}
    >
      <MdOutlineCancel />
      条件をクリアする
    </Button>
  )
}
