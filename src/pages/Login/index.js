import React,  { useState }  from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { firestore } from '../../firebase';

const Login = () => {
    const user_info = firestore.collection('user_info');
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
        
        user_info.doc(inputs.id).get()
        .then( info => {
            if (info.exists) {
                const data = info.data();
                if( inputs.id === data.id && inputs.password === data.password) {
                    naviagte('/');
                    const user_data = JSON.stringify(data);
                    localStorage.setItem('user', user_data);
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
                <p className="pointer" onClick={() => naviagte('/login')}>아이디 찾기</p>
                <p className="pointer" onClick={() => naviagte('/login')}>비밀번호 찾기</p>
            </div>
        </div>
    )
}

export default Login;