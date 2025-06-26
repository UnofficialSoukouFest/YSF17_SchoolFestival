'use client'

import styles from './food-sales-allergies-settings.module.css'
import { useState } from 'react'
import { FoodSalesAllergiesFilter } from './food-sales-allergies-filter.jsx'
import { ListBox, ListBoxItem, ListBoxSection, Header, Collection } from 'react-aria-components'
// import type {ListBoxItemProps, SelectProps, ValidationResult} from 'react-aria-components'

export function FoodSalesAllergiesSettings() {
  const [selected, setSelected] = useState(new Set([0]))

  const specificSubstanceList = [
    { id: 0, name: '選択しない' },
    { id: 1, name: 'えび' },
    { id: 2, name: 'かに' },
    { id: 3, name: 'くるみ' },
    { id: 4, name: '小麦' },
    { id: 5, name: 'そば' },
    { id: 6, name: '卵' },
    { id: 7, name: '乳' },
    { id: 8, name: '落花生' },
    { id: 9, name: 'アーモンド' },
    { id: 10, name: 'あわび' },
    { id: 11, name: 'いか' },
    { id: 12, name: 'いくら' },
    { id: 13, name: 'オレンジ' },
    { id: 14, name: 'カシューナッツ' },
    { id: 15, name: 'キウイフルーツ' },
    { id: 16, name: '牛肉' },
    { id: 17, name: 'ごま' },
    { id: 18, name: 'さけ' },
    { id: 19, name: 'さば' },
    { id: 20, name: '大豆' },
    { id: 21, name: '鶏肉' },
    { id: 22, name: 'バナナ' },
    { id: 23, name: '豚肉' },
    { id: 24, name: 'マカデミアナッツ' },
    { id: 25, name: 'もも' },
    { id: 26, name: 'やまいも' },
    { id: 27, name: 'りんご' },
    { id: 28, name: 'ゼラチン' },
  ]

  const specificSubstanceTable = [
    { name: 'アレルゲンを選択', children: [
    ] },
    { name: '特定原材料8品目', children: [
    ] },
    { name: '特定原材料+20品目', children: [
    ] },
  ]
  for (let specificSubstance of specificSubstanceTable) {
    if (specificSubstance.name == 'アレルゲンを選択') {
      specificSubstance.children.push({ id: 0, name: `${specificSubstanceList.find(item => item.id == 0).name}` })
    }
    else if (specificSubstance.name == '特定原材料8品目') {
      for (let index = 1; index < 9; index++) {
        specificSubstance.children.push({ id: index, name: `${specificSubstanceList.find(item => item.id == index).name}` })
      }
    }
    else if (specificSubstance.name == '特定原材料+20品目') {
      for (let index = 9; index < 29; index++) {
        specificSubstance.children.push({ id: index, name: `${specificSubstanceList.find(item => item.id == index).name}` })
      }
    }
  }

  if ([...selected].length > 1 && [...selected][[...selected].length - 1] == 0)// 複数選択されていて、かつ、「選択しない」が選択されたとき、それ以外の選択を外す
    setSelected(new Set([0]))
  else if ([...selected].length === 0)// 何も選択されていなかったら「選択しない」を選択する
    setSelected(new Set([0]))
  if ([...selected].length > 1 && [...selected][0] == 0)// 「選択しない」以外が選択されたら「選択しない」から選択を外す
    setSelected(new Set([...selected].filter(item => item != 0)))

  return (
    <div>
      {/** アレルギー選択部分 */}
      <div id="AllergiesSlection">
        <details className={styles.allergiesSelectingTab}>
          <summary>アレルギーでフィルター：</summary>
          <p>以下で選択されたアレルゲンが使われていないメニューを表示します(複数選択可)。</p>
          <ListBox
            aria-label="アレルゲン"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            className={styles.listBox}
          >
            {specificSubstanceTable.map(item => (
              <ListBoxSection id={item.name} className={styles.reactAriaListBoxSection} key={item.name}>
                <Header className={styles.reactAriaHeader}>{item.name}</Header>
                <Collection className={styles.itemCollection}>
                  {item.children.map(itemc => <ListBoxItem className={styles.items} id={itemc.id} key={itemc.name}>{itemc.name}</ListBoxItem>)}
                </Collection>
              </ListBoxSection>
            ),
            )}
          </ListBox>
        </details>
        {/** 「選択しない」ならば表示しない */}
        {[...selected][0] == 0
          ? <></>
          : (
              <h3>
                {[...selected].sort((a, b) => a - b).map(item => specificSubstanceList.find(itemlist => itemlist.id == item).name).join('、')}
                を含まない：
              </h3>
            )}
      </div>

      <FoodSalesAllergiesFilter allergies={[...selected][0] == 0 ? [] : [...selected].sort((a, b) => a - b).map(item => specificSubstanceList.find(itemlist => itemlist.id == item).name)} />
    </div>
  )
}
