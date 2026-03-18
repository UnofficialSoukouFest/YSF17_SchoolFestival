import { ImageOverlay, LayerGroup, Polygon, Popup, useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { SVGController, PathAndAdjustInfo2Positions } from '@/app/lib/index.js'

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.raw
 * @param {[height: number, width: number]} props.picSize
 * @param {[height: number, width: number]} props.paddings
 * @param {(ids: string[], layer: L.Polygon) => void} [props.onRoomClick] 部屋選択時に呼び出すコールバック関数\
 * 選択された部屋が持つ企画idの配列と、クリックした部屋の`L.Polygon`を受け取る。\
 * 指定しなかった場合デフォルトのポップアップが表示される。
 * @param {string} [props.openId] このidが含まれるポリゴンのポップアップを自動で開く
 */
export function FloorLayer({ src, raw, picSize, paddings, zoomRatio, onRoomClick, openId }) {
  const map = useMap()
  const svgController = new SVGController(raw)
  // eslint-disable-next-line unicorn/prefer-query-selector
  const paths = svgController.getElementsByTagName('path')

  return (
    <LayerGroup>
      <ImageOverlay url={src} bounds={new LatLngBounds([0, 0], picSize)}>
        {paths.map((element) => {
          const ids_string = element.properties.id
          const ids = ids_string.split(',')
          const positions = PathAndAdjustInfo2Positions(
            element.properties['d'],
            zoomRatio,
            paddings,
            point => map.layerPointToLatLng(point))
          const open = ids.includes(openId)
          return (
            <LayerGroup key={ids[0]}>
              <Polygon
                eventHandlers={onRoomClick
                  ? {
                      click: (event_) => {
                        const layer = event_.target
                        onRoomClick(ids, layer)
                      },
                    }
                  : {}}
                pathOptions={{
                  fillColor: '#ffd080',
                  fillOpacity: open ? 1 : 0, // タップ時に認識させるため透明度で管理
                  color: '#1c5cff',
                  stroke: open ? true : false,
                }}
                positions={positions}
              >
                {!onRoomClick && ( // 関数なしの場合
                  <Popup>
                    {ids.map(id => <div key={id}>{id}</div>)}
                  </Popup>
                )}
              </Polygon>
            </LayerGroup>
          )
        })}
      </ImageOverlay>
    </LayerGroup>
  )
}

/**
 * 重心を計算して返す
 */
export function gcenter(polygon) {
  let xsum = 0, ysum = 0
  for (const point of polygon) {
    xsum += point[0]
    ysum += point[1]
  }
  const length_ = polygon.length
  xsum /= length_
  ysum /= length_
  return [ysum, xsum]
}
