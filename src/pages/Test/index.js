import React, {useState, useRef} from "react";
import "./Test.scss";

const Test = () => {
    const Drink = [
        {name: "soju", score: 0},
        {name: "beer", score: 0},
        {name: "wine", score: 0},
        {name: "liquor", score: 0},
        {name: "cocktail", score: 0},
    ];

    const handleClick = (e) => {
        e.preventDefault();
    }

    return (
        <div className="test">
            <div className="progress_bar">
                진행바
            </div>
            <div className="question_area">
                질문
            </div>
            <div className="answer_area">
                <button type="submit" className="choice_a">
                    <div className="choice_text">선택지 1</div>
                </button>
                <button type="submit" className="choice_b">
                    <div className="choice_text">선택지 2</div>
                </button>         
            </div>
        </div>

    );
}

export default Test;