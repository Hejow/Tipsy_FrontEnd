import React from 'react';
import './Question.scss';

const Question = (props) => {
    return (
        <div className='question-area'>
            <h2 className='question-title'>{props.list.title}</h2>
            <div className='question-img-area'>
                <div className='question-img'></div>
            </div>
            <div className='question-option-area'>
                <div className='question-option-box'>
                {props.list.options.map((opt) => 
                    <div key={opt} className='question-options pointer' onClick={props.toNext} >{opt}</div>
                )}
                </div>
            </div>
        </div>       
    )   
}

export default Question;