import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import styles from "./title_bar.module.css"

/**
 * 上部の戻るボタン＋ページ名
 * @param {Object} props
 * @param {string} props.backpage - 戻る先のパス
 * @param {string} props.pagename - ページ名
 * @param {string} props.themeColor - テーマカラー
 * @returns {JSX.Element}
*/
export default function TitleBarWithBack({backpage = "/", pagename = "無題", themeColor = undefined}) {
  return (
    <header className={styles["title-bar"]}>
      <BackButton to={backpage} arrowColor={themeColor}/>
      <h2 className={styles["page-title"]} style={{ color: themeColor }}>{pagename}</h2>
    </header>
  );
}


/**
 * 左上の矢印戻るボタン
 * @param {Object} props
 * @param {string} props.to - 戻る先のパス
 * @param {string} props.arrowColor - 矢印の色
 * @returns {JSX.Element}
*/
function BackButton({to, arrowColor}) {
  return (
    <Link href={to} className={styles["back-button"]}>
      <IoChevronBackOutline size={36} color={arrowColor}/>
    </Link>
  );
}
