'use client'
import dynamic from 'next/dynamic'
import { useState, useMemo, useRef } from 'react'
import BottomSheet from './bottom-sheet'

const YSFMap = dynamic(() => import('./ysfmap.jsx'), {
  loading: () => <p style={{ height: 'calc(100vh - 64px)', width: '100vw' }}>Loading...</p>,
  ssr: false,
})

/**
 * マップページで使用するマップ
 */
export function MapWithBottomSheet() {
  const [selectedIds, setSelectedIds] = useState([])

  const highlightManager = useRef({
    lastLayer: undefined,
    handleLayerClick({ ids = [], layer }) {
      if (this.lastLayer) {
        this.lastLayer.setStyle({
          fillOpacity: 0, // タップ時に認識させるため透明度で管理
          stroke: false,
        })
      }
      if (layer) {
        layer.setStyle({
          fillOpacity: 1,
          stroke: true,
        })
        this.lastLayer = layer
      }
      else {
        this.lastLayer = undefined
      }
      setSelectedIds(ids)
    },
  })

  const MemoMap = useMemo(
    () =>
      <YSFMap onRoomClick={(ids, layer) => { highlightManager.current.handleLayerClick({ ids: ids, layer: layer }) }} />,
    [],
  )
  return (
    <>
      {MemoMap}
      <BottomSheet ids={selectedIds} onClose={() => { highlightManager.current.handleLayerClick({}) }} />
    </>
  )
}

/**
 * どこでも使えるマップ
 * @param {Object} prop
 * @param {number} [prop.width]
 * @param {number} [prop.height]
 */
export function Map({ width, height }) {
  return (
    <YSFMap picWidth={width} picHeight={height} />
  )
}

/**
 * 企画ページ向けのマップ
 * @param {Object} prop
 * @param {number} [prop.width]
 * @param {number} [prop.height]
 * @param {number} floor
 * @param {number} id
 */
export function MapFromSpecRoom({ width, height, floor, id }) {
  return (
    <YSFMap picWidth={width} picHeight={height} initialFloor={floor} id={id} />
  )
}
