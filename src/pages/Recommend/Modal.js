import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, query, where, collection, setDoc, serverTimestamp, updateDoc, increment } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

const Modal = ({ alcohol, keyRef, selectedAlcohol, setSelectedAlcohol }) => {
    const [selectedDetail, setSelectedDetail] = useState(null); // 선택된 주종에 따른 디테일 정보
    const [comments, setComments] = useState([]); // 모달이 열릴 때마다 DB에서 가져온 댓글 데이터 
    const [input, setInput] = useState("");

    const setUserId = (token) => {
        if (token === null) return null;
        else {
            const bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_SECRET_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).id;
        }
    }

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

    const userToken = window.sessionStorage.getItem("TIPSY");
    const userId = setUserId(userToken);

    // promise 성공 시 PK increase
    const incPK = (keyRef) => {
        updateDoc(keyRef, {
            id: increment(1)
        }).catch(e => console.log(e.message));
    }

    // 댓글달기 (단순 추가)
    const postComment = (e) => {
        e.preventDefault();

        getDoc(keyRef).then(commentPK => {
            setDoc(doc(db, "comment", commentPK.data().id.toString()), {
                writer: userId,
                content: input,
                alcohol: selectedAlcohol.name,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            }).then(() => {
                incPK(keyRef)
                setInput("");
                getCommentsByAlcohol();
            })
        });
    };

    // 주종과 이름으로 디테일 정보 가져오기
    const getSelectedDetailByName = useCallback(() => {
        const alcoholType = alcohol + "Data";
        
        getDoc(doc(db, alcoholType, selectedAlcohol.name)).then(doc => {
            setSelectedDetail(doc.data())
        }).catch(e => console.log(e.message))
    }, [alcohol, selectedAlcohol.name]);

    // 모달 클릭 시 DB에서 comments 가져오기
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
        getSelectedDetailByName();
        getCommentsByAlcohol();
    }, [getSelectedDetailByName, getCommentsByAlcohol])

    console.log(selectedDetail);
    console.log(comments);
    
    return(
        <div className = "modal">
            <img className="modalImg" alt="자세히보기창" 
                src={selectedAlcohol.img} />
            <div className="modalContents">
                <div className="modal-header">
                    <div className='modal-itemName'>{selectedAlcohol.name}</div>
                    <div className='modal-itemScore'>평점</div>
                </div>
                <div className="modal-middle">상품설명</div>
                <div className="modal-bottom">
                    <div className={userId === null ? "CommentInsert" : "hide"}>로그인 후 댓글을 남겨보세요.</div>
                    <form className={userId === null ? "hide" : "CommentInsert"}
                        onSubmit={postComment} >
                        <p className="inputNames">{userId}</p>
                        <input className='inputContents' 
                            type="text"
                            name="input"
                            placeholder="댓글을 남겨보세요."
                            value={input}
                            onChange={e => setInput(e.target.value)} />
                        <button className="input-submit pointer" type='submit'>
                            send
                        </button>
                    </form>
                    <div className='comment'>
                        {comments.map(comment => (
                            <div className="comment-row">
                                <p className="comment-writer">{comment.writer}</p>
                                <p className="comment-content">{comment.content}</p>
                                <p className="comment-time">{comment.time}</p>
                                <button className={comment.writer === userId ? "" : "hide"}>수정</button>
                                <button className={comment.writer === userId ? "" : "hide"}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="xButton" onClick={() => {
                setSelectedAlcohol(null);
                setSelectedDetail(null);
            }}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    );
};

export default Modal;