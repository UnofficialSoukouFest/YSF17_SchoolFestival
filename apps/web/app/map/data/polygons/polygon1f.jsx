import { LayerGroup, Polygon, Popup } from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'

export default function Polygon1f() {
  /* jsのmap使ったらeslintくんに怒られたので解決策見つかるまで保留
  const ratioWid = 500 / 1093 SVGと地図の横幅の比率
  const ratioHei = 540 / 1279 SVGと地図の縦幅の比率 */
  const position = [[[63.6, 34.5], [63.6, 167], [127.5, 167], [127.5, 34.5]], [[64, 205], [64, 319], [127.5, 319], [127.5, 205]]]
  const polygonColor = { color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }

  //    PopupのPR画像とLink(id)、企画名はjsonから取り出せるようにしたい。ポリゴンの位置とかもidで取り出せるようにしたいんだけど......
  return (
    <LayerGroup>
      <Polygon pathOptions={polygonColor} positions={position[0]}>
        <Popup>
          <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
          <Link href="../dining/cafeteria">
            カフェテリア
          </Link>
        </Popup>
      </Polygon>
      <Polygon pathOptions={polygonColor} positions={position[1]}>
        <Popup>
          <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
          <Link href="../program/29fe6fea-c849-7ae3-03b5-528493e7a8bf">
            食販2-デフォ子
          </Link>
        </Popup>
      </Polygon>
    </LayerGroup>
  )
}
