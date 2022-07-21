import React from 'react'
import "./Recommend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const Recommend = () => {
    return(
        <div className="recommend-area">
            <div className="content">
                <div className="title"></div>
                <div className="filter"></div>
                <div className="item-container">
                    <div className="item">
                        <div className="left">와인</div>
                        <div className="mid">이미지 슬라이드</div>
                        <div className="right">아이템 리스트
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>    
                    </div>
                    <div className="item">
                        <div className="left">위스키</div>
                        <div className="mid">이미지 슬라이드</div>
                        <div className="right">아이템 리스트
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>    
                    </div>
                    <div className="item">
                        <div className="left">칵테일</div>
                        <div className="mid">이미지 슬라이드</div>
                        <div className="right">아이템 리스트
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;