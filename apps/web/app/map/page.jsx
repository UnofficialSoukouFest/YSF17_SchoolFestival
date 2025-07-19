import LazyMap from '@/app/map/load-map'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜地図',
  description: '蒼煌祭17thの非公式の地図ページです。',
}

export default function Map() {
  return (
    <div>
      <h2>地図</h2>
      <p>地図内をクリックすると各イベントの詳細が表示されます。</p>
      <LazyMap />
    </div>
  )
}
