'use client'

import { useState } from 'react'
import { CRS, LatLng } from 'leaflet'
import { MapContainer } from 'react-leaflet'
import { FloorLayer, FloorLayerGroupProvider, PlacePolygon } from '@/app/map/layer'

/* eslint-disable import-x/no-duplicates */
import OneFloorMap from './data/bg/1.svg?url'
import OneFloorMapRaw from './data/bg/1.svg?raw'
import TwoFloorMap from './data/bg/2.svg?url'
import TwoFloorMapRaw from './data/bg/2.svg?raw'
import ThreeFloorMap from './data/bg/3.svg?url'
import ThreeFloorMapRaw from './data/bg/3.svg?raw'
import FourFloorMap from './data/bg/4.svg?url'
import FourFloorMapRaw from './data/bg/4.svg?raw'
import FiveFloorMap from './data/bg/5.svg?url'
import FiveFloorMapRaw from './data/bg/5.svg?raw'
import RoofTopMap from './data/bg/6.svg?url'
import RoofTopMapRaw from './data/bg/6.svg?raw'

const mapList = [
  {
    floor: '1F',
    url: OneFloorMap,
    raw: OneFloorMapRaw,
    cssid: 'radio1F',
  },
  {
    floor: '2F',
    url: TwoFloorMap,
    raw: TwoFloorMapRaw,
    cssid: 'radio2F',
  },
  {
    floor: '3F',
    url: ThreeFloorMap,
    raw: ThreeFloorMapRaw,
    cssid: 'radio3F',
  },
  {
    floor: '4F',
    url: FourFloorMap,
    raw: FourFloorMapRaw,
    cssid: 'radio4F',
  },
  {
    floor: '5F',
    url: FiveFloorMap,
    raw: FiveFloorMapRaw,
    cssid: 'radio5F',
  },
  {
    floor: '屋上',
    url: RoofTopMap,
    raw: RoofTopMapRaw,
    cssid: 'radioRoof',
  },
]

import styles from './ysfmap.module.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'
import Link from 'next/link'

import programs from '../program.mock.json'
import { parseProgramsData } from '@latimeria/core'

export default function Ysfmap({ picheight, picwidth }) {
  if (!picheight) {
    picheight = window.innerHeight - 144
  }
  if (!picwidth) {
    picwidth = widthAdjust(window.innerWidth - 24)
  }
  const programsParse = parseProgramsData(programs)
  const programsList = [...programsParse.iter()]
  const [pickFloor, setPickFloor] = useState('1F')
  const handleRadio = (event) => {
    setPickFloor(event.target.value)
  }
  /** @type {[{aria:string , item:Program[]}]} */
  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: picwidth, height: picheight }}
        maxBounds={[[0, 0], [picheight, picwidth]]}
      >
        {mapList.map((item) => {
          return (
            <div key={item.id}>
              <input type="radio" name="floorChoice" value={item.floor} checked={setPickFloor == item.floor} onChange={handleRadio} key={item.floor}></input>
            </div>
          )
        })}
        {mapList.filter(item => item.floor.includes(pickFloor)).map((item) => {
          return (
            <div key={item.floor}>
              <FloorLayerGroupProvider
                value={{
                  src: item.url,
                  content: item.raw,
                  picheight: picheight,
                  picwidth: picwidth,
                }}
                key={item.floor}
              >
                <FloorLayer>
                  {programsList.filter(content => content.aria.includes(item.floor)).map((content) => {
                    return (
                      <PlacePolygon id={content.options.room} pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }} key={content.id}>
                        <Image src={content.options.imagePath} alt="サンプルPR画像" width={100} height={100} key={content.id} />
                        <Link href={`/program/${content.id}`} key={content.id}>
                          {content.name}
                        </Link>
                      </PlacePolygon>
                    )
                  })}
                </FloorLayer>
              </FloorLayerGroupProvider>
            </div>
          )
        })}
      </MapContainer>
    </div>
  )
}

/**
 * レスポンシブな幅を提供 (お好みに合わせて値をいじってください)
 * @param {Number} width
 * @returns {Number} 調整された幅
 */
function widthAdjust(width) {
  return Math.min(width, width * 0.6 + 200)
}
