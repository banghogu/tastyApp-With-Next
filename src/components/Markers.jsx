/* global kakao */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as currentStoreActions from "../store/modules/currentStore.slice";
import * as locationActions from "../store/modules/location.slice";
import { useQuery } from 'react-query';
import axios from 'axios';

const Markers = () => {
    const [isStoresLoaded, setIsStoresLoaded] = useState(false);
    const { map } = useSelector((state) => state.mapSlice);
    const dispatch = useDispatch();

    const fetchAllStores = async () => {
        const { data } = await axios.get("http://localhost:3000/api/stores");
        return data;
    };

    const { data: storeDatas } = useQuery('AllStores', fetchAllStores, {
        onSuccess: () => setIsStoresLoaded(true)
    });

    const loadKakaoMarkers = (storeDatas) => {
        if (window.kakao && window.kakao.maps) {
            storeDatas?.map((store) => {
                var imageSrc = store?.bizcnd_code_nm ? `images/markerImages/${store?.bizcnd_code_nm}.png` : `images/markerImages/default.png`,
                    imageSize = new window.kakao.maps.Size(40, 40),
                    imageOption = { offset: new kakao.maps.Point(27, 69) };

                var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                var markerPosition = new window.kakao.maps.LatLng(store?.y_dnts, store?.x_cnts);

                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage
                });

                marker.setMap(map);

                var content = `<div class="infowindow">${store?.upso_nm}</div>`;
                var customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: content,
                    xAnchor: 0.6,
                    yAnchor: 0.91,
                });

                window.kakao.maps.event.addListener(marker, "mouseover", function () {
                    customOverlay.setMap(map);
                });

                window.kakao.maps.event.addListener(marker, "mouseout", function () {
                    customOverlay.setMap(null);
                });

                window.kakao.maps.event.addListener(marker, 'click', function () {
                    dispatch(currentStoreActions.setCurrentStore(store));
                    dispatch(locationActions.setLocation({
                        lat: store.y_dnts,
                        lng: store.x_cnts
                    }))
                });
            });
        }

    };

    useEffect(() => {
        if (map && isStoresLoaded) {
            loadKakaoMarkers(storeDatas);
        }
    }, [isStoresLoaded, map]);

    return (
        <div>
        </div>
    );
};

export default Markers;