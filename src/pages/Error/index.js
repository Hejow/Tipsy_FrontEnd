import React from "react";
import { useNavigate } from "react-router-dom";
import './Error.scss'

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="error-area">
            <div className="error-container">
                <h2>4<span>0</span>4</h2>
                <div className="error-ment-area">
                    <span className="error-oops">Oops!</span>
                    <span className="error-ment">잘못된 경로로 접속하셨어요!</span>
                </div>
                <div className="error-btn-area">
                    <button className="error-btn pointer" onClick={() => {navigate('/')}}>홈으로 이동</button>
                </div>
            </div>
        </div>
    )
};

export default Error;