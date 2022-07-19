import React from 'react'
import "./Recommend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

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
                    <div className="slider-wrap">
                        <ul className="list-slider" id="slider">
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/red.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/orange.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/yellow.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/green.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/blue.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/indigo.jpeg"/>
                            </li>
                            <li>
                                <img className="rankImage" alt="rankImage" src="img/violet.jpeg"/>
                            </li>
                        </ul>
                    <div className="btn previous" id="previous"><FontAwesomeIcon icon={faAngleLeft} /></div>
                    <div className="btn next" id="next"><FontAwesomeIcon icon={faAngleRight} /></div>
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