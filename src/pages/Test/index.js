import React, { useState } from "react";
import "./Test.scss";
import { useNavigate } from "react-router-dom";
import { Question } from '../../components';

const Test = () => {
    const [ progress, setProgress ] = useState(0); 
    const [ result, setResult] = useState({
        soju:0, beer:0, wine:0, wiskey:0, cocktail:0
    });
    const [ loading, setLoding ] = useState(false);
    const navigate = useNavigate();
    const question_lists = [
        {
            title: '술은 자고로 무슨 맛이지??',
            options: [
                {
                    opt:'술은 달아야지!',
                    score:{soju:2, beer:3, wine:4, wiskey:1, cocktail:4}
                }, 
                {
                    opt:'술은 써야지!',
                    score:{soju:4, beer:3, wine:2, wiskey:5, cocktail:2} 
                }
            ]
        },
        {
            title: '술과 어울리는 향은??',
            options: [
                {
                    opt:'본연의 향!',
                    score:{soju:0, beer:2, wine:3, wiskey:0, cocktail:4}
                }, 
                {
                    opt:'달달한 향!',
                    score:{soju:4, beer:1, wine:3, wiskey:4, cocktail:1}
                }
            ]
        },
        {
            title: '오늘 안주는 뭘로 갈까??',
            options: [
                {
                    opt:'가벼운거 가자!',
                    score:{soju:1, beer:3, wine:3, wiskey:3, cocktail:5}
                }, 
                {
                    opt:'든든한거 가자!',
                    score:{soju:5, beer:3, wine:3, wiskey:3, cocktail:1}
                }
            ]
        },
        {
            title: '오늘은 몇 명이랑 마시지??',
            options: [
                {
                    opt:'다 불러서 마시자!',
                    score:{soju:4, beer:4, wine:3, wiskey:3, cocktail:1}
                }, 
                {
                    opt:'한 두명만 불러!',
                    score:{soju:2, beer:2, wine:3, wiskey:3, cocktail:5}
                }
            ]
        },
        {
            title: '어떤 분위기가 더 좋아??',
            options: [
                {
                    opt:'왁자지껄! 시끌벅적!',
                    score:{soju:4, beer:4, wine:2, wiskey:3, cocktail:1}
                },
                {
                    opt:'고급진 곳! 우아하게!',
                    score:{soju:2, beer:2, wine:4, wiskey:3, cocktail:5}
                }
            ]
        },
        {
            title: '혹시 주량이??',
            options: [
                {
                    opt:'나 좀 마시지!',
                    score:{soju:4, beer:1, wine:2, wiskey:5, cocktail:2}
                }, 
                {
                    opt:'응애에오!',
                    score:{soju:2, beer:5, wine:4, wiskey:1, cocktail:4}
                }
            ]
        },
        {
            title: '술은 보통 언제 마셔??',
            options: [
                {
                    opt:'특별한 날에!',
                    score:{soju:2, beer:2, wine:4, wiskey:5, cocktail:4}
                }, 
                {
                    opt:'그냥 마시는거지!',
                    score:{soju:4, beer:4, wine:2, wiskey:1, cocktail:2}
                }
            ]
        },
        {
            title: '월급 들어왔는데 뭐 마시지??',
            options: [
                {
                    opt:'비싼거 마시자!',
                    score:{soju:2, beer:2, wine:4, wiskey:5, cocktail:4}
                }, 
                { 
                    opt:'그냥 늘 마시던걸로!',
                    score:{soju:4, beer:4, wine:2, wiskey:1, cocktail:2}
                }
            ]
        },
        {
            title: '술을 향한 나의 마음가짐은??',
            options: [
                {
                    opt:'취해야지! 양으로 승부!',
                    score:{soju:2, beer:3, wine:4, wiskey:1, cocktail:4}
                }, 
                {
                    opt:'안 취해도 OK! 질로 승부!',
                    score:{soju:4, beer:3, wine:2, wiskey:5, cocktail:2}
                }
            ]
        },
        {
            title: '어떻게 마시는게 좋을까??',
            options: [
                {
                    opt:'한 방에 그냥 탁!',
                    score:{soju:5, beer:0, wine:0, wiskey:3, cocktail:0}
                }, 
                {
                    opt:'한 잔을 여러 번!',
                    score:{soju:0, beer:5, wine:5, wiskey:3, cocktail:5}
                }
            ]
        },
        {
            title: '퇴근하고 술 마려운데 어디갈까??',
            options: [
                {
                    opt:'부담없는 근처 술집!',
                    score: {soju:4, beer:4, wine:2, wiskey:0, cocktail:0}
                },
                {
                    opt:'압구정 어디 가자!',
                    score: {soju:0, beer:0, wine:4, wiskey:5, cocktail:3}
                }
            ]
        }
    ];

    const toResult = () => {
        if (progress < 10) setProgress(progress+1);
        else {
            setLoding(true);
            const test_result = Object.keys(result).find(key => (
                result[key] === Math.max(...Object.values(result))
            ));
            setTimeout(() => {
                navigate('/testresult', {state : test_result}) 
            }, 1000);
        }
    };

    const getResult = (obj) => {
        setResult({
            soju: result.soju + obj.soju,
            beer: result.beer + obj.beer,
            wine: result.wine + obj.wine,
            wiskey: result.wiskey + obj.wiskey,
            cocktail: result.cocktail + obj.cocktail,
        })
    };

    return (
        <div className="test-area">
            <div className="test-container">
                <div className="test-title-area">
                    <div className="test-title-container">
                        <div className="test-title">취향 알아보기!</div>
                        <div className="test-cnt"><span>{progress+1}</span>/11</div>
                    </div>
                </div>
                <div className="test-progress-area">
                    <div className="test-progress">
                        <div 
                            className="test-progress-bar" 
                            style={{width: `${(progress+1)/11*100}%`}} >
                        </div>
                    </div>
                </div>
                <Question 
                    lists={question_lists} 
                    progress={progress}
                    toResult={toResult} 
                    getResult={getResult} />
            </div>
            <div className={loading ? 'test-loading' : 'hide'}>
                <div className="test-loading-circle">
                    <div className="test-loading-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Test;