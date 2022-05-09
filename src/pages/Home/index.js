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
            <div className="test_start"><a href="/test">START</a></div>
        </Wrapper>
    )
};

export default Home;