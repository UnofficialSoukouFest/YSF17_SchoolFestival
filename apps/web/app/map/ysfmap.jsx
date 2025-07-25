'use client'

import { useState } from 'react'
import { CRS, LatLng } from 'leaflet'
import { LayersControl, MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'

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
    floor: '屋上',
    url: RoofTopMap,
    raw: RoofTopMapRaw,
    cssid: 'radioRoof',
  },
  {
    floor: '5F',
    url: FiveFloorMap,
    raw: FiveFloorMapRaw,
    cssid: 'radio5F',
  },
  {
    floor: '4F',
    url: FourFloorMap,
    raw: FourFloorMapRaw,
    cssid: 'radio4F',
  },
  {
    floor: '3F',
    url: ThreeFloorMap,
    raw: ThreeFloorMapRaw,
    cssid: 'radio3F',
  },
  {
    floor: '2F',
    url: TwoFloorMap,
    raw: TwoFloorMapRaw,
    cssid: 'radio2F',
  },
  {
    floor: '1F',
    url: OneFloorMap,
    raw: OneFloorMapRaw,
    cssid: 'radio1F',
  },
]

import './layer-button.css'
import mapStyles from './ysfmap.module.css'
import programs from '../program.mock.json'
import { parseProgramsData } from '@latimeria/core'
import { FloorLayer, FloorLayerGroupProvider, PlacePolygon } from '@/app/map/layer'
import ProgramPopup from './small-program-page.jsx'

export default function Ysfmap({ picheight, picwidth }) {
  if (!picheight) {
    picheight = window.innerHeight - 144
  }
  if (!picwidth) {
    picwidth = widthAdjust(window.innerWidth - 24)
  }
  const programsParse = parseProgramsData(programs)
  const programsList = [...programsParse.iter()]
  const [isDisplayPage, setDisplayPage] = useState(false)
  function handleClick() {
    setDisplayPage(!isDisplayPage)
  }

  /** @type {[{aria:string , item:Program[]}]} */
  return (
    <div className={mapStyles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: picwidth, height: picheight }}
        maxBounds={[[-300, -300], [picheight + 300, picwidth + 300]]}
      >
        <div className="maps">
          <LayersControl position="bottomright" collapsed={false}>
            {mapList.map((item) => {
              return (
                <LayersControl.BaseLayer checked={item.floor === '1F'} name={item.floor} key={item.floor}>
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
                          <PlacePolygon id={content.options.room} pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }} handleClick={handleClick} key={content.id}>
                            <ProgramPopup detail={content} handleClick={handleClick} isDisplayPage={isDisplayPage} />
                          </PlacePolygon>
                        )
                      })}
                    </FloorLayer>
                  </FloorLayerGroupProvider>
                </LayersControl.BaseLayer>
              )
            })}
          </LayersControl>
        </div>
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
