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
  },
  {
    floor: '2F',
    url: TwoFloorMap,
    raw: TwoFloorMapRaw,
  },
  {
    floor: '3F',
    url: ThreeFloorMap,
    raw: ThreeFloorMapRaw,
  },
  {
    floor: '4F',
    url: FourFloorMap,
    raw: FourFloorMapRaw,
  },
  {
    floor: '5F',
    url: FiveFloorMap,
    raw: FiveFloorMapRaw,
  },
  {
    floor: '屋上',
    url: RoofTopMap,
    raw: RoofTopMapRaw,
  }]

import styles from './ysfmap.module.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'
import Link from 'next/link'

import programs from '../program.mock.json'
import { parseProgramsData } from '@latimeria/core'

const items = [
  { id: 1, item: '1F' },
  { id: 2, item: '2F' },
  { id: 3, item: '3F' },
  { id: 4, item: '4F' },
  { id: 5, item: '5F' },
  { id: 6, item: '屋上' },
]

const RadioButtonItems = propaties =>
  items.map((item) => {
    return (
      <label key={item.id}>
        <input
          type="radio"
          value={item.item}
          onChange={propaties.handleChange}
          checked={propaties.checkedValue === item.item}
        />
        {item.item}
      </label>
    )
  })

const InputRadio = () => {
  const [checkedValue, setCheckedValue] = useState(items[0].item)
  const handleChange = event => setCheckedValue(event.target.value)

  return (
    <div>
      <RadioButtonItems
        handleChange={handleChange}
        checkedValue={checkedValue}
      />
    </div>
  )
}

export default function Ysfmap() {
  const programsParse = parseProgramsData(programs)
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const picwidth = screenWidth >= 1300 ? screenWidth * 0.6 : screenWidth * 0.95
  const picheight = screenHeight * 0.75
  const displayWidth = screenWidth >= 1300 ? '60vw' : '95vw'
  const programsList = [...programsParse.iter()]
  /** @type {[{aria:string , item:Program[]}]} */
  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: displayWidth, height: '75vh' }}
        maxBounds={[[0, 0], [picheight, picwidth]]}
      >
        <InputRadio />
        {mapList.filter(item => item.floor.includes('1F')).map((item) => {
          return (
            <div key={item.floor}>
              <FloorLayerGroupProvider value={{
                src: item.url,
                content: item.raw,
                picheight: picheight,
                picwidth: picwidth,
              }}
              >
                <FloorLayer>
                  {programsList.filter(content => content.aria.includes(item.floor)).map((content) => {
                    return (
                      <PlacePolygon id={content.options.room} pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }} key={content.id}>
                        <Image src={content.options.imagePath} alt="サンプルPR画像" width={100} height={100} key={content.id} />
                        <Link href={`/program/${content.id}`}>
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
