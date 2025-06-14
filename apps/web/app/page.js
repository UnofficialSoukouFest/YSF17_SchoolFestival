import styles from "./page.module.css";
import { Callout } from "@/app/compoent/callout.jsx";
import { Countdown } from "@/app/compoent/countdown.jsx";
import { solveBasePath } from "@/app/lib/index.js";
import Image from "next/image";

export const metadata = {
  title: "蒼煌祭17th非公式ページ｜トップ",
  description: "蒼煌祭17thの非公式のページのトップです。",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <div id="top_visual">
        {/* 仮作成のトップです */}
        <Image
          src={solveBasePath("/ysf_top.png")}
          alt="横浜サイエンスフロンティア高校の画像です"
          width={780}
          height={450}
        />
        <h1>横浜サイエンスフロンティア高校文化祭「蒼煌祭」</h1>
      </div>

      <div className="contentBox">
        <h2>蒼煌祭まで...</h2>
        <Countdown />
      </div>

      <div className="contentBox">
        <Callout kind="warn">
          <p>
            このサイトは非公式の有志による情報まとめサイトです。
            正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
            確実な情報はこちら(公式ホームページ)からご覧ください。
          </p>
        </Callout>
      </div>

      <div id="home_index" className="contentBox">
        <h2>目次</h2>
        <ul>
          <li>
            <a href="#home_aboutFest">蒼煌祭について</a>
          </li>
          <li>
            <a href="#home_notice">来場に際しての注意</a>
          </li>
          <li>
            <a href="#home_access">アクセス</a>
          </li>
          <li>
            <a href="#home_source">このサイトの情報源</a>
          </li>
        </ul>
      </div>

      <div id="home_aboutFest" className="contentBox">
        <h2>蒼煌祭について</h2>
        <p>蒼煌祭いろいろ書きこみ書きこみ</p>
      </div>

      <div id="home_notice" className="contentBox">
        <h2>来場に際しての注意</h2>
        <div>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vTmQeHPzEP7-2RDqIVzUkOWsNH-c_viIoOE3gNlkJxcR_7I-ruZBBRb4qJEOJr3itFXMYjF-DLjRTB4/pubembed?start=false&loop=true&delayms=5000"
            border="none"
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            className="slide"
          ></iframe>
        </div>
      </div>

      <div id="home_access" className="contentBox">
        <h2>アクセス</h2>
        <p>アクセスは...</p>
        <div className="slide">
          <iframe
            id="YSFmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1365.7115110267134!2d139.67723936730562!3d35.49864772128194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185de48a090f23%3A0xb7f74d21bfdfd5f4!2z5qiq5rWc5biC56uL5qiq5rWc44K144Kk44Ko44Oz44K544OV44Ot44Oz44OG44Kj44Ki6auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1749479456850!5m2!1sja!2sjp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <h3>時刻表</h3>
          <div id="container_trainTimetable">
            <div>
              <p>JR鶴見線</p>
              <a className="button_trainTimetable touchable">鶴見小野駅</a>
            </div>
            <div>
              <p>京急</p>
              <a className="button_trainTimetable touchable">花月総持寺駅</a>
            </div>
          </div>
        </div>
      </div>

      <div id="home_source" className="contentBox">
        <h2>このサイトの情報源</h2>
        <p>情報源</p>
      </div>
    </div>
  );
}
