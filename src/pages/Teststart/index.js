import React from "react";
import { useNavigate } from 'react-router-dom';
import './Teststart.scss';

const Teststart = () => {
    const navigate = useNavigate();

    return (
        <div className="teststart-area">
            <div className="teststart-container">
                <div className="teststart-ment">
                    테스트로<br/>
                    알아보는<br/>
                    술 취향!
                </div>
                <div className="teststart-tested">지금까지 <span>19,958</span>명이 자기 취향을 알아봤어요</div>
                <button className="teststart-start-btn pointer" onClick={() => navigate('/test')}>시 작</button>
                <div className="teststart-notice">&#8251; 절대적인 기준은 아니지만 추천에는 도움이 될거에요. &#8251;</div>
            </div>
        </div>
    )
};

export default Teststart;