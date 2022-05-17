import { React,  } from "react";
import './Signup.scss';

const Signup = () => {
    return (
        <div className="signup-area">
            <main className="signup-container">
                <h2 className="signup-title">회원가입</h2>
                <form>
                    <div className="signup-row">
                        <div className="signup-type">아이디</div>
                        <div className="signup-input-area">
                            <input className="signup-input" type="text" maxLength="20" placeholder="ID"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호</div>
                        <div className="signup-input-area">
                            <input className="signup-input" type="password" placeholder="비밀번호 (8~32자리)"/>
                            <span className="util">유틸</span>
                        </div>
                        <div className="signup-type">비밀번호 재확인</div>
                        <div className="signup-input-area">
                            <input className="signup-input" type="password" placeholder="비밀번호 재확인"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">이름</div>
                        <div className="signup-input-area">
                            <input className="signup-input" type="text" placeholder="이름"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">생일</div>
                        <div className="signup-input-area">
                            <select name="year">
                                <option value="">연도</option>
                                <option value="">연</option>
                            </select>
                            <select name="month">
                                <option value="">월</option>
                                <option value="">월</option>
                            </select>
                            <select name="day">
                                <option value="">일</option>
                                <option value="">일</option>
                            </select>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">성별</div>
                        <div className="signup-radio-area">
                            <div className="signup-radio-box">
                                <input className="signup-radio" type="radio" name='gender' value='male'/>
                                남성
                            </div>
                            <div className="signup-radio-box">
                                <input className="signup-radio" type="radio" name='gender' value='female'/>
                                여성
                            </div>
                        </div>
                    </div>
                    <div className="signup-btn">
                        <button type="button">회원가입하기</button>
                    </div>
                </form>
            </main>
        </div>
    )
};

export default Signup;