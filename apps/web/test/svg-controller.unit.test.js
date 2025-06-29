import { describe, test, expect } from 'vitest'
import SampleSVG from './assets/test-property-check.svg?raw'
import { SVGController } from '@/app/lib/index'

// From https://betravis.github.io/shape-tools/path-to-polygon/
const expectPolygon = [[392.242, 2.69], [392.242, 76.69], [527.242, 76.69], [527.242, 2.69]]

describe('SvgController', () => {
  test('Correctly load SVG', () => {
    expect(new SVGController(SampleSVG)).toBeDefined()
  })

  test('Check width and height', () => {
    const svgController = new SVGController(SampleSVG)
    const [width, height] = svgController.getSVGSize()
    expect(width).toEqual(1093)
    expect(height).toEqual(1279)
  })

  test('Matched property values', () => {
    const svgController = new SVGController(SampleSVG)
    const matched = svgController.matchedPropertyValues((property) => {
      return property === 'id'
    })
    expect(matched.length).toBe(8)
    expect(matched.some((v) => {
      return v.properties['id'] === 'b886e882-6cfc-47e2-816a-88c392bd8d34'
    })).toBeTruthy()
  })

  test('Correctly convert path to polygons', () => {
    const svgController = new SVGController(SampleSVG)
    const matched = svgController.matchedPropertyValues((property, value) => {
      return property === 'id' && value === 'Calligraphy_Room-9'
    })
    expect(matched.length).toBe(1)
    const polygons = svgController.convertPathToPolygons(matched[0].properties['d'])
    expect(polygons[0][0][0]).toBeCloseTo(expectPolygon[0][0])
  })
})
