import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { db } from '../../firebase';
import { setDoc, getDoc, doc } from "firebase/firestore";

const Signup = () => {
    const years = Array.from({length: 2003-1900}, (v, i) => 2003-i);
    const months = Array.from({length: 12}, (v, i) => i+1);
    const days = [
        Array.from({length:31}, (v,i) => i+1),
        Array.from({length:30}, (v,i) => i+1),
        Array.from({length:28}, (v,i) => i+1)        
    ];
    
    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        re_password: '',
        name: '',
        phoneNumber: '',
        year: '',
        month: '',
        day: '',
        sex: ''
    });
    const [isPropsOk, setisPropsOk] = useState({
        id: true,
        password: true,
        re_password: true,
        phoneNumber: true,
        id_check: false,
    });

    const { id, password, re_password, name, phoneNumber, year, month, day } = inputs;

    const navigate= useNavigate();

    const CreateUser = (e) => {
        e.preventDefault();
        const user_data = {
            id: '', 
            password: '', 
            name: '', 
            phoneNumber: '',
            year: '', 
            month: '', 
            day: '', 
            sex: ''
        };

        if ( isPropsOk.id_check && isPropsOk.id && isPropsOk.password && isPropsOk.phoneNumber && inputs.name !== '' && inputs.year !== '' && inputs.month !== '' && inputs.day !== '' && inputs.sex !== '') {
            for (let key of Object.keys(user_data)) {
                user_data[key] = e.target[key].value;
            }
                        
            try {
                setDoc(doc(db, "user_info", user_data.id), {
                    ...user_data,
                    type: 'null',
                    role: 'normal'
                }).then(doc => doc.exists())

                window.alert("회원가입이 완료되었습니다!!\n로그인 페이지로 이동합니다.");
                navigate('/login');
            } catch(e) {
                window.alert("Error가 발생하였습니다. \n다시 시도해주세요.");
            }
        } else {
            window.alert("빈 입력이 있습니다! \n다시 시도해주세요.");
        }
    };

    const isAvailable_id = () => {
        getDoc(doc(db, "user_info", inputs.id)).then(doc => {
            if (doc.exists()) {
                setisPropsOk({
                    ...isPropsOk,
                    id: false,
                    id_check: false
                });
            } else {
                setisPropsOk({
                    ...isPropsOk,
                    id: true,
                    id_check: true
                });
            };
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

    const onIdChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
        setisPropsOk({
            ...isPropsOk,
            id_check: false
        })
    }

    let selected_month = ( inputs.month === '2' ) ? 2 :
    ( [4,6,9,11].includes(parseInt(inputs.month)) ? 1 : 0);

    return (
        <div className="signup-area">
            <main className="signup-container">
                <h2 className="signup-title">회원가입</h2>
                <form  onSubmit={CreateUser}>
                    <div className="signup-row">
                        <div className="signup-type">아이디</div>
                        <div className={
                            inputs.id === '' ? 'signup-input-area' : 
                            (isPropsOk.id ? ('signup-id-check-ok') : 'signup-input-err')
                        }>
                            <input 
                                name="id" 
                                value={id} 
                                onChange={onIdChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.placeholder='ID';
                                    } else {
                                        isAvailable_id()
                                    }
                                }}
                                placeholder='ID'
                                className="signup-input"
                                type="text" 
                                maxLength="20"
                            />
                            <span className={isPropsOk.id_check ? 'signup-check-ok' : 'hide'}><FontAwesomeIcon icon={faCheck} /></span>
                        </div>
                        <p className={ inputs.id === '' ? 'hide' : 
                            (isPropsOk.id ? ('hide') : 'signup-err-msg')
                        }>
                            이미 사용 중인 아이디입니다!
                        </p>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호</div>
                        <div className={
                            inputs.password === '' ? 'signup-input-area' : 
                            (isPropsOk.password ? ('signup-input-area') : 'signup-input-err')
                        }>
                            <input 
                                name="password" 
                                value={password} 
                                onChange={onChange}
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.placeholder='비밀번호 (8~32자리)'
                                    } else if  (e.target.value.length < 8 || e.target.value.length > 32) {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: false
                                        });
                                    } else {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: true
                                        });
                                    };
                                }}
                                placeholder="비밀번호 (8~32자리)"
                                className="signup-input" 
                                type="password" />
                        </div>
                        <p className={ inputs.password === '' ? 'hide' : 
                            (isPropsOk.password ? 'hide' : 'signup-err-msg')
                        }>
                            8~32자리의 비밀번호를 입력해주세요!                                
                        </p>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호 재확인</div>
                        <div className={
                            inputs.re_password === '' ? 'signup-input-area' : 
                            (isPropsOk.re_password ? 'signup-input-area' : 'signup-input-err')
                        }>
                            <input 
                                name="re_password" 
                                value={re_password} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.placeholder="비밀번호 재확인";
                                    } else if ( inputs.password !== e.target.value ) {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: false
                                        });
                                    } else {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: true
                                        });
                                    };
                                }}
                                placeholder="비밀번호 재확인"
                                className="signup-input" 
                                type="password" />
                        </div>
                        <p className={ inputs.re_password === '' ? 'hide' : 
                            (isPropsOk.re_password ? 'hide' : 'signup-err-msg')
                        }>
                            비밀번호가 일치하지 않습니다!
                        </p>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">이름</div>
                        <div className="signup-input-area">
                            <input 
                                name="name" 
                                value={name} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e)=> e.target.placeholder="이름"}
                                placeholder="이름"
                                className="signup-input" 
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">연락처</div>
                        <div className={
                            inputs.phoneNumber === '' ? 'signup-input-area' : 
                            (isPropsOk.phoneNumber ? 'signup-input-area' : 'signup-input-err')
                        }>
                            <input 
                                name="phoneNumber" 
                                value={phoneNumber} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.placeholder="연락처 (\"-\" 빼고 입력)";
                                    } else if ( e.target.value.length !== 11 ) {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: false
                                        });
                                    } else {
                                        setisPropsOk({
                                            ...isPropsOk,
                                            [e.target.name]: true
                                        });
                                    };
                                }}
                                placeholder= "연락처 (&quot;-&quot; 빼고 입력)"
                                className="signup-input" 
                                type="number"
                            />
                        </div>
                        <p className={ inputs.phoneNumber === '' ? 'hide' : 
                            (isPropsOk.phoneNumber ? 'hide' : 'signup-err-msg')
                        }>
                            올바른 번호가 아닙니다!
                        </p>
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
                                <input 
                                    className="signup-radio" 
                                    type="radio"    
                                    name='sex' 
                                    value='male' 
                                    onChange={onChange}/>
                                남성
                            </div>
                            <div className="signup-radio-box">
                                <input 
                                    className="signup-radio" 
                                    type="radio" 
                                    name='sex' 
                                    value='female' 
                                    onChange={onChange}/>
                                여성
                            </div>
                        </div>
                    </div>
                    <div className="signup-btn-area">
                        <button 
                            className={ "signup-btn pointer" }
                            type="submit">회원가입</button>
                    </div>
                </form>
            </main>
        </div>
    )
};

export default Signup;