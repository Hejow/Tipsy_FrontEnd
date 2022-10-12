import React from "react";
import './Home.scss';

const Home = () => {

    return (
        <div className="home-area">
            <div className="home-content-area">
                <div className="home-ment-area">
                    <img className="home-title" src="img/Tipsy_Home_Title.png" alt="" />
                    <p className="home-title-ment ani-mv">지금 마시는 술,<br/>정말로 당신의 취향인가요?</p>
                </div>
                <div className="home-img-area">
                    <img className="home-img" src="img/Tipsy_Home_img.png" alt="home_images" />
                </div>
            </div>
            <div className="home-divider"></div>
        </div>
    )
};

export default Home;