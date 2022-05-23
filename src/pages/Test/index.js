import React, {useState} from "react";
import "./Test.scss";
import "../../components/Questions";

const Test = () => {
    const [currentSlide, setCurentSlide] = useState(1);
    const [num, setNum] = useState(0);
    // const [question, setQuestion] = useState([]);
    // const TOTAL_SLIDES = 10;
    
    const nextSlideA = () => {
        // setQuestion(Question[num].question);
        setNum(num+1);
        setCurentSlide(currentSlide + 1);
    };

    const nextSlideB = () => {
        // setQuestion(Question[num].question);
        setNum(num+1);
        setCurentSlide(currentSlide + 1);
    };

    const nextSlideC = () => {
        // setQuestion(Question[num].question);
        setNum(num+1);
        setCurentSlide(currentSlide + 1);
    };

    const nextSlideD = () => {
        // setQuestion(Question[num].question);
        setNum(num+1);
        setCurentSlide(currentSlide + 1);
    };

    return (
        <section>
            <div className="test">
                <div className="test_area">
                    <div className="progress_bar">
                        진행바
                    </div>
                    <div className="question_area">질문</div>
                    <div className="answer_area">
                        <button type="submit" className="choice" onClick={nextSlideA}>
                            선택지 1
                        </button>
                        <button type="submit" className="choice" onClick={nextSlideB}>
                            선택지 2
                        </button>
                        <button type="submit" className="choice" onClick={nextSlideC}>
                            선택지 3
                        </button>
                        <button type="submit" className="choice" onClick={nextSlideD}>
                            선택지 4
                        </button>
                    </div>
                </div>    
            </div>
        </section>
    );
}

export default Test;