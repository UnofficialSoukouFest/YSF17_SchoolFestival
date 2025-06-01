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
      <Callout kind={"warn"}>
        <p>
          このサイトは非公式の有志による情報まとめサイトです。
          正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
          確実な情報はこちら(公式ホームページ)からご覧ください。
        </p>
      </Callout>
      <div>
        <h2>「蒼煌祭」の由来</h2>
        <p>由来は...</p>
      </div>
      <div>
        <h2>来場者注意点</h2>
        <div>注意点のスライド</div>
      </div>
      <div>
        <h2>アクセス</h2>
        <p>アクセスは...</p>
      </div>
    </div>
  );
}
