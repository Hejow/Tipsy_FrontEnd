import React, { useState, useCallback } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentInput = ({onInsert}) => {
    const [value, setValue] = useState(
        {name: "",
        content: "",
    });

    const onChangeName = useCallback(
        (e)=>{
            setValue({
                name: e.target.value,
                content: value.content,
            })
    },[value])

    const onChangeContent = useCallback(
        (e)=>{
            setValue({
                name: value.name,
                content: e.target.value,
            })
        },[value])


    const onSubmit = useCallback(
        (e)=>{
            onInsert(value.name, value.content);
            setValue({
                name: "",
                content: "",
            })

            e.preventDefault();
        },[onInsert, value])

    return (
        <form className="CommentInsert" onSubmit={onSubmit}>
            <input className="inputNames"
                placeholder='이름'
                value={value.name}
                onChange={onChangeName}
                />
            <input className='inputContents' 
                placeholder="댓글"
                value={value.content}
                onChange={onChangeContent}
            />
            <button type='submit'>
                <FontAwesomeIcon icon={faComment}/>
            </button>
        </form>
    )
}

export default CommentInput;
