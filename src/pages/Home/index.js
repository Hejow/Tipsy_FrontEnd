import React from "react";
import './Home.scss';

const Home = () => {

    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/wine.png)`}}
            className='main-section bg'>
            <div className="main-ment ">
                지금 마시는 술<br/>
                정말로 당신의<br/>
                취향인가요?
            </div>
        </div>
    )
};

export default Home;