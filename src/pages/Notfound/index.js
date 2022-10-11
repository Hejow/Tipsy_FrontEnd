import React from "react";
import { useNavigate } from "react-router-dom";
import './Notfound.scss'

const Notfound = () => {
    const navigate = useNavigate();
    return (
        <div className="notfound-area">
            <div className="notfound-container">
                <h2>4<span>0</span>4</h2>
                <div className="notfound-ment-area">
                    <span className="notfound-oops">Oops!</span>
                    <span className="notfound-ment">잘못된 경로로 접속하셨어요!</span>
                </div>
                <div className="notfound-btn-area">
                    <button className="notfound-btn pointer" onClick={() => {navigate('/')}}>홈으로 이동</button>
                </div>
            </div>
        </div>
    )
};

export default Notfound;