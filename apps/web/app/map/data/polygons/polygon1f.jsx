import { Polygon, Popup } from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'

export default function Polygon1f() {
  const picwidth = 500
  const picheight = 540
  const position1 = [[picheight / 2, picwidth / 2], [200, 400], [300, 300]]
  const polygonOption = { color: 'black', fillColor: '#00000000' }

  return (
    <Polygon pathOptions={polygonOption} positions={position1}>
      <Popup>
        <Image src="https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/map_pin.svg" alt="マップピンアイコン画像" width={200} height={100} />
        <Link href="../program/29fe6fea-c849-7ae3-03b5-528493e7a8bf">
          食販2 - デフォ子
        </Link>
      </Popup>
    </Polygon>
  )
}
