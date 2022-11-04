import React, { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faComment, faStar, faHouse, faLocationDot, faClock, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, query, where, collection, setDoc, serverTimestamp, updateDoc, increment, deleteDoc } from "firebase/firestore";

const Modal = ({ userId, keyRef, selectedShop, setSelectedShop, }) => {
    const [shopDetail, setShopDetail] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [updateMode, setUpdateMode] = useState({
        status:false,
        id:null
    });
    const [inputs, setInputs] = useState({
        comment: "",
        updateComment: ""
    });

    const shopInfo = [
        {id: 1, icon:faLocationDot, content: "주소:"},
        {id: 2, icon:faClock, content: "영업시간:"},
        {id: 3, icon:faPhone, content: "전화번호:"},
        {id: 4, icon:faHouse, content: "홈페이지:"},
        {id: 5, icon:faComment, content: "방문자 리뷰"},
    ]

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

    // const increasePK = (keyRef) => {
    //     updateDoc(keyRef, {
    //         id: increment(1)
    //     }).catch(e => console.log(e.message));
    // }
    
    // const postReview = (e) => {
    //     e.preventDefault();

    //     getDoc(keyRef).then(reviewPK => {
    //         getDoc(doc(db, "review", reviewPK.data().id.toString()), {
    //             writer: userId,
    //             content: inputs.comment,
    //             shop: selectedShop.name,
    //             created_at: serverTimestamp(),
    //             updated_at: serverTimestamp(),
    //         }).then(() => {
    //             increasePK(keyRef);
    //             setInputs({
    //                 comment: "",
    //                 updateComment: ""
    //             });
    //             getReviewsByShop();
    //         }).catch(e => console.log(e.message));
    //     });
    // };

    // const updateReview = (e) => {
    //     if (inputs.updateComment === "") {
    //         window.alert("빈 칸은 입력할 수 없습니다.");
    //     } else {
    //         updateDoc(doc(db, "review", e.target.id), {
    //             content: inputs.updateComment,
    //             updated_at: serverTimestamp()
    //         }).then(() => {
    //             setInputs({
    //                 comment: "",
    //                 updateComment: ""
    //             });
    //             setUpdateMode({
    //                 status:false,
    //                 id:null
    //             });
    //             getReviewsByShop();
    //         }).catch(e => console.log(e.message));
    //     };
    // };

    // const deleteReview = (e) => {
    //     if (window.confirm("리뷰를 삭제하시겠습니까?")) {
    //         deleteDoc(doc(db, "review", e.target.id))
    //             .then(() => getReviewsByShop())
    //             .catch(e => console.log(e.message));
    //     } else return;
    // };

    // const getShopDetailByName = useCallback(() => {
    //     getDoc(doc(db, "shop", selectedShop)).then(doc => {
    //         setShopDetail(doc.data())
    //     }).catch(e => console.log(e.message));
    // }, [selectedShop]);

    // const getReviewsByShop = useCallback(() => {
    //     getDocs(query(db, "review", where("shop", "==", selectedShop)))
    //         .then(snapShot => {
    //             const reviewData = snapShot.docs.map(doc => ({
    //                 id: doc.id,
    //                 writer: doc.data().writer,
    //                 content: doc.data().content,
    //                 time: convertDate(((doc.data().updated_at).seconds) * 1000)
    //             }));
    //             setReviews(reviewData);
    //         }).catch(e => console.log(e.message));
    // }, [selectedShop]);

    // useEffect(() => {
    //     console.log("Modal effected");
    //     getShopDetailByName();
    //     getReviewsByShop();
    // }, [getShopDetailByName, getReviewsByShop])

    return(
        <div className = "modal-shop-area">
            <div className="modal-shop-box">
                <img className="modal-shop-img" alt="자세히보기창"/>
                <div className="modal-shop-content">
                    <div className="modal-shop-header">
                        <div className='modal-shop-itemName'>가게이름</div>
                        <div className='modal-shop-itemScore'><FontAwesomeIcon className="shop-score" icon={faStar}/>4.97/5</div>
                    </div>
                    <div className="modal-shop-middle">
                        {shopInfo.map((item)=>(
                            <div className="modal-shop-explain" key={item.id}><FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>{item.content}</div>
                        ))}
                    </div>
                    <div className="modal-shop-bottom">
                        <div className={userId === null ? "modal-shop-CommentInsert" : "hide"}>로그인 후 댓글을 남겨보세요.</div>
                        <form className={userId === null ? "hide" : "modal-shop-CommentInsert"}>
                            <p className="modal-shop-inputNames">{userId}</p>
                            <input className='modal-shop-inputContents' 
                                type="text"
                                name="comment"
                                placeholder="댓글을 남겨보세요."
                                value={inputs.comment}
                                onChange={onChange} />
                            <button type='submit'><FontAwesomeIcon icon={faComment}/></button>
                        </form>
                        <div className='maodal-shop-comment'>
                            <div className='modal-shop-commentBox'>
                                {reviews.map(review => (
                                    <div key={review.id} >
                                        <div className={updateMode.status && updateMode.id === review.id ? "hide" : "comment-row"}>
                                            <p className="comment-writer">{review.writer}</p>
                                            <p className="comment-content">{review.content}</p>
                                            <p className="comment-time">{review.time}</p>
                                            <button className={review.writer === userId ? "pointer" : "hide"}
                                                onClick={(e) => setUpdateMode({
                                                    status:true,
                                                    id:review.id
                                                })}>수정</button>
                                            <button className={review.writer === userId ? "pointer" : "hide"} id={review.id}>삭제</button>
                                        </div>
                                        <div className={ updateMode.status && updateMode.id === review.id ? "comment-row" : "hide" } >
                                            <p className="comment-writer">{review.writer}</p>
                                            <input className="comment-update"
                                                type="text"
                                                name="updateComment"
                                                value={inputs.updateComment}
                                                placeholder={review.content}
                                                onChange={onChange} />
                                            <button className="pointer" id={review.id}>수정</button>
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
                </div>
            </div>
            <div className="xButton" onClick={() => {
                setSelectedShop(null);
                setShopDetail(null);
            }}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    );
}

export default Modal;