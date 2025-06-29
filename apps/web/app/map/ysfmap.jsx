'use client'

import { CRS, LatLng } from 'leaflet'
import { MapContainer, LayersControl } from 'react-leaflet'
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

import './ysfmap.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'
import Link from 'next/link'

export default function Ysfmap() {
  const picwidth = 500
  const picheight = 540
  return (
    <MapContainer
      crs={CRS.Simple}
      center={new LatLng(picheight / 2, picwidth / 2)}
      zoom={0}
      style={{ width: picwidth, height: picheight }}
      maxBounds={[[0, 0], [picheight, picwidth]]}
    >
      <LayersControl position="bottomright" collapsed="false">
        <LayersControl.BaseLayer checked name="1階">
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
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="2階">
          <FloorLayerGroupProvider value={{
            src: TwoFloorMap,
            content: TwoFloorMapRaw,
            picheight: picheight,
            picwidth: picwidth,
          }}
          >
            <FloorLayer>
              <PlacePolygon id="Instructors_Room" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                <Link href="../program/b886e882-6cfc-47e2-816a-88c392bd8d34">
                  緑の羽根募金
                </Link>
              </PlacePolygon>
            </FloorLayer>
          </FloorLayerGroupProvider>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="3階">
          <FloorLayerGroupProvider value={{
            src: ThreeFloorMap,
            content: ThreeFloorMapRaw,
            picheight: picheight,
            picwidth: picwidth,
          }}
          >
            <FloorLayer>
              <PlacePolygon id="Room_S37" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                <Link href="../program/c8f366dc-65f9-43b6-99b0-29d1f43c7c3b">
                  根城はサイコロを振らないスペシャルエディション
                </Link>
              </PlacePolygon>
            </FloorLayer>
          </FloorLayerGroupProvider>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="4階">
          <FloorLayerGroupProvider value={{
            src: FourFloorMap,
            content: FourFloorMapRaw,
            picheight: picheight,
            picwidth: picwidth,
          }}
          >
            <FloorLayer>
              <PlacePolygon id="Room_S42" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                <Link href="../dining/cafeteria">
                  カフェテリア
                </Link>
              </PlacePolygon>
            </FloorLayer>
          </FloorLayerGroupProvider>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="5階">
          <FloorLayerGroupProvider value={{
            src: FiveFloorMap,
            content: FiveFloorMapRaw,
            picheight: picheight,
            picwidth: picwidth,
          }}
          >
            <FloorLayer>
              <PlacePolygon id="Room_S57" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                <Link href="../dining/cafeteria">
                  カフェテリア
                </Link>
              </PlacePolygon>
            </FloorLayer>
          </FloorLayerGroupProvider>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="屋上">
          <FloorLayerGroupProvider value={{
            src: RoofTopMap,
            content: RoofTopMapRaw,
            picheight: picheight,
            picwidth: picwidth,
          }}
          >
            <FloorLayer>
              <PlacePolygon id="Astronomical_Observatory" pathOptions={{ color: '#0000FF', fillColor: '#0000FFFF', weight: 1 }}>
                <Image src="https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/favicon.ico" alt="サンプルPR画像" width={100} height={100} />
                <Link href="../dining/cafeteria">
                  カフェテリア
                </Link>
              </PlacePolygon>
            </FloorLayer>
          </FloorLayerGroupProvider>
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  )
}
