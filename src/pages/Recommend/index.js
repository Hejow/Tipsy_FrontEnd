import React from 'react'
import "./Recommend.scss";

const Recommend = () => {
    return(
        <div className="recommend-area">
            <div className="recommend-container">
                <div className="nav">
                    <div>
                        <ul className="nav-list">
                            <li className="list-row">칵테일</li>
                            <li className="list-row">위스키</li>
                            <li className="list-row">와인</li>
                        </ul>
                    </div>
                </div>
                <div className="content-container">
                    <div className="ranking">
                        <img className="rankImage" alt="rankImage" src="img/rank1.jpg"/>
                    </div>
                    <div className="filter">
                        필터
                    </div>
                    <div className="list">
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>
                        <div className="list-item">
                            <div className="img-area">image</div>
                            <div className="information">information</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;