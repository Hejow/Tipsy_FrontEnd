import React from 'react'
import "./Recommend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const Recommend = () => {
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
                        {/* <div className="right-box">
                            <div className="search-box">
                                <button></button>
                                <input type="text" placeholder="검색하세요"></input>
                            </div>
                            <div className="filter">
                                <select>
                                    <option>도수 순</option>
                                    <option>조회 순</option>
                                    <option>최신 순</option>
                                </select>
                            </div>
                        </div> */}
                    </div>
                    <div>
                        <ul className="recommend-items">
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img className="recommend-img" src="img/와인5.png"></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                            <li className="recommend-item">
                                <a href="/">
                                    <div>
                                        <img></img>
                                        <p></p>
                                    </div>
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;