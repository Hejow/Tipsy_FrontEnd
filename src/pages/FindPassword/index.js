import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../FindUser/FindUser.scss';
import { db } from '../../firebase';
import { getDoc, updateDoc, doc } from "firebase/firestore";

const FindPassword = () => {
    const navigate = useNavigate();
    const [onSubmit, setOnSubmit] = useState(false);
    const [input, setInput] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        newPassword: '',
        reNewPassword: ''
    });

    const onChange = (e) => {
        const { name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        });
    };

    const { id, name, phoneNumber, newPassword, reNewPassword } = input;

    const authenticateUser = (e) => {
        e.preventDefault();

        if (input.id !== '' && input.name !== '' && input.phoneNumber !== '') {
            getDoc(doc(db, "user_info", input.id)).then(doc => {
                if (doc.exists()) {
                    if (doc.data().name === input.name && doc.data().phoneNumber === input.phoneNumber) {
                        setOnSubmit(true);
                    }
                } else {
                    window.alert("입력하신 정보와 일치하는 사용자를 찾을 수 없습니다.");
                    window.location.reload();
                }
            })
        } else {
            window.alert("빈 입력이 있습니다.\n다시 시도해주세요.");
        }
    }

    const resetPassword = (e) => {
        e.preventDefault();

        if (input.newPassword === input.reNewPassword && input.newPassword !== '' && input.reNewPassword !== '') {
            updateDoc(doc(db, "user_info", input.id), {
                password: input.newPassword
            }).then(() => {
                window.alert("성공적으로 변경했습니다.\n로그인 페이지로 넘어갑니다.");
                navigate('/login');
            })
        } else {
            window.alert("비밀번호가 일치하지 않습니다.");
        }
    }

    return (
        <div className="finduser-area">
            <div className="finduser-container">
                <div className="finduser-tab-area">
                    <p className="finduser-tab pointer"
                        id="password"
                        onClick={() => {navigate("/finduser")}}
                        >아이디 찾기</p>
                    <p className="finduser-tab pointer tab-selected"
                        id="id"
                        onClick={() => window.location.reload()}
                        >비밀번호 찾기</p>
                </div>
                <div className="finduser-content-area">
                    <h2 className="finduser-title">비밀번호 찾기</h2>
                    <p className={onSubmit ? "hide" : "finduser-guide"}
                        >회원가입 시 입력한 정보로 비밀번호를 재설정할 수 있습니다.</p>
                    <form className={onSubmit ? "hide" : "finduser-input-area"}
                        onSubmit={authenticateUser}
                        >
                            <div className="finduser-row">
                            <p className="finduser-type">아이디</p>
                            <div className="finduser-input-box">
                                <input className="finduser-input"
                                    name="id"
                                    value={id}
                                    onFocus={(e) => e.target.placeholder=""}
                                    onBlur={(e) => {
                                        if (e.target.value === "") {
                                            e.target.placeholder="ID";
                                        }
                                    }}
                                    onChange={onChange}
                                    placeholder="ID"
                                    type="text" />
                            </div>
                        </div>
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
                            <button className="finduser-button">비밀번호 재설정</button>
                        </div>
                    </form>
                    <form className={onSubmit ? "finduser-result-area" : "hide"}
                        style= {{textAlign: "start"}}
                        >
                        <div className="finduser-row">
                            <p className="finduser-type">신규 비밀번호</p>
                            <div className="finduser-input-box">
                                <input className="finduser-input" 
                                    name="newPassword"
                                    value={newPassword}
                                    onFocus={(e) => e.target.placeholder=""}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            e.target.placeholder="비밀번호 (8~32자리)";
                                        }
                                    }}
                                    onChange={onChange}
                                    placeholder= "비밀번호 (8~32자리)"
                                    type="password" />
                            </div>
                        </div>
                        <div className="finduser-row">
                            <p className="finduser-type">신규 비밀번호 확인</p>
                            <div className="finduser-input-box">
                                <input className="finduser-input" 
                                    name="reNewPassword"
                                    value={reNewPassword}
                                    onFocus={(e) => e.target.placeholder=""}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            e.target.placeholder="비밀번호 재확인";
                                        }
                                    }}
                                    onChange={onChange}
                                    placeholder= "비밀번호 재확인"
                                    type="password" />
                            </div>
                        </div>
                        <div className="finduser-result-btn">
                            <button className="finduser-button" onClick={resetPassword}>비밀번호 재설정</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FindPassword;