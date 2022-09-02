import React, {useCallback, useEffect, useState} from 'react'
import "./Recommend.scss";
import { useSearchParams } from 'react-router-dom';

const Recommend = () => {
    function SearchInput(){
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
        
        return(
            <input value={searchText} 
            type="text" 
            className="search-bar" 
            placeholder="검색어 입력 후 ENTER"
            onChange={onChangeInput}
            onKeyUp={OnKeyUp}></input>
        )   
    };


    const recommendItem = [
        {id: 1, title: "헌드레드 에이커", img:"img/와인1.png", tags: ["#달콤한 맛", "#약한 도수", "#값이 싼", "#가벼운"]},
        {id: 2, title: "리카솔리", img:"img/와인2.png", tags: ["태그1", "태그2", "태그3", "태그4"]},
        {id: 3, title: "볼게리 로쏘", img:"img/와인3.png", tags: ["태그1", "태그2", "태그3", "태그4"]},
        {id: 4, title: "라포스톨", img:"img/와인4.png", tags: ["태그1", "태그2", "태그3", "태그4"]},
        {id: 5, title: "샤또팔레 카디날", img:"img/와인5.png", tags: ["태그1", "태그2", "태그3", "태그4"]}
    ];
    
    
    return(
        <div className="recommend-area">
            <div className="recommend-content">
                <div className="popular-box">
                    <h2>최근 급상승 인기 상품을 소개해드립니다.</h2>
                    <h1>와인 인기 조회 상품</h1>
                    <div className="popular-items">
                        {recommendItem.map(item =>(
                            <a key={item.id} href="/" className="popular-item">
                                <span className="num">{item.id.toString()}</span>
                                <div className="img-box"><img className="img" src={item.img}></img></div>
                                <p className="item-name">{item.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="recommend-box">
                    <div className="bar">
                        <div className="total-num">전체 {recommendItem.length}개</div>
                        <div className="search-area">
                            {SearchInput()}
                        </div>
                        {/* <div className="filter-area"></div> */}
                    </div>
                    <div>
                        <ul className="recommend-items">
                            {recommendItem.map(item => (
                                <li className="recommend-item">
                                    <a className="left" href="/">
                                        <img className="recommend-img" src={item.img}></img>
                                    </a>
                                    <div className="right">
                                        <div className="explain-box">
                                            <p className="recommend-item-name">{item.title}</p>
                                            <p className="recommend-item-contry">국가/생산지역: 미국</p>
                                            <p className="recommend-item-company">수입사: 신세계엘엔비</p>
                                        </div>
                                        <ul className="item-tag">
                                            {item.tags.map(tag => (
                                                <li><a href='/'>{tag}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;