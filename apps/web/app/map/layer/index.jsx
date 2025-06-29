import { createContext, useContext } from 'react'
import { ImageOverlay, LayerGroup, Polygon, Popup, useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { SVGController } from '@/app/lib/index.js'

/**
 * @typedef {Object} FloorLayerOptions
 * @property {string} src レイヤーのソースとなるURL
 * @property {string} content レイヤーのコンテンツ
 * @property {number} picheight 画像の幅
 * @property {number} picwidth 画像の高さ
 */

/**
 * @type {React.Context<FloorLayerOptions>}
 */
const FloorLayerGroupContext = createContext({})

export const FloorLayerGroupProvider = FloorLayerGroupContext.Provider

/**
 * @param {React.ReactNode} children
 * @return {React.ReactNode}
 * @constructor
 */
export function FloorLayer({ children }) {
  const groupContext = useContext(FloorLayerGroupContext)
  return (
    <LayerGroup>
      <ImageOverlay url={groupContext.src} bounds={new LatLngBounds([[0, 0], [groupContext.picheight, groupContext.picwidth]])} />
      {children}
    </LayerGroup>
  )
}

/**
 * PlacePolygonコンポーネントは、指定されたSVGのIDとパスオプションを使用してポリゴンを描画します。
 * @param {string} id SVG内のパスのID
 * @param {import("leaflet").PathOptions} pathOptions
 * @param {React.ReactNode} children
 * @return {React.ReactNode}
 * @constructor
 */
export function PlacePolygon({ id, pathOptions, children }) {
  const map = useMap()
  const groupContext = useContext(FloorLayerGroupContext)
  const svgController = new SVGController(groupContext.content)
  const [svgWidth, svgHeight] = svgController.getSVGSize()
  const matched = svgController.matchedPropertyValues((property, value) => {
    return property === 'id' && value === id
  })
  const polygonsWithMeta = svgController.convertPathToPolygons(matched[0].properties['d'])
  let polygons = []
  for (const polygonGroup of polygonsWithMeta) {
    for (const polygon of polygonGroup) {
      if (Array.isArray(polygon)) {
        /** @type {[number, number]} */
        const convertedPolygon = [
          zoomPolygon(polygon[0], (groupContext.picwidth / svgWidth)),
          zoomPolygon(polygon[1], (groupContext.picheight / svgHeight)),
        ]
        polygons.push(map.layerPointToLatLng(convertedPolygon))
      }
    }
  }
  // 最後のポリゴンは閉じるためのものなので削除
  polygons.pop()

  return (
    <LayerGroup>
      <Polygon pathOptions={pathOptions} positions={polygons}>
        <Popup>
          {children}
        </Popup>
      </Polygon>
    </LayerGroup>
  )
}

/**
 * ズーム倍率を適用してポリゴンの座標を変換します。
 * @param {number} point
 * @param {number} ratio
 * @return {number}
 */
function zoomPolygon(point, ratio) {
  return point * ratio
}
