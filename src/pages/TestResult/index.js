import React from "react";
import "./TestResult.scss";
// import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


const TestResult = () => {
    // const { state } = useLocation();
    // const Alcohols = {
    //     soju: {
    //         img:'/',
    //         name: '소주'
    //     },
    //     beer: {
    //         img:'/',
    //         name: '맥주'
    //     },
    //     wine: {
    //         img:'/',
    //         name: '와인'
    //     },
    //     wiskey: {
    //         img:'/',
    //         name: '위스키'
    //     },
    //     cocktail: {
    //         img:'/',
    //         name: '칵테일'
    //     }
    // }
    
    return (
        <div className="test_result">
            <div className="result_box">
                <div className="content_section">
                    <h2>당신의 술 취향은 <br/><span>칵테일</span> 입니다.</h2>
                    <div className="img_section">
                        <div className="image">
                            <img className="cocktailImage" alt="cocktail" src="img/cocktail.png"></img>
                        </div>
                    </div>
                </div>
                <div className="button_section">
                    <button type="sumit">다시하기</button> 
                    <button type="sumit">추천받기</button> 
                </div>
                <div className="sns_share_section">
                    <div className="list_title">내 결과 공유하기</div>
                    <a href="/testresult"><FontAwesomeIcon icon={faInstagram} /></a> 
                    <a href="/testresult"><FontAwesomeIcon icon={faFacebookF} /></a> 
                    <a href="/testresult"><FontAwesomeIcon icon={faPaperclip} /></a> 
                </div>
            </div>
        </div>
    )
}

export default TestResult;