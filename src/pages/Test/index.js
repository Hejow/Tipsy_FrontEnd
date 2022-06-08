import React, { useState, useEffect } from "react";
import "./Test.scss";
import { Question } from '../../components';

const Test = () => {
    const [ prog, setProg ] = useState(0); 
    const [ result, setResult] = useState({
        s:0, b:0, w1:0, w2:0, c:0
    });
    
    const question_lists = [
        {
            title: '술은 자고로 무슨 맛이지??',
            options: [
                {
                    opt:'술은 달아야지!',
                    score:{s:2, b:3, w1:4, w2:1, c:4}
                }, 
                {
                    opt:'술은 써야지!',
                    score:{s:4, b:3, w1:2, w2:5, c:2} 
                }
            ]
        },
        {
            title: '술과 어울리는 향은??',
            options: [
                {
                    opt:'본연의 향!',
                    score:{s:0, b:2, w1:3, w2:0, c:4}
                }, 
                {
                    opt:'달달한 향!',
                    score:{s:4, b:1, w1:3, w2:4, c:1}
                }
            ]
        },
        {
            title: '오늘 안주는 뭘로 갈까??',
            options: [
                {
                    opt:'가벼운거 가자!',
                    score:{s:1, b:3, w1:3, w2:3, c:5}
                }, 
                {
                    opt:'든든한거 가자!',
                    score:{s:5, b:3, w1:3, w2:3, c:1}
                }
            ]
        },
        {
            title: '오늘은 몇 명이랑 마시지??',
            options: [
                {
                    opt:'다 불러서 마시자!',
                    score:{s:4, b:4, w1:3, w2:3, c:1}
                }, 
                {
                    opt:'한 두명만 불러!',
                    score:{s:2, b:2, w1:3, w2:3, c:5}
                }
            ]
        },
        {
            title: '어떤 분위기가 더 좋아??',
            options: [
                {
                    opt:'왁자지껄! 시끌벅적!',
                    score:{s:4, b:4, w1:2, w2:3, c:1}
                },
                {
                    opt:'고급진 곳! 우아하게!',
                    score:{s:2, b:2, w1:4, w2:3, c:5}
                }
            ]
        },
        {
            title: '혹시 주량이??',
            options: [
                {
                    opt:'나 좀 마시지!',
                    score:{s:4, b:1, w1:2, w2:5, c:2}
                }, 
                {
                    opt:'응애에오!',
                    score:{s:2, b:5, w1:4, w2:1, c:4}
                }
            ]
        },
        {
            title: '술은 보통 언제 마셔??',
            options: [
                {
                    opt:'특별한 날에!',
                    score:{s:2, b:2, w1:4, w2:5, c:4}
                }, 
                {
                    opt:'그냥 마시는거지!',
                    score:{s:4, b:4, w1:2, w2:1, c:2}
                }
            ]
        },
        {
            title: '월급 들어왔는데 뭐 마시지??',
            options: [
                {
                    opt:'비싼거 마시자!',
                    score:{s:2, b:2, w1:4, w2:5, c:4}
                }, 
                { 
                    opt:'그냥 늘 마시던걸로!',
                    score:{s:4, b:4, w1:2, w2:1, c:2}
                }
            ]
        },
        {
            title: '술을 향한 나의 마음가짐은??',
            options: [
                {
                    opt:'취해야지! 양으로 승부!',
                    score:{s:2, b:3, w1:4, w2:1, c:4}
                }, 
                {
                    opt:'안 취해도 OK! 질로 승부!',
                    score:{s:4, b:3, w1:2, w2:5, c:2}
                }
            ]
        },
        {
            title: '어떻게 마시는게 좋을까??',
            options: [
                {
                    opt:'한 방에 그냥 탁!',
                    score:{s:5, b:0, w1:0, w2:3, c:0}
                }, 
                {
                    opt:'한 잔을 여러 번!',
                    score:{s:0, b:5, w1:5, w2:3, c:5}
                }
            ]
        },
        {
            title: '퇴근하고 술 마려운데 어디갈까??',
            options: [
                {
                    opt:'부담없는 근처 술집!',
                    score: {s:4, b:4, w1:2, w2:0, c:0}
                },
                {
                    opt:'압구정 어디 가자!',
                    score: {s:0, b:0, w1:4, w2:5, c:3}
                }
            ]
        }
    ];

    
    const toResult = () => {
        if (prog < 10) setProg(prog+1);
    };
    
    const getScores = (target) => {
        Object.keys(result).map( (key) => 
            setResult({
                ...result,
                [key]: result[key] + target[key]
            })
        )
    };

    useEffect(() => {
        console.log(result);
    }, [result]);

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
                <Question 
                    lists={question_lists} 
                    progress={prog}
                    toResult={toResult} 
                    getScores={getScores} />
            </div>
        </div>
    );
};

export default Test;