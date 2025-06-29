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
  #spreadChildren(children, query, collector) {
    for (const child of children) {
      for (const property in child.properties) {
        if (query(property, child.properties[property])) {
          collector.push(child)
        }
      }
      if (child.children.length > 0) {
        this.#spreadChildren(child.children, query, collector)
      }
    }
  }

  /**
   * `query`に対応する`property`の値を取得する。
   * @param {function(string, string): boolean} query `property`名,`property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedPropertyValues(query) {
    let matchedShapes = []
    for (const child of this.map.children) {
      for (const property in child.properties) {
        if (query(property, child.properties[property])) {
          matchedShapes.push(child)
        }
      }
      this.#spreadChildren(child.children, query, matchedShapes)
    }
    return matchedShapes
  }

  /**
   * SVGパスをポリゴンに変換する。
   * @param {string} path pathのデータ(`d`属性の値)を指定します。
   * @return {[number,number][][]} ポリゴンの配列を返します。
   */
  convertPathToPolygons(path) {
    return pathDataToPolys(path)
  }

  /**
     * SVGの`width`と`height`を取得する。
     * @return {[number, number]} SVGの幅と高さを返します。
     */
  getSVGSize() {
    const rootElement = this.map.children[0]
    return [rootElement.properties['width'], rootElement.properties['height']]
  }
}
