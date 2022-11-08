import React, {useEffect, useState, useCallback} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, query, where, collection, setDoc, serverTimestamp, updateDoc, increment, deleteDoc} from "firebase/firestore";
import WineRating from "./WineRating";

const Modal = ({ userId, alcohol, keyRef, selectedAlcohol, setSelectedAlcohol}) => {
    const [comments, setComments] = useState([]);
    const [updateMode, setUpdateMode] = useState({
        status: false,
        id: null
    });
    const [inputs, setInputs] = useState({
        comment: "",
        updateComment: "",
        updateRate: 0
    });

    const winePoint = ["당도", "산도", "바디", "타닌"]

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
                    time: convertDate(((doc.data().updated_at).seconds) * 1000),
                    isUpdated: doc.data().updated_at === doc.data().created_at ? false : true
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
                    <div className='modal-itemName'>
                        <div className='modal-itemName-kr'>{selectedAlcohol.name}, <span className='modal-itemName-eng'>{selectedAlcohol.name}</span></div>
                    </div>
                </div>
                <div className="modal-middle">
                    <div className="modal-ingredient-area">
                        <p className="modal-ingredient">주류 정보 <span className='modal-itemVolume'>{selectedAlcohol.volume ?? "도수"}</span></p>
                        <div className="modal-description-area">
                            {selectedAlcohol.description.map(desc => 
                                <p key={desc}>{desc}</p>
                                )}
                                </div>
                        <div className={alcohol !== "cocktail" ? "hide" : "modal-ingredient-box"}>
                            <p className="modal-ingredient">재료 정보</p>
                            <div className="modal-ingredient-o">
                                {selectedAlcohol.ingredients?.map(item => 
                                    <div key={item.name} className="modal-ingredient-card">
                                        <img className="modal-ingredient-img" alt="재료 이미지"
                                            src={"https://firebasestorage.googleapis.com/v0/b/mytype-8123d.appspot.com/o/" + item.img + "?alt=media"} />
                                        <p className="modal-ingredient-name">{item.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={alcohol !== "wine" ? "hide" : "modal-ingredient-box"}>
                            <p className="modal-ingredient-wine">상세 정보</p>
                            <div className="wine-area">
                                {winePoint.map(point => 
                                    <div key={point.toString()} className="wine-box">
                                        <p className="wine-ingredient">{point}</p>
                                        <WineRating/>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <p className='modal-desc'>댓글 <span style={{color:'blue', fontWeight:800}}>{comments.length}</span>개</p>
                    <div className='maodal-comment-area'>
                        <div className={comments.length === 0 ? "modal-comment-inNeed" : "hide"}>작성된 리뷰가 없습니다.</div>
                        <div className={comments.length === 0 ? "hide" : "modal-comment-box"}>
                            {comments.map(comment => (
                                <div key={comment.id} >
                                    <div className={updateMode.status && updateMode.id === comment.id ? "hide" : "comment-row"}>
                                        <div className='comment-info-area'>
                                            <div className='comment-id-rating'>
                                                <p className="comment-writer">{comment.writer}</p>
                                                <p className={comment.isUpdated ? "comment-updated" : "hide"}>(수정됨)</p>
                                            </div>
                                            <div className='comment-time-updated'>
                                                <p className="comment-time">{comment.time}</p>
                                            </div>
                                        </div>
                                        <div className='comment-content-btn'>
                                            <div className='comment-content-area'
                                                style={userId !== comment.writer ? {width: "100%"} : {} }>
                                                <p className="comment-content">{comment.content}</p>
                                            </div>
                                            <p className={comment.writer === userId ? "comment-option pointer" : "hide"}
                                                onClick={() => setUpdateMode({
                                                    status:true,
                                                    id:comment.id
                                                })}>수정</p>
                                            <p className={comment.writer === userId ? "comment-option pointer" : "hide"}
                                                id={comment.id} onClick={(e) => deleteComment(e)}>삭제</p>
                                        </div>
                                    </div>
                                    {/* 리뷰 수정하기 */}
                                    <div className={ updateMode.status && updateMode.id === comment.id ? "comment-update-row" : "hide" } >
                                        <div className='input-id-rating'>
                                            <p className="comment-writer">{comment.writer}</p>
                                        </div>
                                        <div className='comment-content-btn'>
                                            <div className='comment-update-input'>
                                                <input className="comment-update"
                                                    type="text"
                                                    name="updateComment"
                                                    value={inputs.updateComment}
                                                    placeholder={comment.content}
                                                    onChange={onChange} />
                                            </div>
                                            <p className="comment-option pointer" id={comment.id}
                                                onClick={(e) => updateComment(e)}>작성</p>
                                            <p className="comment-option pointer"
                                                onClick={() => {
                                                    setUpdateMode({
                                                        status:false,
                                                        id:null
                                                    });
                                                    setInputs({
                                                        comment: "",
                                                        updateComment: ""
                                                    });
                                                }}>취소</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='modal-divider'></div>
                        {/* 댓글 입력 */}
                        <div className='modal-input-area'>
                            <div className={userId === null ? "modal-login-inNeed" : "hide"}>로그인 후 댓글을 남겨보세요.</div>
                            <form className={userId === null ? "hide" : ""}
                                onSubmit={postComment} >
                                <div className='input-id-rating'>
                                    <p className="modal-shop-userName">{userId}</p>
                                </div>
                                <div className='modal-input-box'>
                                    <div className='modal-input'>
                                        <input className='modal-shop-input' 
                                            type="text"
                                            name="comment"
                                            placeholder="리뷰를 남겨보세요."
                                            value={inputs.comment}
                                            onChange={onChange} />
                                    </div>
                                    <button className='pointer' type='submit'>작성</button>
                                </div>
                            </form>
                        </div>
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