import { Polygon, Popup } from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'

export default function Polygon2f() {
  /* jsのmap使ったらeslintくんに怒られたので解決策見つかるまで保留
  const ratioWid = 500 / 1093 SVGと地図の横幅の比率
  const ratioHei = 540 / 1279 SVGと地図の縦幅の比率 */
  const position1 = [[210.7, 53], [210.7, 165.3], [249.6, 165.3], [249.6, 53]]
  const polygonColor = { color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }

  //    PopupのPR画像とLink(id)、企画名はjsonから取り出せるようにしたい。ポリゴンの位置とかもidで取り出せるようにしたいんだけど......
  return (
    <Polygon pathOptions={polygonColor} positions={position1}>
      <Popup>
        <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
        <Link href="../program/b886e882-6cfc-47e2-816a-88c392bd8d34">
          緑の羽根募金
        </Link>
      </Popup>
    </Polygon>
  )
}
