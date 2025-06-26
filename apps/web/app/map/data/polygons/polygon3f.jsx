import { Polygon, Popup } from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'

export default function Polygon3f() {
  /* jsのmap使ったらeslintくんに怒られたので解決策見つかるまで保留
  const ratioWid = 500 / 1093 SVGと地図の横幅の比率
  const ratioHei = 540 / 1279 SVGと地図の縦幅の比率 */
  const position1 = [[218.3, 165.3], [218.3, 203.3], [249.5, 203.3], [249.5, 165.3]]
  const polygonColor = { color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }

  //    PopupのPR画像とLink(id)、企画名はjsonから取り出せるようにしたい。ポリゴンの位置とかもidで取り出せるようにしたいんだけど......
  return (
    <Polygon pathOptions={polygonColor} positions={position1}>
      <Popup>
        <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
        <Link href="../program/c8f366dc-65f9-43b6-99b0-29d1f43c7c3b">
          根城はサイコロを振らないスペシャルエディション
        </Link>
      </Popup>
    </Polygon>
  )
}
