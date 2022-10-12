import React from "react";
import { useNavigate } from 'react-router-dom';
import './Teststart.scss';

const Teststart = () => {
    const navigate = useNavigate();

    return (
        <div className="teststart-area">
            <div className="teststart-container">
                <h2 className="teststart-main-title">테스트로 알아보는<br/>술 취향</h2>
                <p className="teststart-sub-title">절대적인 기준은 아니지만 추천에는<br/>도움이 될 거에요</p>
                <dir className="teststart-img-area">
                    <img className="teststart-img" src="./img/Tipsy_teststart_img.png" alt="glasses_img" />
                </dir>
                <div className="teststart-btn-area">
                    <button className="teststart-btn pointer" onClick={() => navigate('/test')}>시작</button>
                </div>
            </div>
        </div>
    )
};

export default Teststart;