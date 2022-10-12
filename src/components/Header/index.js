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

    const [login, setLogin] = useState(false);

    useEffect(() => {
        window.sessionStorage.length !== 0 ? 
        setLogin(true) : setLogin(false);
    }, [location]);

    const logOut = () => {
        sessionStorage.clear();
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.location.reload();
        }
    };
    
    return (
        <div className='header-area'>
            <div className="header-content-area">
                <div className="header-logo-area">
                    <img className="header-logo pointer"
                        src="img/Tipsy_Logo.png"
                        alt="Logo"
                        onClick={() => navigate('/')}
                        />
                </div>
                <ul className="header-menu-area">
                    {navMenu.map(({title, location}) => (
                        <li className='pointer' key={title} onClick={() => navigate(`${location}`)}>{title}</li>
                    ))}
                </ul>
                <div className="header-my-menu-area">
                    <div className="pointer" onClick={() => login ? navigate('/mypage') : navigate('/login')}><FontAwesomeIcon icon={faUser} /></div>
                    <div className={login ? "pointer" : "pointer hide"}  onClick={logOut}><FontAwesomeIcon icon={faArrowRightFromBracket}/></div>
                    <div className="pointer" onClick={() => navigate('/')}><FontAwesomeIcon icon={faCartShopping} /></div>
                </div>
            </div>
        </div>
    )
}

export default Header;