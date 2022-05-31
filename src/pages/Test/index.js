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
            <div className="test">
                <article>
                    <div className="test_area">
                        <div className="progress_bar">진행바</div>
                    <section>
                        <div className="question_area">질문</div>
                        <div className="answer_area">
                            <div className="choice" onClick={nextSlideA}>
                                <div className="img">
                                    <img src="" alt=""></img>
                                </div>
                                <div className="answer">선택지</div>
                            </div>
                            <div className="choice" onClick={nextSlideB}>
                                <div className="img">
                                    <img src="" alt=""></img>
                                </div>
                                <div className="answer">선택지</div>
                            </div>
                            <div className="choice" onClick={nextSlideC}>
                                <div className="img">
                                    <img src="" alt=""></img>
                                </div>
                                <div className="answer">선택지</div>
                            </div>
                            <div className="choice" onClick={nextSlideD}>
                                <div className="img">
                                    <img src="" alt=""></img>
                                </div>
                                <div className="answer">선택지</div>
                            </div>
                        </div>
                    </section>
                    </div>
                </article> 
            </div>
    );
}

export default Test;