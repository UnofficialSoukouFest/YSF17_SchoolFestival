import cafeteria from '../../cafeteria.mock.json'
import styles from './page.module.css'
import { TitleBarWithBack } from '@/app/component/title-bar.jsx'
import WarnCallout from '@/app/component/warn-callout.jsx'
import InfoCallout from '@/app/component/info-callout.jsx'
import { MenuExporter } from './cafeteriamenu-exporter'
import { solveBasePath } from '@/app/lib/index.js'

export const metadata = {
  title: 'カフェテリア - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thのカフェテリアについての情報の非公式のページです。',
}

export default function Cafeteria() {
  return (
    <div>
      <TitleBarWithBack backpage={solveBasePath('/dining')} pagename="カフェテリア" />
      <div>
        <h1>メニュー</h1>
        {/** ysf at wikiの情報を使用、値上げ後の値段が不明。 */}
        {/** メニューすら覚えていないので暫定 */}
        {/** CSSいい感じにお願いします */}
        <div className={styles.priceTable} style={{ maxWidth: '100vw' }}>
          <table className={styles.priceTable} style={{ maxWidth: '100vw' }}>

            <MenuExporter />

          </table>
        </div>
      </div>
      <div>
        <WarnCallout>
          {/** <h1 style={{ paddingTop: '1rem' }}>注意事項</h1> */}
          <ul className={styles.bulletedList}>
            {/** 箇条書きのルールも必要？ */}

            {cafeteria.warn.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </WarnCallout>
        <InfoCallout>
          <ul className={styles.bulletedList}>
            {/** 箇条書きのルールも必要？ */}

            {cafeteria.notes.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </InfoCallout>
      </div>
    </div>
  )
}
