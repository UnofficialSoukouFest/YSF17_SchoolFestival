'use client'

import { useId } from 'react'
import { SearchInput, SearchField } from '@latimeria/ganoine'
import styles from './program-input.module.css'
import { useAtom } from 'jotai'
import { searchQueryAtom } from '@/app/program/program/atoms.js'

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProgramInput() {
  const [inputValue, setInputValue] = useAtom(searchQueryAtom)
  const programInputId = useId()

  return (
    <SearchField
      name="programSearch"
      onChange={(v) => {
        setInputValue((previous) => {
          const parameters = new URLSearchParams([...previous.searchParams])
          parameters.set('q', v)
          return {
            ...previous,
            searchParams: parameters,
          }
        })
      }}
      placeholder="企画名を入力"
      aria-label="企画名を入力して企画を検索します"
      value={inputValue.searchParams?.get('q') ?? ''}
      aria-describedby={programInputId}
      className={styles.programInput}
    >
      <SearchInput />
    </SearchField>
  )
}
