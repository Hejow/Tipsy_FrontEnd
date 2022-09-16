import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navMenu = [ 
        { title : '알아보기', location: '/testguide' },
        { title : '추천받기', location: '/recommend' },
        { title : '찾아보기', location: '/findshop' },
    ];

    const [isScroll, setIsScroll] = useState(false);
    const [logOn, setLogon] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.pageYOffset > 20 ?
            setIsScroll(true) : setIsScroll(false)
        });
    }, [isScroll]);

    useEffect(() => {
        window.localStorage.length !== 0 ? 
        setLogon(true) : setLogon(false);
    }, [location]);

    const logOut = () => {
        localStorage.clear();
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.location.reload();
        }
    };
    
    return (
        <div className={
            location.pathname === '/' ? 
            (isScroll ? 'header-area' : 'header-area style-ch') :
            'header-area'
        }>
            <div className="header-content-area">
                <ul className="header-menu-area">
                    {navMenu.map(({title, location}) => (
                        <li className='pointer' key={title} onClick={() => navigate(`${location}`)}>{title}</li>
                    ))}
                </ul>
                <div className="header-title pointer" onClick={() => navigate('/')}>취향저격이酒</div>
                <div className="header-my-menu-area">
                    <div className="pointer" onClick={() => logOn ? navigate('/mypage') : navigate('/login')}><FontAwesomeIcon icon={faUser} /></div>
                    <div className={logOn ? "pointer" : "pointer hide"}  onClick={logOut}><FontAwesomeIcon icon={faArrowRightFromBracket}/></div>
                    <div className="pointer" onClick={() => navigate('/')}><FontAwesomeIcon icon={faCartShopping} /></div>
                </div>
            </div>
        </div>
    )
}

export default Header;