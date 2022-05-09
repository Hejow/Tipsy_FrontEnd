import React from "react";
import './Home.scss';

const Wrapper = ({ img, children }) => {
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${img})`}}
            className='main-section bg'>
            {children}
        </div>
    )
};

const Home = () => {
    const imgs = [
        '/img/wine.png',
    ];

    return (
        <Wrapper img={imgs[0]}>
            <div className="main-ment ">
                지금 마시는 술<br/>
                정말로 당신의<br/>
                취향인가요?
            </div>
        </Wrapper>
    )
};

export default Home;