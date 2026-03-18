'use client'

import Floor1URL from '@/data/map/bg/1.svg?url'
import Floor2URL from '@/data/map/bg/2.svg?url'
import Floor3URL from '@/data/map/bg/3.svg?url'
import Floor4URL from '@/data/map/bg/4.svg?url'
import Floor5URL from '@/data/map/bg/5.svg?url'
import Floor6URL from '@/data/map/bg/6.svg?url'
import Floor1Raw from '@/data/map/programs/1.svg?raw'
import Floor2Raw from '@/data/map/programs/2.svg?raw'
import Floor3Raw from '@/data/map/programs/3.svg?raw'
import Floor4Raw from '@/data/map/programs/4.svg?raw'
import Floor5Raw from '@/data/map/programs/5.svg?raw'
import Floor6Raw from '@/data/map/programs/6.svg?raw'

const mapList = [
  { floor: '屋上', url: Floor6URL, raw: Floor6Raw, cssid: 'radioRoof' },
  { floor: '5F', url: Floor5URL, raw: Floor5Raw, cssid: 'radio5F' },
  { floor: '4F', url: Floor4URL, raw: Floor4Raw, cssid: 'radio4F' },
  { floor: '3F', url: Floor3URL, raw: Floor3Raw, cssid: 'radio3F' },
  { floor: '2F', url: Floor2URL, raw: Floor2Raw, cssid: 'radio2F' },
  { floor: '1F', url: Floor1URL, raw: Floor1Raw, cssid: 'radio1F' },
]

import { CRS, LatLng } from 'leaflet'
import { LayersControl, MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import './leaflet-override.css' // leaflet標準cssをオーバーライド
import styles from './ysfmap.module.css'

import { SVGController, Path2Polygon, zoomRatioAndPaddings } from '@/app/lib/index.js'
import { FloorLayer, gcenter } from './layer'

/**
 * 高さ、幅、初期表示階(、フォーカス対象の企画id)、部屋選択時に呼び出す関数をオプションで指定してYSF校内の地図を表示します。
 * @param {Object} props
 * @param {number} [props.picHeight] 地図の表示高さ 指定がない場合は `window.innerHeight - 64`
 * @param {number} [props.picWidth] 地図の表示幅 指定がない場合は `window.innerWidth`
 * @param {number} [props.initialFloor=1] 初期表示する階(1~6) 指定しなかった場合`1`
 * @param {number} [props.id] 初期フォーカス対象の企画id (指定する場合初期表示する階を正しく必ず指定して下さい)
 * @param {(ids: string[], layer: L.Polygon) => void} [props.onRoomClick] 部屋選択時に呼び出すコールバック関数\
 * 選択された部屋が持つ企画idの配列と、クリックした部屋の`L.Polygon`を受け取る。\
 * 指定しなかった場合デフォルトのポップアップが表示される。
 * @returns {JSX.Element}
 */
export default function YSFMap({ picHeight, picWidth, initialFloor = 1, id, onRoomClick }) {
  if (!picHeight) {
    picHeight = window.innerHeight - 64
  }
  if (!picWidth) {
    picWidth = window.innerWidth
  }
  const svgController = new SVGController(mapList[6 - initialFloor].raw)
  const svgSize = svgController.getSVGSize()
  const [zoomRatio, paddings] = zoomRatioAndPaddings([picHeight, picWidth], svgSize)

  let initZoom = 0.5
  let center = [picHeight / 2, picWidth / 2]
  let polyPaddings = [
    picHeight / 2 - (picHeight / 2 - paddings[0]) * Math.pow(2, initZoom),
    picWidth / 2 - (picWidth / 2 - paddings[1]) * Math.pow(2, initZoom)]

  if (id) {
    const Room = svgController.matchedTagAndProperty('path', 'id', (ids) => {
      return ids.split(',').includes(id)
    })[0]
    if (Room) {
      initZoom = 1.5
      const [y, x] = gcenter(Path2Polygon(Room.properties['d']))
      center = [picHeight - (y * zoomRatio + paddings[0]), x * zoomRatio + paddings[1]]
      polyPaddings[0] = picHeight / 2 - y * zoomRatio * Math.pow(2, initZoom)
      polyPaddings[1] = picWidth / 2 - x * zoomRatio * Math.pow(2, initZoom)
    }
  }

  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(center[0], center[1])}
        zoom={initZoom}
        minZoom={0}
        maxZoom={2}
        zoomSnap={0.5}
        zoomDelta={0.5}
        style={{ height: picHeight, width: picWidth }}
        maxBounds={[[-picHeight * 0.5, -picWidth * 0.5], [picHeight * 1.5, picWidth * 1.5]]} // 自分を見失わないため
      >
        <LayersControl
          position="topright"
          collapsed={false}
        >
          {mapList.map((item) => { // 各階
            return (
              <LayersControl.BaseLayer
                checked={item.floor === mapList[6 - initialFloor].floor}
                name={item.floor}
                key={item.floor}
              >
                <FloorLayer
                  src={item.url}
                  raw={item.raw}
                  picSize={[picHeight, picWidth]}
                  paddings={polyPaddings}
                  zoomRatio={zoomRatio * Math.pow(2, initZoom)}
                  onRoomClick={onRoomClick}
                  openId={id}
                />
              </LayersControl.BaseLayer>
            )
          })}
        </LayersControl>
      </MapContainer>
    </div>
  )
}
