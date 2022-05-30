import React,  { useState }  from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    let naviagte = useNavigate();
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

    return (
        <div className="login-area">
            <div className="login-title">로그인</div>
            <form className="login-box">
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
                <button type='button'>로그인</button>
            </form>
            <div className="find-area">
                <p className="pointer" onClick={() => naviagte('/signup')}>회원가입</p>
                <p className="pointer" onClick={() => naviagte('/login')}>아이디 찾기</p>
                <p className="pointer" onClick={() => naviagte('/login')}>비밀번호 찾기</p>
            </div>
        </div>
    )
}

export default Login;