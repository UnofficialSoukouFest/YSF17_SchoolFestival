'use client'

import ProgramInput from '@/app/compoent/program/program-input.jsx'
import ProgramView from '@/app/compoent/program/program-view.jsx'
import ProgramSample from '@/app/program.mock.json'
import styles from '@/app/program/programs.module.css'
import { parseProgramsData, Tags } from '@latimeria/core'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components'
import { MdOutlineCancel } from 'react-icons/md'

// TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
const programsAtom = atom(parseProgramsData(ProgramSample))
const tagsAtom = atomWithReset(new Tags([]))
const kindAtom = atomWithReset('選択しない')
const placeAtom = atomWithReset('選択しない')
const matchedProgramsAtom = atom((get) => {
  const programs = get(programsAtom)
  const tags = get(tagsAtom)
  const kind = get(kindAtom)
  const place = get(placeAtom)
  const kindAndTags = kind == '選択しない' ? tags : new Tags([...tags, kind])
  const placeAndKindAndTags = place == '選択しない' ? kindAndTags : new Tags([...kindAndTags, place])
  return placeAndKindAndTags.size > 0 ? programs.matchPrograms(placeAndKindAndTags, true) : programs
})

/**
 * @returns {JSX.Element}
 * @constructor
 */
export function ProgramsView() {
  const [tags, setTags] = useAtom(tagsAtom)
  const matchedPrograms = useAtomValue(matchedProgramsAtom)

  return (
    <div>
      <h2>企画一覧/検索</h2>
      <ProgramInput onchange={setTags} tags={tags} />
      <div className={styles.programSearchLine}>

        <div className={styles.programSearchLineItem}>
          <div className={styles.programSearchLinePItem}>
            <p>種類：</p>
          </div>
          <KindSelectMenu />
        </div>

        <div className={styles.programSearchLineItem}>
          <div className={styles.programSearchLinePItem}>
            <p>場所：</p>
          </div>
          <PlaceSelectMenu />
        </div>

        <SearchQueryClearButton />
      </div>
      <ProgramView programs={matchedPrograms} />
    </div>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu() {
  const [kind, setKind] = useAtom(kindAtom)// const setKind = useSetAtom(kindAtom)
  return (
    <Select
      onSelectionChange={selected => setKind(selected)}
      placeholder="選択しない"
      selectedKey={kind}
      defaultSelectedKey="選択しない"
    >
      <Button className={styles.programSelectPullDown}>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox className={styles.programSelectPullDownItems}>
          <ListBoxItem className={styles.programSelectPullDownItem} id="選択しない">選択しない</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="体験">体験</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="展示">展示</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="上演">上演</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="販売">販売</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="配布">配布</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="募金">募金</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu() {
  const [place, setPlace] = useAtom(placeAtom)// const setPlace = useSetAtom(placeAtom)
  return (
    <Select
      onSelectionChange={selected => setPlace(selected)}
      placeholder="選択しない"
      selectedKey={place}
      defaultSelectedKey="選択しない"
    >
      <Button className={styles.programSelectPullDown}>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox className={styles.programSelectPullDownItems}>
          <ListBoxItem className={styles.programSelectPullDownItem} id="選択しない">選択しない</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="1F">1F</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="2F">2F</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="3F">3F</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="4F">4F</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="5F">5F</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="屋上">屋上</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="体育館">体育館</ListBoxItem>
          <ListBoxItem className={styles.programSelectPullDownItem} id="交流センター">交流センター</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}

function SearchQueryClearButton() {
  const resetTags = useResetAtom(tagsAtom)
  const resetKind = useResetAtom(kindAtom)
  const resetPlace = useResetAtom(placeAtom)
  return (
    <Button
      onPress={() => {
        resetTags()
        resetKind()
        resetPlace()
      }}
      className={`${styles.programSelectResetButton} touchable smallButton`}
    >
      <div className={styles.programSearchResetButtonContent}>
        <MdOutlineCancel />
        <div className={styles.programSearchResetButtonContentDiv}>
          <p>条件をリセットする</p>
        </div>
      </div>
    </Button>
  )
}
