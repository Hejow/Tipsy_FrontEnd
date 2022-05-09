import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

const Header = () => {
    const menu = [ 
        { title : '알아보기', location: '/' },
        { title : '추천받기', location: '/' },
        { title : '찾아보기', location: '/' },
    ];

    return (
        <div className="header-area">
            <ul className="nav-menu">
                {menu.map(({title, location}) => (
                    <li key={title}><a href={location}>{title}</a></li>
                ))}
            </ul>
            <div className="header-title"><a href="/">취향저격이쥬?</a></div>
            <div className="my-profile">
                <div className="login"><a href="/login"><FontAwesomeIcon icon={faUser} /></a></div>
                <div className="cart"><a href="/"><FontAwesomeIcon icon={faCartShopping} /></a></div>
            </div>
        </div>
    )
}

export default Header;