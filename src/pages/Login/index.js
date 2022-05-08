import React,  { useState }  from "react";
import "./Login.scss";

const Login = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleClick = (e) => {
        alert("로그인이 되었습니다.");
    };
    return (
        <div className="login">
            <div className="logo">            
                <h2>취향저격이쥬</h2>
            </div>
            <div className="login_box">
                <div className="name">
                        아이디
                </div>
                <div className="input">
                    <input
                        type="text"
                        id ="input_id"
                        name="input_id" 
                        value={inputId}
                        placeholder="ID"
                        onChange={(e) => {
                            setInputId(e.target.value)
                        }}/>
                </div>
                <div className="name">
                        비밀번호
                </div>
                <div className="input">
                    <input 
                        type="password"
                        id= "input_pw" 
                        name="input_pw" 
                        value={inputPw}
                        placeholder = "Password"
                        onChange={(e) => {
                            setInputPw(e.target.value)
                        }}/>
                </div>
            </div>
            <div className="button">
                <button onClick={handleClick} id="login_button">로그인</button>
            </div>
            <div className="find">
            <span>
                    <a href="/" className="find_id">아이디 찾기</a>
                    |
                    <a href="/" className="find_pw">비밀번호 찾기</a>
                    |
                    <a href="/" className="join">회원가입</a>
                </span>
            </div>
        </div>
    )
}

export default Login;