/* global kakao */
import Script from 'next/script'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as mapActions from "../store/modules/map.slice"


const Map = ({ lat, lng, zoom }) => {
    const { location } = useSelector((state) => state.locationSlice)
    const dispatch = useDispatch()

    const loadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng),
                level: zoom ?? location.zoom
            };
            const map = new window.kakao.maps.Map(container, options)
            dispatch(mapActions.setMap(map))
        })
    }
    return (
        <>
            <Script
                strategy='afterInteractive'
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
                onReady={loadKakaoMap}
            />
            <div id="map" className='w-full h-screen'>

            </div>
        </>
    )
}

export default Map
