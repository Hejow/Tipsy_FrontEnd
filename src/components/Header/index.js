import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

const Header = () => {
    const [scroll, setScroll] = useState({
        y: 0,
        active: false
    });

    const menu = [ 
        { title : '알아보기', location: '/' },
        { title : '추천받기', location: '/' },
        { title : '찾아보기', location: '/' },
    ];

    const location = useLocation();

    const handleScroll = () => {
        scroll.y > 19 ? setScroll({
            y: window.pageYOffset, 
            active: true
        }) : setScroll({
            y: window.pageYOffset, 
            active: false
        })
    };
    
    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div className={
            location.pathname === '/' ? 
            (scroll.active ? 'header-area' : 'header-area ch-color') :
            'header-area'
        }>
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