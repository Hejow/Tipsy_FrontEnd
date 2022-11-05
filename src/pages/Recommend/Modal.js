import React, {useEffect, useState, useCallback} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, query, where, collection, setDoc, serverTimestamp, updateDoc, increment, deleteDoc } from "firebase/firestore";

const Modal = ({ userId, keyRef, selectedAlcohol, setSelectedAlcohol }) => {
    const [comments, setComments] = useState([]);
    const [updateMode, setUpdateMode] = useState({
        status: false,
        id: null
    });
    const [inputs, setInputs] = useState({
        comment: "",
        updateComment: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

    const convertDate = (sec) => {
        const currentTime = new Date();
        const commentTime = new Date(sec);
        
        if (commentTime.getFullYear() < currentTime.getFullYear())
            return (currentTime.getFullYear() - commentTime.getFullYear()) + "년전";
        else if (commentTime.getMonth() < currentTime.getMonth())
            return (currentTime.getMonth() - commentTime.getMonth()) + "월전";
        else if (commentTime.getDate() < currentTime.getDate())
            return (currentTime.getDate() - commentTime.getDate()) + "일전";
        else if (commentTime.getHours() < currentTime.getHours())
            return (currentTime.getHours() - commentTime.getHours()) + "시간전";
        else 
            return (currentTime.getMinutes() - commentTime.getMinutes()) + "분전";
    }

    // 조회수 올리기
    // const increaseClickCount = () => {
    //     updateDoc(doc(db, alcohol + "Data", selectedAlcohol.name), {
    //         clicked: increment(1)
    //     });
    // };

    const increasePK = (keyRef) => {
        updateDoc(keyRef, {
            id: increment(1)
        }).catch(e => console.log(e.message));
    }

    const postComment = (e) => {
        e.preventDefault();

        getDoc(keyRef).then(commentPK => {
            setDoc(doc(db, "comment", commentPK.data().id.toString()), {
                writer: userId,
                content: inputs.comment,
                alcohol: selectedAlcohol.name,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            }).then(() => {
                increasePK(keyRef)
                setInputs({
                    comment: "",
                    updateComment: ""
                });
                getCommentsByAlcohol();
            }).catch(e => console.log(e.message));
        });
    };

    const updateComment = (e) => {
        if (inputs.updateComment === "") {
            window.alert("빈 칸은 입력할 수 없습니다.");
        } else {
            updateDoc(doc(db, "comment", e.target.id), {
                content: inputs.updateComment,
                updated_at: serverTimestamp()
            }).then(() => {
                setInputs({
                    comment: "",
                    updateComment: ""
                });
                setUpdateMode({
                    status:false,
                    id:null
                });
                getCommentsByAlcohol();
            }).catch(e => console.log(e.message));
        };
    };

    const deleteComment = (e) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteDoc(doc(db, "comment", e.target.id))
                .then(() => getCommentsByAlcohol())
                .catch(e => console.log(e.message));
        } else return;
    };

    const getCommentsByAlcohol = useCallback(() => {
        getDocs(query(collection(db, "comment"), where("alcohol", "==", selectedAlcohol.name)))
            .then(snapShot => {
                const commentData = snapShot.docs.map(doc => ({
                    id: doc.id,
                    writer: doc.data().writer,
                    content: doc.data().content,
                    time: convertDate(((doc.data().updated_at).seconds) * 1000)
                }));
                setComments(commentData);
            }).catch(e => console.log(e.message));
    }, [selectedAlcohol.name]);

    useEffect(() => {
        console.log("Modal effected");
        // increaseClickCount();
        getCommentsByAlcohol();
    }, [getCommentsByAlcohol])
    
    return(
        <div className = "modal">
            <img className="modalImg" src={selectedAlcohol.img} alt="주종 이미지"/>
            <div className="modalContents">
                <div className="modal-header">
                    <div className='modal-itemName'>{selectedAlcohol.name}</div>
                    <div className='modal-itemScore'>{selectedAlcohol.volume ?? "도수"}</div>
                </div>
                <div className="modal-middle">
                    {selectedAlcohol.description.map(desc => 
                        <p key={desc}>{desc}</p>
                    )}
                </div>
                <div className="modal-bottom">
                    <div className={userId === null ? "CommentInsert" : "hide"}>로그인 후 댓글을 남겨보세요.</div>
                    <form className={userId === null ? "hide" : "CommentInsert"}
                        onSubmit={postComment} >
                        <p className="inputNames">{userId}</p>
                        <input className='inputContents' 
                            type="text"
                            name="comment"
                            placeholder="댓글을 남겨보세요."
                            value={inputs.comment}
                            onChange={onChange} />
                        <button className="input-submit pointer" type='submit'>댓글 남기기</button>
                    </form>
                    <div className='comment'>
                        {comments.map(comment => (
                            <div key={comment.id} >
                                <div className={updateMode.status && updateMode.id === comment.id ? "hide" : "comment-row"}>
                                    <p className="comment-writer">{comment.writer}</p>
                                    <p className="comment-content">{comment.content}</p>
                                    <p className="comment-time">{comment.time}</p>
                                    <button className={comment.writer === userId ? "pointer" : "hide"}
                                        onClick={(e) => setUpdateMode({
                                            status:true,
                                            id:comment.id
                                        })}>수정</button>
                                    <button className={comment.writer === userId ? "pointer" : "hide"}
                                        id={comment.id} onClick={(e) => deleteComment(e)} >삭제</button>
                                </div>
                                <div className={ updateMode.status && updateMode.id === comment.id ? "comment-row" : "hide" } >
                                    <p className="comment-writer">{comment.writer}</p>
                                    <input className="comment-update"
                                        type="text"
                                        name="updateComment"
                                        value={inputs.updateComment}
                                        placeholder={comment.content}
                                        onChange={onChange} />
                                    <button className="pointer" id={comment.id}
                                        onClick={(e) => updateComment(e)}>수정</button>
                                    <button className="pointer"
                                        onClick={() => {
                                            setUpdateMode({
                                                status:false,
                                                id:null
                                            });
                                            setInputs({
                                                comment: "",
                                                updateComment: ""
                                            });
                                        }}>취소</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="xButton" onClick={() => setSelectedAlcohol(null)}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    );
};

export default Modal;