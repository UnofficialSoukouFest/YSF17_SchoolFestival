import { FoodSalesElement } from './food-sales.jsx'
import { TitleBarWithBack } from '@/app/component/title-bar.jsx'
import Link from 'next/link'
import { solveBasePath } from '@/app/lib/index.js'

export const metadata = {
  title: '食販 - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの食販についての情報の非公式のページです。',
}

export default function FoodSales() {
  return (
    <div>
      <TitleBarWithBack backpage={solveBasePath('/dining')} pagename="食品販売" />
      <p>
        <Link href="#how-to-use-foodSales">食販の使い方</Link>
        も併せてお読みください
      </p>
      <div style={{ paddingBottom: '0rem' }}>
        <h1>食販団体一覧</h1>
        <p>
          <Link href="/dining/foodSales/allergyTable" target="_blank" rel="noopener noreferrer">アレルギー表はこちら(新規タブで開きます)</Link>
        </p>
        <FoodSalesElement />
      </div>

      <div id="how-to-use-foodSales">
        <h1>食販の使い方</h1>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vRSvoPrrU09BtDllWGcO3DX-EMw352OwDCt9hkw02RBTGMx-iumWjVnqMANDBV99leJqEyKKtKIeyIi/pubembed?start=false&loop=false&delayms=5000"
          border="none"
          width={320}
          height={190}
          allowFullScreen={true}
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        >
        </iframe>
      </div>
    </div>
  )
}
