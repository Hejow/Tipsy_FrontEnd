import React, {useEffect} from "react";
import "./FindShop.scss";

const { kakao } = window;

const FindShop = () => {
    useEffect(() => {
        const container = document.getElementById('map');
		const options = {
			center: new kakao.maps.LatLng(37.209261189330746, 126.97385293937937),
			level: 5
		};
        const map = new kakao.maps.Map(container, options);

        
    }, [])
    
    return(
        <>
            <div className="findshop-area">
                <div className="findshop-container">
                    <div className="map_title_area">
                        <div className="title">
                            판매처 찾기
                        </div>
                    </div>
                        <div id='map' style={{
                            width: '40rem',
                            height: '14rem'
                        }}></div>
                    <ul className="shop_list">
                        <li className="list_item">shop1</li>
                        <li className="list_item">shop2</li>
                        <li className="list_item">shop3</li>
                        <li className="list_item">shop4</li>
                    </ul>
                    <div className="page_button">
                        <a href="/">이전</a>
                        <span className="page_indicate">
                            <span className="present_page">1</span>
                            <span>10</span>
                        </span>
                        <a href="/">다음</a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FindShop;

