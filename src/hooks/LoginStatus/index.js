import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginStatus = () => {
    const [login, setLogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.sessionStorage.length !== 0 ? 
        setLogin(true) : setLogin(false);
    }, [location]);
    
    useEffect(() => {
        if (login) {
            const interval = setInterval(() => {
                window.sessionStorage.clear();
                setLogin(false);
                window.alert('토큰이 만료되었습니다.\n홈으로 이동합니다.');
                if (location.pathname !== '/') navigate('/');
                else window.location.reload();
            }, 1800000);
            return () => { clearInterval(interval); };
        };
    }, [login, navigate, location.pathname]);
};

export default LoginStatus;