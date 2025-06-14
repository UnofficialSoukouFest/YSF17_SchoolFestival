/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from "./title_bar.module.css";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";

/**
 * 上部の戻るボタン＋ページ名
 * @param {Object} props
 * @param {string} props.backpage - 戻る先のパス
 * @param {string} props.pagename - ページ名
 * @param {string} props.themeColor - テーマカラー
 * @returns {JSX.Element}
 */
export default function TitleBarWithBack({
  backpage = "/",
  pagename = "無題",
  themeColor = undefined,
}) {
  return (
    <header className={styles["title-bar"]}>
      <BackButton to={backpage} arrowColor={themeColor} />
      <div
        className={styles["page-title"]}
        style={{
          color: themeColor,
          fontSize: Math.min(Math.max(24, 320 / pagename.length), 32),
        }}
      >
        {pagename}
      </div>
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
function BackButton({ to, arrowColor }) {
  return (
    <Link href={to} className={styles["back-button"]}>
      <IoChevronBackOutline size={44} color={arrowColor} />
    </Link>
  );
}
