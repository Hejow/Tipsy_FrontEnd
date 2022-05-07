import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

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
            <div className="my-profile">
                <div className="login"><a href="/"><FontAwesomeIcon icon={faUser} /></a></div>
                <div className="cart"><a href="/"><FontAwesomeIcon icon={faCartShopping} /></a></div>
            </div>
        </div>
    )
}

export default Header;