import React from "react";
import "./TestResult.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


const TestResult = () => {
    return (
        <div className="test_result">
            <div className="result_box">
                <div className="content_section">
                    <h2>당신의 술 취향은</h2>
                    <p>칵테일 입니다.</p>
                    <div className="img_section">
                        <div className="image">
                            <img className="cocktailImage" alt="cocktail" src="img/칵테일.png"></img>
                        </div>
                    </div>
                <div className="button_section">
                    <button type="sumit">다시 테스트하기</button> 
                    <button type="sumit">술 추천받기</button> 
                </div>
                <div className="sns_share_section">
                    <div className="list_title">내 결과 공유하기</div>
                    <a href="/"><FontAwesomeIcon icon={faInstagram} /></a> 
                    <a href="/"><FontAwesomeIcon icon={faFacebookF} /></a> 
                    <a href="/"><FontAwesomeIcon icon={faPaperclip} /></a> 
                </div>

                </div>
            </div>
        </div>
    )
}

export default TestResult;