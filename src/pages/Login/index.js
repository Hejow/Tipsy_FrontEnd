import React,  { useState }  from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    let naviagte = useNavigate();

    return (
        <div className="login-area">
            <div className="login-title">로그인</div>
            <form className="login-box">
                <div className="input-type">아이디</div>
                <div className="input-content">
                    <input
                        type="text"
                        name='id'
                        value={inputId}
                        placeholder="ID"
                        onChange={(e) => {
                            setInputId(e.target.value)
                        }}/>
                </div>
                <div className="input-type">비밀번호</div>
                <div className="input-content">
                    <input 
                        type="password"
                        name='password'
                        value={inputPw}
                        placeholder = "Password"
                        onChange={(e) => {
                            setInputPw(e.target.value)
                        }}/>
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