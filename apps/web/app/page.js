import './home.css'
import styles from './page.module.css'
import Spacer from './compoent/spacer/spacer'
import TopVisualUnopen from './home/topVisual/topvisual-unopen'
import TopVisualOpened from './home/topVisual/topvisual-opened'
import TopVisualClosed from './home/topVisual/topvisual-closed'
import WarnCallout from '@/app/compoent/warn-callout.jsx'
import TrainInfoBox from '@/app/home/trainInformation/train-information'
import Source from './home/source/source'
import HomeArticleDisplay from '@/app/home/articlesBox/home-article-display.jsx'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜トップ',
  description: '蒼煌祭17thの非公式のページのトップです。',
}

export default function Home() {
  const now = new Date()
  const openingTime = new Date('2025-09-06T10:00+09:00')
  const closingTime = new Date('2025-09-07T15:00+09:00')
  let state = now < openingTime ? 'unopen' : (now < closingTime ? 'opened' : 'closed')
  const top_visual = {
    unopen: <TopVisualUnopen />,
    opened: <TopVisualOpened />,
    closed: <TopVisualClosed />,
  }[state]

  return (
    <div className={styles.page}>
      <div className={styles.topVisualContainer}>
        {top_visual}
      </div>

      <Spacer type="L" />

      <div>
        <WarnCallout>
          <p>
            このサイトは非公式の、生徒有志による情報まとめサイトです。
            正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
            確実な情報は
            <a href="#home_source">
              こちら(情報源の一覧)
            </a>
            からアクセスできます。
          </p>
        </WarnCallout>
      </div>

      <Spacer type="L" />

      <div>
        <h2 className={styles.mainHeading}>
          Features
          <span className={styles.subHeading}>特集</span>
        </h2>
        <p>蒼煌祭をもっと知りたい方、楽しみたい方はぜひご覧ください！</p>
        <HomeArticleDisplay />
      </div>

      <Spacer type="XL" />

      <div id="home_aboutFest">
        <h2 className={styles.mainHeading}>
          About
          <span className={styles.subHeading}>蒼煌祭について</span>
        </h2>
        <p>蒼煌祭は、横浜サイエンスフロンティア高等学校・附属中学校の文化祭です。今年度はスローガン「澄」のもと、9月6日と7日に開催されます！</p>
      </div>

      <Spacer type="XL" />

      <div id="home_notice">
        <h2 className={styles.mainHeading}>
          Notice
          <span className={styles.subHeading}>来場時の注意</span>
        </h2>
        <div>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vTmQeHPzEP7-2RDqIVzUkOWsNH-c_viIoOE3gNlkJxcR_7I-ruZBBRb4qJEOJr3itFXMYjF-DLjRTB4/pubembed?start=false&loop=true&delayms=5000"
            border="none"
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            className={styles.slide}
          >
          </iframe>
        </div>
      </div>

      <Spacer type="XL" />

      <div id="home_access">
        <h2 className={styles.mainHeading}>
          Access
          <span className={styles.subHeading}>アクセス</span>
        </h2>
        <div>
          <iframe
            id="YSFmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1365.7115110267134!2d139.67723936730562!3d35.49864772128194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185de48a090f23%3A0xb7f74d21bfdfd5f4!2z5qiq5rWc5biC56uL5qiq5rWc44K144Kk44Ko44Oz44K544OV44Ot44Oz44OG44Kj44Ki6auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1749479456850!5m2!1sja!2sjp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.slide}
          >
          </iframe>
        </div>

        <Spacer type="M" />

        <div>
          <h3>近くの駅</h3>
          <Spacer type="S" />
          <TrainInfoBox index={0} />
          <TrainInfoBox index={1} />
        </div>
      </div>

      <Spacer type="XL" />

      <div id="home_source">
        <h2 className={styles.mainHeading}>
          Source
          <span className={styles.subHeading}>情報源の一覧</span>
        </h2>
        <p>このサイトを作成するにあたって使用した情報源の一覧です。より信頼性の高い情報をお求めの方は、以下を参照すると良いでしょう。</p>

        <Spacer type="M" />

        <Source />
      </div>

      <Spacer type="XL" />
    </div>
  )
}
