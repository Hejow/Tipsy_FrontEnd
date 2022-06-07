import React, { useState } from "react";
import "./Test.scss";
import { Question } from '../../components';

const Test = () => {
    const [ prog, setProg ] = useState(0);
    
    const question_list = [
        {
            title: '술은 자고로 무슨 맛이지??',
            options: ['술은 달아야지!', '술은 써야지!']
        },
        {
            title: '술과 어울리는 향은??',
            options: ['본연의 향!', '달달한 향!']
        },
        {
            title: '오늘 안주는 뭘로 갈까??',
            options: ['가벼운거 가자!', '든든한거 가자!']
        },
        {
            title: '오늘은 몇 명이랑 마시지??',
            options: ['다 불러서 마시자!', '한 두명만 불러!']
        },
        {
            title: '어떤 분위기가 더 좋아??',
            options: ['왁자지껄! 시끌벅적!', '고급진 곳! 우아하게!']
        },
        {
            title: '혹시 주량이??',
            options: ['나 좀 마시지!', '응애에오!']
        },
        {
            title: '술은 보통 언제 마셔??',
            options: ['특별한 날에!', '그냥 마시는거지!']
        },
        {
            title: '월급 들어왔는데 뭐 마시지??',
            options: ['비싼거 마시자!', '그냥 늘 마시던걸로!']
        },
        {
            title: '술을 향한 나의 마음가짐은??',
            options: ['취해야지! 양으로 승부!', '안 취해도 OK! 질로 승부!']
        },
        {
            title: '어떻게 마시는게 좋을까??',
            options: ['한 방에 그냥 탁!', '한 잔을 여러 번!']
        },
        {
            title: '퇴근하고 술 마려운데 어디갈까??',
            options: ['부담없는 근처 술집!', '압구정 어디 가자!']
        },
    ];

    const toNext = () => {
        setProg(prog + 1);
    };

    return (
        <div className="test-area">
            <div className="test-container">
                <div className="test-title-area">
                    <div className="test-title-container">
                        <div className="test-title">취향 알아보기!</div>
                        <div className="test-cnt"><span>{prog+1}</span>/11</div>
                    </div>
                </div>
                <div className="test-progress-area">
                    <div className="test-progress">
                        <div 
                            className="test-progress-bar" 
                            style={{width: `${(prog+1)/11*100}%`}} >
                        </div>
                    </div>
                </div>
                <Question list={question_list[prog]} toNext={toNext} />
            </div>
        </div>
    );
};

export default Test;