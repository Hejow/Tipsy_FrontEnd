import React, {useState, useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

const Header = () => {
    let navigate = useNavigate();
    const [scroll, setScroll] = useState({
        y: 0,
        active: false
    });

    const menu = [ 
        { title : '알아보기', location: '/test' },
        { title : '추천받기', location: '/' },
        { title : '찾아보기', location: '/findshop' },
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
                    <li className='pointer' key={title} onClick={() => navigate(`${location}`)}>{title}</li>
                ))}
            </ul>
            <div className="header-title pointer" onClick={() => navigate('/')}>취향저격이쥬?</div>
            <div className="my-profile">
                <div className="login pointer" onClick={() => navigate('/login')}><FontAwesomeIcon icon={faUser} /></div>
                <div className="cart pointer"><FontAwesomeIcon icon={faCartShopping} /></div>
            </div>
        </div>
    )
}

export default Header;