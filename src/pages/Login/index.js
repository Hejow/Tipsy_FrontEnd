import React,  { useState }  from "react";
import "./Login.scss";

const Login = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        alert("로그인이 되었습니다.");
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
                <button type='submit'>로그인</button>
            </form>
            <div className="find-area">
                <p><a href="/">아이디 찾기</a></p>
                <p><a href="/">비밀번호 찾기</a></p>
                <p><a href="/">회원가입</a></p>
            </div>
        </div>
    )
}

export default Login;