'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../page.module.css'
import Link from 'next/link'

/* eslint-disable-next-line unicorn/no-object-as-default-parameter */
export function FoodSalesCardExporter(cardData = {
  teamId: 'xxxx',
  team: 'unknown_team',
  name: 'unknown_name',
  menus: [
    {
      name: 'unknown_food',
      price: 500,
      specificIngredients: ['卵', 'りんご'],
      ingredients: ['卵', '米', 'りんご'],
    },
  ],
}) {
  /* eslint-disable-next-line react/jsx-key */
  const NameAndPrices = cardData.cardData.menus?.map(item => <NameAndPrice menu={item} />)// メニューを生成してそれを配列化
  /* eslint-disable-next-line react/jsx-key */
  const Ingredients = cardData.cardData.menus?.map(item => <Ingredient menu={item} />)// 原材料表示を生成してそれを配列化

  return (
    <div className={styles.foodSalesMenuCard}>
      <table className={styles.foodSalesMenuBox}>
        <thread>
          <tr>
            <th scope="row" colSpan={3}>
              <p>
                <Link href={`/program/${cardData.cardData.teamId}`}>{cardData.cardData.team}</Link>
                :&nbsp;&nbsp;
                {cardData.cardData.name}
              </p>
            </th>
          </tr>
        </thread>

        {NameAndPrices}

      </table>
      <div className={styles.line} />
      <details className={styles.ingredients}>
        <summary className={styles.ingredientsSummary}>アレルギー・原材料情報</summary>
        <div className={styles.ingredientsTable}>
          {Ingredients}
        </div>
      </details>
    </div>
  )
}

// 商品名とその価格
// スマホの画面の回転のような再読み込みせずに画面幅が変わるようなことがあっても再描画されないので、レイアウトが崩れる可能性はある
export function NameAndPrice(menu) {
  const bodyReference = useRef(null)

  const [defaultDisplay, setDefaultDisplay] = useState('table-cell')

  useEffect(() => {
    const emSize = globalThis.getComputedStyle(document.documentElement).fontSize
    if (bodyReference.current.offsetHeight > 2.5 * Number.parseInt(emSize)) {
      // いらないやつをuseStateでdisplay: noneにしたい
      setDefaultDisplay('none')
    }
  }, [])

  return (
    <tbody>
      <tr ref={bodyReference}>
        <th scope="row" className={styles.foodSalesMenuName} colSpan={defaultDisplay == 'table-cell' ? 1 : 3}>
          <p className={styles.foodSalesMenuBigChars}>{menu.menu.name}</p>
        </th>
        <td className={styles.foodSalesMenuName2Price} style={{ display: `${defaultDisplay}` }}>
          <p className={styles.foodSalesMenuBigChars}>―</p>
        </td>
        <td className={styles.foodSalesMenuPrice} style={{ display: `${defaultDisplay}` }}>
          <p className={styles.foodSalesMenuBigChars}>
            {menu.menu.price}
            円
          </p>
        </td>
      </tr>
      <tr style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-row'}` }}>
        <th className={styles.foodSalesSpaceFor2Rows}>
          {/** 空けとく空間 */}
        </th>
        <td className={styles.foodSalesMenuName2Price} style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-cell'}` }}>
          <p className={styles.foodSalesMenuBigChars}>―</p>
        </td>
        <td className={styles.foodSalesMenuPrice} style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-cell'}` }}>
          <p className={styles.foodSalesMenuBigChars}>
            {menu.menu.price}
            円
          </p>
        </td>
      </tr>
    </tbody>
  )
}

// 商品名とその原材料
export function Ingredient(menu) {
  return (
    /** <table className={styles.foodIngredient}>
      <tbody>
      <tr>
        <th>{ menu.menu.name }</th>
      </tr>
      <tr>
        <table
          style={{ marginLeft: "0.5em" }}
          className={styles.ingredient}
        >
          <tr>
            <th className={styles.ingredientTitle}>特定原材料27品目:</th>
            <td>{ menu.menu.specificIngredients.join("、") }</td>
          </tr>
          <tr>
            <th className={styles.ingredientTitle}>原材料名:</th>
            <td className={styles.ingredientTd}><p className={styles.ingredientP}>{ menu.menu.ingredients.join("、ああああああああああ") }</p></td>
          </tr>
        </table>
      </tr>
      </tbody>
    </table> */
    <div className={`${styles.foodIngredient} ${styles.divtable}`}>
      <p className={styles.ingredientFoodName}>{menu.menu.name}</p>
      <div className={`${styles.ingredientTable} ${styles.divtable}`} style={{ marginLeft: '0.5em' }}>

        <div className={styles.ingredientTitle}>特定原材料27品目:</div>
        <div>{menu.menu.specificIngredients.join('、')}</div>

        <div className={styles.ingredientTitle}>原材料名:</div>
        <div className={styles.ingredientTd}><p className={styles.ingredientP}>{menu.menu.ingredients.join('、')}</p></div>

      </div>
    </div>
  )
}

/**
 * {/** 例。図形どうしよう  一カード？の塊 }
    <div className={styles.foodSalesMenuCard}>
      <table className={styles.foodSalesMenuBox}>
        <tr>
          <th scope="row" colSpan={3}>
            <p>ここには食販企画名が入るよ</p>
          </th>
        </tr>
        <tr>
          <th scope="row" className={styles.foodSalesMenuName}>
            <p className={styles.foodSalesMenuBigChars}>食べ物名1</p>
          </th>
          <td className={styles.foodSalesMenuName2Price}>
            <p className={styles.foodSalesMenuBigChars}>―</p>
          </td>
          <td className={styles.foodSalesMenuPrice}>
            <p className={styles.foodSalesMenuBigChars}>100円</p>
          </td>
        </tr>
      </table>
      <div className={styles.line}/>
      <details className={styles.ingredients}>
        <summary className={styles.ingredientsSummary}>アレルギー・原材料情報</summary>
        <div className={styles.ingredientsTable}>
          <table>
            <tr>
              <th>食べ物名1</th>
            </tr>
            <tr>
              <table
                style={{ marginLeft: "0.5em" }}
                className={styles.ingredient}
              >
                <tr>
                  <th>特定原材料27品目:</th>
                  <td>卵、りんご</td>
                </tr>
                <tr>
                  <th>原材料名:</th>
                  <td>卵、米、りんご</td>
                </tr>
              </table>
            </tr>
          </table>
        </div>
      </details>
    </div>
 */
