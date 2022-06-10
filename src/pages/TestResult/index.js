import React from "react";
import "./TestResult.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


const TestResult = () => {
    const { state } = useLocation();
    const test = 'cocktail';
    const Alcohols = {
        soju: {
            img:'/',
            name: '소주',
            color: '#51cf66',
            ment: '멘트입니당ㅋ'
        },
        beer: {
            img:'/',
            name: '맥주',
            color: '#fcc419',
            ment: '멘트입니당ㅋ'
        },
        wine: {
            img:'/',
            name: '와인',
            color: '#b21848',
            ment: '멘트입니당ㅋ'
        },
        wiskey: {
            img:'/',
            name: '위스키',
            color: '#495057',
            ment: '멘트입니당ㅋ'
        },
        cocktail: {
            img:'/',
            name: '칵테일',
            color: '#66d9e8',
            ment: '골라먹는 재미가 있는'
        }
    }

    return (
        <div className="testresult-area">
            <div className="testresult-contents">
                <div className="testresult-ment">{Alcohols[test].ment}</div>
                <div className="testresult-mytype"
                    style={{color:Alcohols[test].color}}    >
                    {Alcohols[test].name}
                </div>
                <div className="testresult-img-area">
                    
                </div>
            </div>
        </div>
    )
}

export default TestResult;