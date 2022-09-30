import React from "react";
import Slider from "./ImageSlider";

const PopularArea = ({recommendItem}) => {
    return(
        <div className="popular-box">
            <h2>최근 급상승 인기 상품을 소개해드립니다.</h2>
            <h1>와인 인기 조회 상품</h1>
            <Slider item={recommendItem}/>            
        </div>
    );
}

export default PopularArea;