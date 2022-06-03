import React from 'react';
import './Question.scss';

const Question = (props) => {
    return (
        <div className='question-area'>
            <h2 className='question-title'>오늘 마실 술은 어떤게 좋아?</h2>
            <div className='question-content-area'>
                <div className='question-img-area'>
                    <div className='question-img'></div>
                </div>
                 <div className='question-option-area'>
                    <div className='question-options pointer'>술은 달아야지!</div>
                    <div className='question-options pointer'>술은 써야지!</div>
                 </div>
            </div>
        </div>       
    )   
}

export default Question;