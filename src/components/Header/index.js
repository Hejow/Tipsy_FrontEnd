import React, {useState, useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

const Header = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const menu = [ 
        { title : '알아보기', location: '/test' },
        { title : '추천받기', location: '/' },
        { title : '찾아보기', location: '/findshop' },
    ];

    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.pageYOffset > 20 ?
            setIsScroll(true) : setIsScroll(false)
        });
    }, [isScroll]);
    
    return (
        <div className={
            location.pathname === '/' ? 
            (isScroll ? 'header-area' : 'header-area style-ch') :
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