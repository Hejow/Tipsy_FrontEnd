import React from "react";
import "./Test.scss";
import { Question } from '../../components';

const Test = () => {
    const question_list = [
        {
            title: '오늘 마실 술은 어떤 맛이 좋을까??',
            options: ['술은 달아야지!', '술은 써야지!']
        },
        {
            title: '오늘 안주는 뭐 시킬까??',
            options: ['가벼운거 시키자!', '든든한거 시키자!']
        },
        {
            title: '술 마실건데 몇 명이랑 마시지??',
            options: ['다 불러서 마시자!', '한 두명만 불러!']
        }
    ];

    console.log(question_list);

    return (
        <div className="test-area">
            <div className="test-container">
                <div className="test-progress-area">
                    <div className="test-progress">
                        <div className="test-progress-bar" ></div>
                    </div>
                </div>
                <Question list={question_list[0]}/>
            </div>
        </div>
    );
};

export default Test;