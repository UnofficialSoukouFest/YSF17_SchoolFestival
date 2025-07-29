import { parse } from 'svg-parser'
import { pathDataToPolys } from 'svg-path-to-polygons'

export class SVGController {
  /**
   * @type {import("@types/hast").Root}
   */
  map

  /**
   * @param {string} source SVGソースコード
   */
  constructor(source) {
    this.map = parse(source)
  }

  /**
   * @param {import("@types/hast").ElementContent[]} children 子Node
   * @param {function(string, string): boolean} query `property`名, `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @param {(import("@types/hast").Element)[]} collector
   */
  #rescursiveAllProps(children, query, collector) {
    for (const child of children) {
      for (const property in child.properties) {
        if (query(property, child.properties[property])) {
          collector.push(child)
        }
      }
      if (child.type === 'element' && child.children.length > 0) {
        this.#rescursiveAllProps(child.children, query, collector)
      }
    }
  }

  /**
   * @param {import("@types/hast").ElementContent[]} children 子Node
   * @param {string} tagName 対象とするタグ名
   * @param {string} propertyName 対象とするプロパティ名
   * @param {function(string): boolean} query `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @param {(import("@types/hast").Element)[]} collector
   */
  #rescursiveTagProp(children, tagName, propertyName, query, collector) {
    for (const child of children) {
      if (child.tagName === tagName && query(child.properties[propertyName])) {
        collector.push(child)
      }
      if (child.type === 'element' && child.children.length > 0) {
        this.#rescursiveTagProp(child.children, tagName, propertyName, query, collector)
      }
    }
  }

  /**
   * @param {string} tagName
   * @returns {(import("@types/hast").Element)[]}
   */
  getElementsByTagName(tagName) {
    let result = []
    const search = (children) => {
      for (const child of children) {
        if (child.tagName === tagName) {
          result.push(child)
        }
        if (child.type === 'element' && child.children.length > 0) {
          search(child.children)
        }
      }
    }
    search(this.map.children)
    return result
  }

  /**
   * `query`に当てはまる`Element`を取得する。
   * @param {function(string, string): boolean} query `property`名,`property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedPropertyValues(query) {
    let matchedShapes = []
    this.#rescursiveAllProps(this.map.children, query, matchedShapes)
    return matchedShapes
  }

  /**
   * @param {string} tagName 対象とするタグ名
   * @param {string} propertyName 対象とするプロパティ名
   * @param {function(string): boolean} query `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedTagAndProperty(tagName, propertyName, query) {
    let result = []
    this.#rescursiveTagProp(this.map.children, tagName, propertyName, query, result)
    return result
  }

  /**
   * SVGの`height`と`width`を取得する。
   * @return {[height: number, width: number]} SVGの高さと幅を返します。
   */
  getSVGSize() {
    const rootElement = this.map.children[0]
    return [rootElement.properties['height'], rootElement.properties['width']]
  }
}

/**
 * SVGパスをポリゴンの配列に変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @return {[x: number, y: number][][]} ポリゴンの配列を返します。
 */
function Path2PolygonArray(path) {
  return pathDataToPolys(path)
}

/**
 * SVGパスをポリゴンに変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @return {[x: number, y: number][]} ポリゴンを返します。
 */
export function Path2Polygon(path) {
  return Path2PolygonArray(path).flat()
}

/**
 * 異なる2次元座標系に拡大変換
 * @param {[x: number, y: number]} point 変換する座標
 * @param {number} zoomRatio 拡大率
 * @param {[height: number, width: number]} paddings パディング幅
 * @return {[x: number, y: number]}
 */
export function AdjustedPoint(point, zoomRatio, paddings) {
  return [point[0] * zoomRatio + paddings[1], point[1] * zoomRatio + paddings[0]]
}

/**
 * SVGパスと調整のための情報をPositionsに変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @param {number} zoomRatio 拡大率
 * @param {[height: number, width: number]} paddings パディング幅
 * @param {(point: [number, number]) => { lat: number, lng: number }} layerPointToLatLng useMap()にあるやつを式埋め込みで渡すのが望ましい
 */
export function PathAndAdjustInfo2Positions(path, zoomRatio, paddings, layerPointToLatLng) {
  const polygon = Path2Polygon(path)
  let positions = []
  for (const point of polygon) {
    positions.push(layerPointToLatLng(AdjustedPoint(point, zoomRatio, paddings)))
  }
  return positions
}

/**
 * 表示域サイズとsvgサイズから、svgに初期適用されるズーム率と表示域内のsvgのpadding幅を返します
 * @param {[height: number, width: number]} picSize [height, width]
 * @param {[height: number, width: number]} svgSize [height, width]
 */
export function zoomRatioAndPaddings(picSize, svgSize) {
  let zoomRatio
  let paddingWidth = 0, paddingHeight = 0
  const [picHeight, picWidth] = picSize
  const [svgHeight, svgWidth] = svgSize
  if (picWidth / svgWidth > picHeight / svgHeight) {
    zoomRatio = picHeight / svgHeight
    paddingWidth = (picWidth - svgWidth * zoomRatio) / 2
  }
  else {
    zoomRatio = picWidth / svgWidth
    paddingHeight = (picHeight - svgHeight * zoomRatio) / 2
  }
  return [zoomRatio, [paddingHeight, paddingWidth]]
}

/**
 * SVGパスとマップの情報をPositionsに変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @param {[height: number, width: number]} picSize [height, width]
 * @param {[height: number, width: number]} svgSize [height, width]
 * @param {(point: [number, number]) => { lat: number, lng: number }} layerPointToLatLng useMap()にあるやつを式埋め込みで渡すのが望ましい
 */
export function PathAndMapInfo2Positions(path, picSize, svgSize, layerPointToLatLng) {
  const [zoomRatio, padding] = zoomRatioAndPaddings(picSize, svgSize)
  return PathAndAdjustInfo2Positions(path, zoomRatio, padding, layerPointToLatLng)
}
