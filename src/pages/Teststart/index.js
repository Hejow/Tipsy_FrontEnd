import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Teststart.scss';
import { db } from '../../firebase';
import { getDoc, doc, updateDoc } from "firebase/firestore";

const Teststart = () => {
    const [tested, setTested] = useState(null);
    const navigate = useNavigate();
    
    const getTestUserCount = async () => {
        try {
            const dbData = await getDoc(doc(db, 'appData', 'testUserCount'));
            setTested(dbData.data().count);
        } catch(e) {
            window.alert('Error : 서버에 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const testedUserIncrease = async () => {
        try {
            const docRef = doc(db, 'appData', 'testUserCount');
            await updateDoc(docRef, {
                count: tested + 1
            });
        } catch (e) {
            window.alert('Error : 서버에 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        getTestUserCount();
    }, [])

    return (
        <div className="teststart-area">
            <div className="teststart-container">
                <div className="teststart-ment">
                    테스트로<br/>
                    알아보는<br/>
                    술 취향!
                </div>
                <div className="teststart-tested">지금까지 <span>{tested}</span> 명이 자기 취향을 알아봤어요</div>
                <button className="teststart-start-btn pointer" onClick={() => {
                    testedUserIncrease();
                    navigate('/test');
                }}>시 작</button>
                <div className="teststart-notice">&#8251; 절대적인 기준은 아니지만 추천에는 도움이 될거에요. &#8251;</div>
            </div>
        </div>
    )
};

export default Teststart;