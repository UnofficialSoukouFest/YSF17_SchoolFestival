import styles from './page.module.css'
import { ImageButton } from '@/app/component/image-button'
import { Titlebar } from '@/app/component/title-bar-supplier.jsx'

export const metadata = {
  title: '食事 - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの食事についての非公式のページです。',
}

export default function Dining() {
  return (
    <div>
      <Titlebar pagename="食事" />
      <p>食販やカフェテリアの情報です</p>
      {/** 別に絶対写真を使いたいわけではない */}
      {/** 押したらとかホバーで色や写真のズームを変えたい */}
      <div className={styles.buttonGrid}>
        <ImageButton name="食販" pageUrl="/dining/foodSales" imageSrc="/dining.foodSales.webp" />
        <ImageButton name="カフェテリア" pageUrl="/dining/cafeteria" imageSrc="/dining.cafeteria.webp" />
      </div>
    </div>
  )
}
