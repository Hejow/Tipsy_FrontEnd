import React from "react";
import "./TestResult.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


const TestResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const Alcohols = {
        soju: {
            img:'/',
            name: '소주',
            color: '#51cf66',
            ment: '멘트입니당ㅋ',
            comments: ['이 술에 대한 설명1', '이 술에 대한 설명2']
        },
        beer: {
            img:'/',
            name: '맥주',
            color: '#fcc419',
            ment: '멘트입니당ㅋ',
            comments: ['이 술에 대한 설명1', '이 술에 대한 설명2']
        },
        wine: {
            img:'/',
            name: '와인',
            color: '#b21848',
            ment: '멘트입니당ㅋ',
            comments: ['이 술에 대한 설명1', '이 술에 대한 설명2']
        },
        wiskey: {
            img:'/',
            name: '위스키',
            color: '#495057',
            ment: '멘트입니당ㅋ',
            comments: ['이 술에 대한 설명1', '이 술에 대한 설명2']
        },
        cocktail: {
            img:'/',
            name: '칵테일',
            color: '#66d9e8',
            ment: '어울리는 멘트',
            comments: ['이 술에 대한 설명1', '이 술에 대한 설명2']
        }
    }

    return (
        <div className="testresult-area">
            <div className="testresult-contents">
                <h2 className="testresult-main-ment">나의 알코올 취향은?</h2>
                <div className="testresult-mytype"
                    style={{color:Alcohols[state].color}}    >
                    {Alcohols[state].name}
                </div>
                <div className="testresult-img-area">
                    <div className="testresult-img">어울리는 사진</div>
                </div>
                <div className="testresult-ment">{Alcohols[state].ment}</div>
                <div className="testresult-comment-area">
                    {Alcohols[state].comments.map(comment => (
                        <p className="testresult-comment" key={comment.toString()}>{comment}</p>
                    ))}
                </div>
                <div className="testresult-btn-area">
                    <button className="testresult-btn pointer" onClick={() => navigate('/testguide')}>다시하기</button>
                    <button className="testresult-btn pointer" onClick={() => navigate('/')}>돌아가기</button>
                </div>
                <div className="testresult-icon-area">
                    <div className="testresult-icon-box">
                        <div className="testresult-icon pointer"><FontAwesomeIcon icon={faInstagram} /></div>
                        <div className="testresult-icon pointer"><FontAwesomeIcon icon={faFacebookF} /></div>
                        <div className="testresult-icon pointer"><FontAwesomeIcon icon={faPaperclip} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestResult;