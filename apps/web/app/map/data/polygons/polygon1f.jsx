import { Polygon, Popup } from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'

export default function Polygon1f() {
  /* jsのmap使ったらeslintくんに怒られたので解決策見つかるまで保留
  const ratioWid = 500 / 1093 SVGと地図の横幅の比率
  const ratioHei = 540 / 1279 SVGと地図の縦幅の比率 */
  const position1 = [[103, 0], [103, 74], [371, 74], [371, 0]]
  const polygonColor = { color: 'black', fillColor: '#00000000' }

  //    PopupのPR画像とLink(id)、企画名はjsonから取り出せるようにしたい。ポリゴンの位置とかもidで取り出せるようにしたいんだけど......
  return (
    <Polygon pathOptions={polygonColor} positions={position1}>
      <Popup>
        <Image src="https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/map_pin.svg" alt="マップピンアイコン画像" width={200} height={100} />
        <Link href="../program/29fe6fea-c849-7ae3-03b5-528493e7a8bf">
          食販2-デフォ子
        </Link>
      </Popup>
    </Polygon>
  )
}
