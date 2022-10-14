import React,  { useState }  from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { db } from '../../firebase';
import { getDoc, doc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const Login = () => {
    const naviagte = useNavigate();
    const [inputs, setInputs] = useState({
        id: '',
        password: ''        
    });

    const {id, password} = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

    const userLogin = (e) => {
        e.preventDefault();

        getDoc(doc(db, "user_info", inputs.id))
        .then( info => {
            if (info.exists()) {
                const dbData = info.data();
                if( inputs.id === dbData.id && inputs.password === dbData.password) {
                    const token = CryptoJS.AES.encrypt(JSON.stringify(dbData), process.env.REACT_APP_SECRET_KEY).toString();
                    window.sessionStorage.setItem('TIPSY', token);
                    naviagte('/');
                } else {
                    window.alert('아이디 또는 비밀번호를 확인하세요!!');
                }
            } else {
                window.alert('해당 아이디가 존재하지 않습니다!!');
            }
        })
    };

    return (
        <div className="login-area">
            <div className="login-title">로그인</div>
            <form className="login-box" onSubmit={userLogin}>
                <div className="input-type">아이디</div>
                <div className="input-content">
                    <input
                        type="text"
                        name='id'
                        value={id}
                        placeholder="ID"
                        onChange={onChange}/>
                </div>
                <div className="input-type">비밀번호</div>
                <div className="input-content">
                    <input 
                        type="password"
                        name='password'
                        value={password}
                        placeholder = "Password"
                        onChange={onChange}/>
                </div>
                <button type='submit'>로그인</button>
            </form>
            <div className="find-area">
                <p className="pointer" onClick={() => naviagte('/signup')}>회원가입</p>
                <p className="pointer" onClick={() => naviagte('/finduser')}>아이디 찾기</p>
                <p className="pointer" onClick={() => naviagte('/findpassword')}>비밀번호 찾기</p>
            </div>
        </div>
    )
}

export default Login;