import styles from "./page.module.css";
import { Callout } from "@/app/compoent/callout.jsx";
import Image from "next/image";

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
      <div>
        カウントダウン
      </div>
      <Callout kind={"warn"}>
        <p>
          このサイトは非公式の有志による情報まとめサイトです。
          正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
          確実な情報はこちら(公式ホームページ)からご覧ください。
        </p>
      </Callout>
      <div>
        <h2>目次</h2>
      </div>
      <div>
        <h2>名前の由来</h2>
        <div>
          <h3>「蒼煌祭」</h3>
          <p>由来は...</p>
        </div>
        <div>
          <h3>スローガン「澄」</h3>
          <p>由来は...</p>
        </div>
      </div>
      <div>
        <h2>来場に際しての注意</h2>
        <div>
          <iframe 
            src={"https://docs.google.com/presentation/d/e/2PACX-1vTmQeHPzEP7-2RDqIVzUkOWsNH-c_viIoOE3gNlkJxcR_7I-ruZBBRb4qJEOJr3itFXMYjF-DLjRTB4/pubembed?start=false&loop=true&delayms=5000"}
            border={"none"}
            width={320}
            height={190}
            allowFullScreen={true}
            mozallowfullscreen={"true"}
            webkitallowfullscreen={"true"}>
          </iframe>
        </div>
      </div>
      <div>
        <h2>アクセス</h2>
        <p>アクセスは...</p>
        <div>
          Googleマップ
        </div>
        <div>
          <h3>時刻表</h3>
          <a>鶴見小野駅</a>
          <a>花月総持寺駅</a>
        </div>
      </div>
      <div>
        <h2>このサイトの情報源</h2>
        <p>情報源</p>
      </div>
    </div>
  );
}
