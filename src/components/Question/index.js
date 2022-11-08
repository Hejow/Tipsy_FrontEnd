import React from 'react';
import './Question.scss';

const Question = ({lists, progress, toResult, getResult }) => {
    return (
        <div className='question-area'>
            <h2 className='question-title'>{lists[progress].title}</h2>
            <div className='question-img-area'>
                <div className='question-img'><img className='question-img-box' src={lists[progress].img} alt=""></img></div>
            </div>
            <div className='question-option-area'>
                <div className='question-option-box'>
                {lists[progress].options.map((option) => 
                    <div 
                        key={option.opt} 
                        className='question-options pointer' 
                        onClick={() => {
                            getResult(option.score)
                            toResult()
                        }} 
                    >{option.opt}</div>
                )}
                </div>
            </div>
        </div>       
    )   
}

export default Question;