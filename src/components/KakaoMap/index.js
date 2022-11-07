import React, { useEffect, useState, useRef  } from 'react'

const { kakao } = window;

const KakaoMap = ({keyword, setShopData, shopHasPage, currentPage, setCurrentPage, myLocation ,setMyLocation}) => {
    const [kakaoMap, setKakaoMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const container = useRef();
    useEffect(()=>{
        const center = new kakao.maps.LatLng(37.55323, 126.97271);
        const option = {
            center,
            level: 7,
        };
        const map = new kakao.maps.Map(container.current, option);
        setKakaoMap(map);
    },[container])

    useEffect(()=>{
        if(kakaoMap === null){
            return;
        }
        const center = kakaoMap.getCenter();
        kakaoMap.setCenter(center); 
    },[kakaoMap, setMyLocation])
    
    useEffect(()=>{
        if(kakaoMap === null){
            return;
        }
        function displayMyMarker(locPosition){
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                imageSize = new kakao.maps.Size(30, 38),
                imageOption = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            const marker = new kakao.maps.Marker({
                position: locPosition,
                map: kakaoMap,
                image: markerImage,
            })
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = position.coords.latitude,
                    lon = position.coords.longitude;
                const locPosition = new kakao.maps.LatLng(lat, lon);
                displayMyMarker(locPosition);
                setMyLocation({latitude: lat, longitude: lon})
                kakaoMap.setCenter(locPosition);
            });
        }else{
            const locPosition = new kakao.maps.LatLng(37.55323, 126.97271);
            displayMyMarker(locPosition);
        }
    },[kakaoMap, setMyLocation])
    
    useEffect(()=>{
        if(kakaoMap === null)  return;

        function removeMarker(){
            for(var i = 0; i < markers.length-4; i++){
                markers[i].setMap(null)
            }
            markers.splice(0, markers.length-4)
        }

        function addMarker(place){
            const infowindow = new kakao.maps.InfoWindow({zIndex: 1});

            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            marker.setMap(kakaoMap);
            
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'mouseover', function(){
                infowindow.setContent('<div style="padding:5px; font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(kakaoMap, marker);
            });
    
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

        }
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(keyword, placesSearchCB, {
            radius : 3000,
            location: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
            size: 4,
        });

        function placesSearchCB(data, status, pagination){
            if(status === kakao.maps.services.Status.OK){
                const bounds = new kakao.maps.LatLngBounds();
                for(var i=0; i < data.length; i++){
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    addMarker(data[i]);
                }
                
                const mylocation = new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);
                kakaoMap.setCenter(mylocation)     
                kakaoMap.setBounds(bounds)

                removeMarker();

                setShopData({
                    data: data,
                    dataCount: pagination.totalCount,
                })

                if(shopHasPage === true){
                    pagination.gotoPage(currentPage)
                    setCurrentPage(currentPage)
                }
            }else{
                alert("주변에 상점이 없습니다. 지도를 드레그하여 이동해주세요")
                }
            }

        kakao.maps.event.addListener(kakaoMap, 'dragend', function(){
            let latlng = kakaoMap.getCenter();
            setMyLocation({latitude: latlng.getLat(), longitude: latlng.getLng()})
            setCurrentPage(1)
        })
        
    },[currentPage, keyword, myLocation.latitude, myLocation.longitude, setCurrentPage, setShopData, shopHasPage, kakaoMap, setMyLocation, markers])
    
    return(
        <div id="container" ref={container}></div>
    )
}

export default KakaoMap;