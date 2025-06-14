import styles from "./page.module.css";
import TitleBarWithBack from "@/app/compoent/title_bar";
import Link from "next/link";

export const metadata = {
  title: "蒼煌祭17th非公式ページ｜食販",
  description: "蒼煌祭17thの食販についての情報の非公式のページです。",
};

export default function FoodSales() {
  return (
    <div>
      <TitleBarWithBack backpage="/dining" pagename="食品販売" />
      {/** こういう場合Linkとaどっちのほうがいいんだろ */}
      {/** リンクが青くならない！なんでそうした！ */}
      <p>
        <Link href="#how-to-use-foodSales">食販の使い方</Link>
        も併せてお読みください
      </p>
      <div style={{ paddingBottom: "50rem" }}>
        <h1>食販団体一覧</h1>
        {/** 食販に限った企画で要求される機能が似ているのでprogram/slug/page.jsxの機能を流用しようかな？ */}
        {/** スマホ想定の文字サイズ */}
        <div id="foodSaleMenus">
          {/** 例。図形どうしよう */}
          <div className={styles.foodSalesMenuCard}>
            {/** 一カード？の塊 */}
            <table className={styles.foodSalesMenuBox}>
              <tr>
                <th scope="row" colSpan={2}>
                  <p>ここには食販企画名が入るよ</p>
                </th>
              </tr>
              <tr>
                <th scope="row" className={styles.foodSalesMenuName}>
                  <p>食べ物名1</p>
                </th>
                <td className={styles.foodSalesMenuName2Price}>
                  <p>―</p>
                </td>
                <td className={styles.foodSalesMenuPrice}>
                  <p>100円</p>
                </td>
              </tr>
            </table>
            <div className={styles.line}></div>
            <details className={styles.ingredients}>
              <summary>アレルゲン・原材料情報</summary>
              <div className={styles.ingredientsTable}>
                <table>
                  <tr>
                    <th>
                      <p>食べ物名1</p>
                    </th>
                  </tr>
                  <tr>
                    <table
                      style={{ marginLeft: "0.5em" }}
                      className={styles.ingredient}
                    >
                      <tr>
                        <th>
                          <p>特定原材料27品目:</p>
                        </th>
                        <td>
                          <p>卵、りんご</p>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <p>原材料名: </p>
                        </th>
                        <td>
                          <p>卵、米、りんご</p>
                        </td>
                      </tr>
                    </table>
                  </tr>
                </table>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div id="how-to-use-foodSales">
        <h1>食販の使い方</h1>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vRSvoPrrU09BtDllWGcO3DX-EMw352OwDCt9hkw02RBTGMx-iumWjVnqMANDBV99leJqEyKKtKIeyIi/pubembed?start=false&loop=false&delayms=5000"
          border={"none"}
          width={320}
          height={190}
          allowFullScreen={true}
          mozallowfullscreen={"true"}
          webkitallowfullscreen={"true"}
        ></iframe>
      </div>
    </div>
  );
}
