import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.scss';
import { firestore } from '../../firebase';

const Signup = () => {
    const user_info = firestore.collection('user_info');
    const years = Array.from({length: 2003-1900}, (v, i) => 2003-i);
    const months = Array.from({length: 12}, (v, i) => i+1);
    const days = [
        Array.from({length:31}, (v,i) => i+1),
        Array.from({length:30}, (v,i) => i+1),
        Array.from({length:28}, (v,i) => i+1)        
    ];
    const [errmsg, setErrmsg] = useState(false);
    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        re_password: '',
        name: '',
        year: '',
        month: '',
        day: '',
        sex: ''
    });
    const [isOk, setIsOk] = useState({
        id: true,
        password: true,
        re_password: true,
        id_check: false,
    });

    const { id, password, re_password, name, year, month, day } = inputs;

    let navigate= useNavigate();

    const CreateUser = (e) => {
        e.preventDefault();
        const info = {
            id: '', 
            password: '', 
            name: '', 
            year: '', 
            month: '', 
            day: '', 
            sex: ''
        };

        if ( isOk.id_check && isOk.id ) {
            for (let key of Object.keys(info)) {
                info[key] = e.target[key].value;
            }
    
            user_info.doc(info.id).set( { ...info, type: 'null' });
            alert("회원가입이 완료되었습니다!!\n로그인 페이지로 이동합니다.");
            navigate('/login');
        } else {
            setErrmsg(true);
        }
    };

    const isAvailable_id = () => {
        user_info.doc(inputs.id).get().then(doc => {
            if (doc.exists) {
                setIsOk({
                    ...isOk,
                    id: false,
                    id_check: false
                });
            } else {
                setIsOk({
                    ...isOk,
                    id: true,
                    id_check: true
                });
            };
            setErrmsg(false);
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

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
                            errmsg ? 'signup-input-err' : 
                            (isOk.id ? "signup-input-area" : 'signup-input-err')
                        }>
                            <input 
                                name="id" 
                                value={id} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => e.target.placeholder='ID'}
                                placeholder='ID'
                                className="signup-input" 
                                type="text" 
                                maxLength="20"
                            />
                            <span 
                                className="signup-id-check pointer"
                                onClick={isAvailable_id}
                            >
                                중복확인
                            </span>
                        </div>
                        <p className={ isOk.id ? 'hide err-msg' : 'err-msg'}>
                            다른 아이디를 이용하세요!
                        </p>
                        <p className={ errmsg ? 'err-msg' : 'hide err-msg'}>
                            중복확인을 해주세요!
                        </p>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호</div>
                        <div className={
                            isOk.password ? "signup-input-area" : 'signup-input-err'
                        }>
                            <input 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    if (e.target.value.length < 8 || e.target.value.length > 32) {
                                        setIsOk({
                                            ...isOk,
                                            [e.target.name]: false
                                        });
                                    } else {
                                        setIsOk({
                                            ...isOk,
                                            [e.target.name]: true
                                        });
                                    };
                                }}
                                placeholder="비밀번호 (8~32자리)"
                                className="signup-input" 
                                type="password" />
                        </div>
                        <p className={ isOk.password ? 'hide err-msg' : 'err-msg'}>
                            8~32자리의 비밀번호를 입력해주세요!                                
                        </p>
                    </div>
                    <div className="signup-row">
                        <div className="signup-type">비밀번호 재확인</div>
                        <div className={
                            isOk.re_password ? "signup-input-area" : 'signup-input-err'
                        }>
                            <input 
                                name="re_password" 
                                value={re_password} 
                                onChange={onChange} 
                                onFocus={(e) => e.target.placeholder=''}
                                onBlur={(e) => {
                                    e.target.placeholder="비밀번호 재확인";
                                    if ( inputs.password !== e.target.value ) {
                                        setIsOk({
                                            ...isOk,
                                            [e.target.name]: false
                                        });
                                    } else {
                                        setIsOk({
                                            ...isOk,
                                            [e.target.name]: true
                                        });
                                    };
                                }}
                                placeholder="비밀번호 재확인"
                                className="signup-input" 
                                type="password" />
                        </div>
                        <p className={ isOk.re_password ? 'hide err-msg' : 'err-msg'}>비밀번호가 일치하지 않습니다!</p>
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
                            className={ (isOk.id && isOk.password && isOk.re_password ) ? "signup-btn pointer" : 'signup-btn' }
                            disabled= { (isOk.id && isOk.password && isOk.re_password ) ? false : true }
                            type="submit">회원가입</button>
                    </div>
                </form>
            </main>
        </div>
    )
};

export default Signup;