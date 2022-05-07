import React from "react";
import './Header.scss'

const Header = () => {
    const menu = [ 
        { title : '메뉴1', location: '/' },
        { title : '메뉴2', location: '/' },
        { title : '메뉴3', location: '/' },
    ];

    return (
        <div className="header-area">
            <ul className="menu">
                {menu.map(({title, location}) => (
                    <li key={title}><a href={location}>{title}</a></li>
                ))}
            </ul>
            <div className="title"><a href="/">취향저격이쥬?</a></div>
            <div className="login"><a href="/">로그인</a></div>
        </div>
    )
}

export default Header;