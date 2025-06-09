import styles from "./page.module.css";
import home_styles from "./home.css";
import { Callout } from "@/app/compoent/callout.jsx";
import Image from "next/image";

export const metadata = {
  title: "蒼煌祭17th非公式ページ｜トップ",
  description: "蒼煌祭17thの非公式のページのトップです。",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        {/* 仮作成のトップです */}
        <Image
          src="/ysf_top.png"
          alt="横浜サイエンスフロンティア高校の画像です"
          width={780}
          height={450}
        />
        <h1>横浜サイエンスフロンティア高校文化祭「蒼煌祭」</h1>
      </div>

      <div className="contentBox">
        カウントダウン
      </div>
      
      <div className="contentBox">
        <Callout kind={"warn"}>
          <p>
            このサイトは非公式の有志による情報まとめサイトです。
            正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
            確実な情報はこちら(公式ホームページ)からご覧ください。
          </p>
        </Callout>
      </div>

      <div id="home_index" className={"contentBox"}>
        <h2>目次</h2>
        <ul>
          <li><a href="#home_aboutFest">蒼煌祭について</a></li>
          <li><a href="#home_notice">来場に際しての注意</a></li>
          <li><a href="#home_access">アクセス</a></li>
          <li><a href="#home_source">このサイトの情報源</a></li>
        </ul>
      </div>

      <div id="home_aboutFest" className={"contentBox"}>
        <h2>蒼煌祭について</h2>
        <p>
          蒼煌祭いろいろ書きこみ書きこみ
        </p>
      </div>

      <div id="home_notice" className={"contentBox"}>
        <h2>来場に際しての注意</h2>
        <div>
          <iframe
            src={
              "https://docs.google.com/presentation/d/e/2PACX-1vTmQeHPzEP7-2RDqIVzUkOWsNH-c_viIoOE3gNlkJxcR_7I-ruZBBRb4qJEOJr3itFXMYjF-DLjRTB4/pubembed?start=false&loop=true&delayms=5000"
            }
            border={"none"}
            allowFullScreen={true}
            mozallowfullscreen={"true"}
            webkitallowfullscreen={"true"}
            className="slide"
          ></iframe>
        </div>
      </div>

      <div id="home_access" className={"contentBox"}>
        <h2>アクセス</h2>
        <p>アクセスは...</p>
        <div className="slide">
          Googleマップ
        </div>
        <div>
          <h3>時刻表</h3>
          <div id="container_trainTimetable">
            <a className="button_trainTimetable">鶴見小野駅</a>
            <a className="button_trainTimetable">花月総持寺駅</a>
          </div>
        </div>
      </div>

      <div id="home_source" className={"contentBox"}>
        <h2>このサイトの情報源</h2>
        <p>情報源</p>
      </div>
    </div>
  );
}
