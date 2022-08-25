import React, {useCallback, useEffect, useState} from 'react'
import "./Recommend.scss";
import { useSearchParams } from 'react-router-dom';

const Recommend = () => {
    const [searchText, setSearchText] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(()=>{
        setSearchText(searchParams.get("q")?? "")},[searchParams])
    
    const onChangeInput = useCallback((e) => {
        setSearchText(e.target.value)
    },[])

    const OnKeyUp = useCallback((e) =>{
        if(e.key === 'Enter' && e.target.value.trim().length > 0){
            setSearchParams({q: e.target.value})
        }
    },[setSearchParams])
    
    const PopularItem = ({number, image, itemName}) => {
        return(
        <a href="/" className="popular-item">
            <span className="num">{number}</span>
            <div className="img-box"><img className="img" src={image}></img></div>
            <p className="item-name">{itemName}</p>
        </a>
        );
    };

    const RecommendItem = ({image, itemName}) => {
        return (
        <li className="recommend-item">
        <a className="left" href="/">
            <img className="recommend-img" src={image}></img>
        </a>
        <div className="right">
            <div className="explain-box">
                <p className="recommend-item-name">{itemName}</p>
                <p className="recommend-item-contry">국가/생산지역: 미국</p>
                <p className="recommend-item-company">수입사: 신세계엘엔비</p>
            </div>
            <ul className="item-tag">
                <li><a href='/'>#달콤한 맛</a></li>
                <li><a href='/'>#약한 도수</a></li>
                <li><a href='/'>#값이 싼</a></li>
                <li><a href='/'>#가벼운</a></li>
            </ul>
        </div>
    </li>
        );
    };
    
    return(
        <div className="recommend-area">
            <div className="recommend-content">
                <div className="popular-box">
                    <h2>최근 급상승 인기 상품을 소개해드립니다.</h2>
                    <h1>와인 인기 조회 상품</h1>
                    <div className="popular-items">
                        <PopularItem number= "01" image="img/와인1.png" itemName="헌드레드에이커"/>
                        <PopularItem number= "02" image="img/와인2.png" itemName="헌드레드에이커"/>
                        <PopularItem number= "03" image="img/와인3.png" itemName="헌드레드에이커"/>
                        <PopularItem number= "04" image="img/와인4.png" itemName="헌드레드에이커"/>
                        <PopularItem number= "05" image="img/와인5.png" itemName="헌드레드에이커"/>
                    </div>
                </div>
                <div className="recommend-box">
                    <div className="bar">
                        <div className="total-num">전체 5,357개</div>
                        <div className="search-area">
                            <input value={searchText} 
                            type="text" 
                            className="search-bar" 
                            placeholder="검색어를 입력해주세요. "
                            onChange={onChangeInput}
                            onKeyUp={OnKeyUp}></input>   
                        </div>
                        <div className="filter-area"></div>
                    </div>
                    <div>
                        <ul className="recommend-items">
                            <RecommendItem image="img/와인1.png" itemName="헌드레드에이커"/>
                            <RecommendItem image="img/와인2.png" itemName="헌드레드에이커"/>
                            <RecommendItem image="img/와인3.png" itemName="헌드레드에이커"/>
                            <RecommendItem image="img/와인4.png" itemName="헌드레드에이커"/>
                            <RecommendItem image="img/와인5.png" itemName="헌드레드에이커"/>
                            <RecommendItem image="img/와인2.png" itemName="헌드레드에이커"/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;