import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import './Home.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

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
                <FontAwesomeIcon 
                    className="btn-scroll-down pointer ani-bounce" 
                    icon={faAngleDown} 
                    onClick={() => sectionRef.current.scrollIntoView({behavior: 'smooth'})} />
            </div>
            <div className="section" ref={sectionRef} >
                <div className="section-ment">
                    멘트1<br/>
                    멘트2<br/>
                    멘트3<br/>
                </div>
            </div>
            <div className="section" >
                <div className="section-ment">
                    멘트1<br/>
                    멘트2<br/>
                    멘트3<br/>
                </div>
                <div className="section-nav-btn">
                    <button className="section-to-test pointer" onClick={() => navigate('/testguide')}>테스트 하러가기</button>
                </div>
            </div>
        </>
    )
};

export default Home;