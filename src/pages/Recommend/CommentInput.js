import React, { useState, useCallback } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../../firebase';
import { doc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const CommentInput = ({onInsert}) => {
    // submit 시 데이터 DB에 저장 (임시)
    // const postComment = (e) => {
    //     e.preventDefault();

    //     setDoc(doc(db, "comment", commentPK), {
    //         writer: "gmlwh124",
    //         content: "test2",
    //         alcohol: "마티니",
    //         created_at: serverTimestamp(),
    //         updated_at: serverTimestamp(),
    //     }).then(updateDoc(keyRef, {
    //         id: increment(1)
    //     })).catch(e => console.log(e.message));
    // };

    const [value, setValue] = useState({
        name: "",
        content: "",
    });

    const onChangeName = useCallback(e => {
        setValue({
            name: e.target.value,
            content: value.content,
        })
    },[value])

    const onChangeContent = useCallback(e => {
        setValue({
            name: value.name,
            content: e.target.value,
        })
    },[value])

    const onSubmit = useCallback(e => {
        e.preventDefault();
        onInsert(value.name, value.content);
        setValue({
            name: "",
            content: "",
        })
    }, [onInsert, value])

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
