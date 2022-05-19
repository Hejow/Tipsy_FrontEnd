import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    let navigate = useNavigate();
    return (
        <>
            <div style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/wine.png)`}}
                className='main-section bg'>
                <div className="main-ment ani-mv">
                    지금 마시는 술<br/>
                    정말로 당신의<br/>
                    취향인가요?
                </div>
                <FontAwesomeIcon className="btn-scroll-down pointer ani-bounce" icon={faAngleDown} />
            </div>
            <div className="section">
                <div className="section1-ment">
                    <p>술이 쓰기만 한가요?</p>
                    <p>남보다 빨리 취하나요?</p>
                    <p>이제는 자신에게 맞는 술을 찾아보세요!</p>
                </div>
                <div className="section1-nav-btn">
                    <button className="section1-to-test pointer" onClick={() => navigate('/test')}>테스트 하러가기</button>
                </div>
            </div>
        </>
    )
};

export default Home;