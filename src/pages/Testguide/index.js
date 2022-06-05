import React from "react";
import { useNavigate } from 'react-router-dom';
import './Testguide.scss';

const Testguide = () => {
    const navigate = useNavigate();

    return (
        <div className="testguide-area">
            <div className="testguide-container">
                <div className="testguide-ment">
                    테스트로<br/>
                    알아보는<br/>
                    술 취향!
                </div>
                <div className="testguide-tested">지금까지 <span>19,958</span>명이 자기 취향을 알아봤어요!!</div>
                <button className="testguide-start-btn pointer" onClick={() => navigate('/test')}>시 작!</button>
                <div className="testguide-notice">&#8251; 절대적인 기준은 아니지만 추천에는 도움을 줍니다!! &#8251;</div>
            </div>
        </div>
    )
};

export default Testguide;