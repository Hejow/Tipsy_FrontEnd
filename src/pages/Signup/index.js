import { React, useState } from "react";
import './Signup.scss';

const Signup = () => {
    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        re_password: '',
        name: '',
        year: '',
        month: '',
        day: '',
        sex: ''
    })

    const { id, password, re_password, name, year, month, day } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

    let selected_month = inputs.month === '2' ? 2 :
    ( [4,6,9,11].includes(parseInt(inputs.month)) ? 1 : 0);

    const years = Array.from({length: 2003-1900}, (v, i) => 2003-i);
    const months = Array.from({length: 12}, (v, i) => i+1);
    const days = [
        Array.from({length:31}, (v,i) => i+1),
        Array.from({length:30}, (v,i) => i+1),
        Array.from({length:28}, (v,i) => i+1)        
    ];

    return (
        <div className="signup-area">
            <main className="signup-container">
                <h2 className="signup-title">회원가입</h2>
                <form>
                    <div className="signup-row">
                        <div className="signup-type">아이디</div>
                        <div className="signup-input-area">
                            <input name="id" value={id} onChange={onChange} className="signup-input" type="text" maxLength="20" placeholder="ID"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호</div>
                        <div className="signup-input-area">
                            <input name="password" value={password} onChange={onChange} className="signup-input" type="password" placeholder="비밀번호 (8~32자리)"/>
                            <span className="util">유틸</span>
                        </div>
                        <div className="signup-type">비밀번호 재확인</div>
                        <div className="signup-input-area">
                            <input name="re_password" value={re_password} onChange={onChange} className="signup-input" type="password" placeholder="비밀번호 재확인"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">이름</div>
                        <div className="signup-input-area">
                            <input name="name" value={name} onChange={onChange} className="signup-input" type="text" placeholder="이름"/>
                            <span className="util">유틸</span>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">생일</div>
                        <div className="signup-input-area">
                            <select name="year" value={year} onChange={onChange}>
                                <option value="">연도</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <select name="month" value={month} onChange={onChange}>
                                <option value="">월</option>
                                {months.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                            <select name="day" value={day} onChange={onChange}>
                                <option value="">일</option>
                                {days[selected_month].map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">성별</div>
                        <div className="signup-radio-area">
                            <div className="signup-radio-box">
                                <input className="signup-radio" type="radio" name='sex' value='male' onChange={onChange}/>
                                남성
                            </div>
                            <div className="signup-radio-box">
                                <input className="signup-radio" type="radio" name='sex' value='female' onChange={onChange}/>
                                여성
                            </div>
                        </div>
                    </div>
                    <div className="signup-btn">
                        <button className="pointer" type="button">회원가입하기</button>
                    </div>
                </form>
            </main>
        </div>
    )
};

export default Signup;