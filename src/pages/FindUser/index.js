import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './FindUser.scss'
import { db } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const FindUser = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [onSubmit, setOnSubmit] = useState(false);
    const [input, setInput] = useState({
        name: '',
        phoneNumber: '',
    });

    const onChange = (e) => {
        const { name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        });
    };

    const {name, phoneNumber } = input;

    const findId = (e) => {
        e.preventDefault();

        if (input.name !== '' && input.phoneNumber !== '') {
            const q = query(collection(db, "user_info"), where("name", "==", input.name));
            getDocs(q).then(snapShot => {
                if (snapShot.empty) {
                    window.alert("입력하신 정보와 일치하는 아이디를 찾을 수 없습니다.");
                    window.location.reload();
                } else {
                    snapShot.docs.forEach(doc => {
                        if (doc.data().phoneNumber === input.phoneNumber) {
                            setUserId(doc.data().id);
                            setOnSubmit(true);
                        }
                    })
                }
            })
        } else {
            window.alert("빈 입력이 있습니다.\n다시 시도해주세요.")
        }
    }

    return (
        <div className="finduser-area">
            <div className="finduser-container">
                <div className="finduser-tab-area">
                    <p className="finduser-tab pointer tab-selected"
                        id="id"
                        onClick={() => window.location.reload()}
                        >아이디 찾기</p>
                    <p className="finduser-tab pointer"
                        id="password"
                        onClick={() => {navigate("/findpassword")}}
                        >비밀번호 찾기</p>
                </div>
                <div className="finduser-content-area">
                    <h2 className="finduser-title">아이디 찾기</h2>
                    <p className={onSubmit ? "hide" : "finduser-guide"}
                        >회원가입 시 입력한 이름과 연락처로 찾아드립니다</p>
                    <form className={onSubmit ? "hide" : "finduser-input-area"}
                        onSubmit={findId}
                        >
                        <div className="finduser-row">
                            <p className="finduser-type">이름</p>
                            <div className="finduser-input-box">
                                <input className="finduser-input"
                                    name="name"
                                    value={name}
                                    onFocus={(e) => e.target.placeholder=""}
                                    onBlur={(e) => {
                                        if (e.target.value === "") {
                                            e.target.placeholder="이름";
                                        }
                                    }}
                                    onChange={onChange}
                                    placeholder="이름"
                                    type="text" />
                            </div>
                        </div>
                        <div className="finduser-row">
                            <p className="finduser-type">연락처</p>
                            <div className="finduser-input-box">
                                <input className="finduser-input" 
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onFocus={(e) => e.target.placeholder=""}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            e.target.placeholder="연락처 ( \" - \" 빼고 입력)";
                                        }
                                    }}
                                    onChange={onChange}
                                    placeholder= "연락처 ( &quot; - &quot; 빼고 입력)"
                                    type="number" />
                            </div>
                        </div>
                        <div className="finduser-button-area">
                            <button className="finduser-button">아이디 찾기</button>
                        </div>
                    </form>
                    <div className={onSubmit ? "finduser-result-area" : "hide"}>
                        <p className="finduser-result-ment">확인되는 아이디는 다음과 같습니다.</p><br/>
                        <p className="finduser-userid">{userId}</p>

                        <div className="finduser-result-btn">
                            <button className="finduser-button" onClick={() => {navigate("/login")}}>로그인</button>
                            <p className="pointer" onClick={() => {navigate('/findpassword')}}>비밀번호 찾기</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FindUser;