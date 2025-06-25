'use client'
import { CRS, LatLng, LatLngBounds } from 'leaflet'
import React from 'react'
import { MapContainer, ImageOverlay, LayersControl, LayerGroup } from 'react-leaflet'
import Polygon1f from './data/polygons/polygon1f'
import './ysfmap.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)

export default function Ysfmap() {
  const picwidth = 500
  const picheight = 540
  const layersUrl = [
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/1.svg',
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/2.svg',
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/3.svg',
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/4.svg',
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/5.svg',
    'https://raw.githubusercontent.com/UnofficialSoukouFest/YSF17_SchoolFestival/refs/heads/master/apps/web/app/map/data/bg/6.svg']
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
          <LayerGroup>
            <ImageOverlay url={layersUrl[0]} bounds={new LatLngBounds([[0, 0], [picheight, picwidth]])} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="2階">
          <LayerGroup>
            <ImageOverlay url={layersUrl[1]} bounds={new LatLngBounds([[0, 0], [picheight, picwidth]])} />
            <Polygon1f />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  )
}
