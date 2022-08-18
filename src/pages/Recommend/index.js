import React, {useCallback, useEffect, useState} from 'react'
import "./Recommend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
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
        if(e.key === 'Enter' && e.target.value.trim().length >0){
            setSearchParams({q: e.target.value})
        }
    },[setSearchParams])
    
    return(
        <div className="recommend-area">
            <div className="content">
                <div className="popular-box">
                    <h2>최근 급상승 인기 상품을 소개해드립니다.</h2>
                    <h1>와인 인기 조회 상품</h1>
                    <div className="popular-items">
                        <a href="/" className="popular-item">
                            <span className="num">01</span>
                            <div className="img-box"><img className="img" src="img/와인1.png"></img></div>
                            <p className="item-name">멕스 리제르바 카베르네소비뇽</p>
                        </a>
                        <a href="/" className="popular-item">
                            <span className="num">02</span>
                            <div className="img-box"><img className="img" src="img/와인2.png"></img></div>
                            <p className="item-name">글로리오소 리오하 레세르바</p>
                        </a>
                        <a href="/" className="popular-item">
                            <span className="num">03</span>
                            <div className="img-box"><img className="img" src="img/와인3.png"></img></div>
                            <p className="item-name">마틴 레이 소노마 나파 카운티</p>
                        </a>
                        <a href="/" className="popular-item">
                            <span className="num">04</span>
                            <div className="img-box"><img className="img" src="img/와인4.png"></img></div>
                            <p className="item-name">포 버튜스 버번 배럴 에이지드</p>
                        </a>
                        <a href="/" className="popular-item">
                            <span className="num">05</span>
                            <div className="img-box"><img className="img" src="img/와인5.png"></img></div>
                            <p className="item-name">헌드레드에이커 레이스</p>
                        </a>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인5.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">헌드레드에이커</p>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인1.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">멕스 리제르바</p>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인2.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">글로리오소</p>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인3.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">마틴 레이소노마</p>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인4.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">포 버튜스 버번</p>
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
                            <li className="recommend-item">
                                <a className="left" href="/">
                                    <img className="recommend-img" src="img/와인5.png"></img>
                                </a>
                                <div className="right">
                                    <div className="explain-box">
                                        <p className="recommend-item-name">헌드레드에이커</p>
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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;