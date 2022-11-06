import React, { useEffect, useState, useRef  } from 'react'

const { kakao } = window;

const KakaoMap = ({keyword, setShopData, shopHasPage, currentPage, setCurrentPage, myLocation ,setMyLocation}) => {
    const [kakaoMap, setKakaoMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const container = useRef();
    console.log(markers)
    useEffect(()=>{
        // 지도 생성
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
        // 현재 나의 위치 마커 표시
        function displayMyMarker(locPosition){
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(30, 38), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            const marker = new kakao.maps.Marker({
                position: locPosition,
                map: kakaoMap,
                image: markerImage,
            })
            console.log(marker)
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
            // 위치 추적에 실패 했을때 초기값
            const locPosition = new kakao.maps.LatLng(37.55323, 126.97271);
            displayMyMarker(locPosition);
        }
    },[kakaoMap, setMyLocation])
    
    useEffect(()=>{
        if(kakaoMap === null){
            return;
        }

        function removeMarker(){
            for(var i = 0; i < markers.length-4; i++){
                markers[i].setMap(null)
            }
            markers.splice(0, markers.length-4)
        }
        console.log(markers)

        function addMarker(place){
            // 마커 클릭시 장소명을 표출할 인포윈도우
            const infowindow = new kakao.maps.InfoWindow({zIndex: 1});

            const marker = new kakao.maps.Marker({
                // map: kakaoMap,
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            // 마커가 지도 위에 표시
            marker.setMap(kakaoMap);
            
            // 생성된 마커를 배열에 추가
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'mouseover', function(){
                infowindow.setContent('<div style="padding:5px; font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(kakaoMap, marker);
            });
    
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
            });

        }
        // 장소 검색 객체 생성
        const ps = new kakao.maps.services.Places();

        // 키워드로 장소 검색
        ps.keywordSearch(keyword, placesSearchCB, {
            radius : 3000, // 반경
            location: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
            size: 4, // 한페이지에 몇개를 보여줄지
        });

        function placesSearchCB(data, status, pagination){
            if(status === kakao.maps.services.Status.OK){
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
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
            console.log(latlng)
            setMyLocation({latitude: latlng.getLat(), longitude: latlng.getLng()})
            setCurrentPage(1)
        })
        

        // kakao.maps.event.addListener(kakaoMap, 'zoom_changed', function() {
        //     alert('zoom changed!');
        // });

    },[currentPage, keyword, myLocation.latitude, myLocation.longitude, setCurrentPage, setShopData, shopHasPage, kakaoMap, setMyLocation, markers])
    
    return(
        <div id="container" ref={container}></div>
    )
}

export default KakaoMap;