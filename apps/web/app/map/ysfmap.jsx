'use client'

import { CRS, LatLng } from 'leaflet'
import { MapContainer, LayersControl } from 'react-leaflet'
import { FloorLayer, FloorLayerGroupProvider, PlacePolygon } from '@/app/map/layer'
import programs from '../program.mock.json'
import {parseProgramsData} from '@latimeria/core'

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

import styles from './ysfmap.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'
import Link from 'next/link'

const programList = parseProgramsData(programs);

export default function Ysfmap() {
  const maxwidth = window.innerWidth
  const picwidth = maxwidth * 0.97
  const picheight = 350
  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: picwidth, height: picheight }}
        maxBounds={[[0, 0], [picheight, picwidth]]}
      >
        <LayersControl position="bottomright" collapsed="false">
          {programList.map((programItem) => { return (<LayersControl.BaseLayer checked name="1階">
            <FloorLayerGroupProvider value={{
              src: OneFloorMap,
              content: OneFloorMapRaw,
              picheight: picheight,
              picwidth: picwidth,
            }}
            >
              <FloorLayer>
                <PlacePolygon id="Cafeteria" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                  <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                  <Link href="../dining/cafeteria">
                    カフェテリア
                  </Link>
                </PlacePolygon>
              </FloorLayer>
            </FloorLayerGroupProvider>
          </LayersControl.BaseLayer>)})}
        </LayersControl>
      </MapContainer>
    </div>
  )
}
