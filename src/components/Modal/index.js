import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faRoute , faStar, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Rating } from "react-simple-star-rating";
import './Modal.scss';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, setDoc, query, collection, where, serverTimestamp, updateDoc, increment, deleteDoc } from "firebase/firestore";

const Modal = ({ userId, keyRef, selectedShop, setSelectedShop, }) => {
    const [changeAddress, setChangeAddress] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [meanRate, setMeanRate] = useState(0);
    const [updateMode, setUpdateMode] = useState({
        status:false,
        id:null
    });
    const [inputs, setInputs] = useState({
        comment: "",
        rate: 0,
        updateComment: "",
        updateRate: 0
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

    const increasePK = (keyRef) => {
        updateDoc(keyRef, {
            id: increment(1)
        }).catch(e => console.log(e.message));
    }
    
    const postReview = (e) => {
        e.preventDefault();

        getDoc(keyRef).then(reviewPK => {
            setDoc(doc(db, "review", reviewPK.data().id.toString()), {
                writer: userId,
                shop: selectedShop.place_name,
                content: inputs.comment,
                rate: inputs.rate,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            }).then(() => {
                increasePK(keyRef);
                setInputs({
                    comment: "",
                    rate: 0,
                    updateComment: "",
                    updateRate: 0
                });
                getReviewsByShop();
            }).catch(e => console.log(e.message));
        });
    };

    const updateReview = (e) => {
        if (inputs.updateComment === "") {
            window.alert("빈 칸은 입력할 수 없습니다.");
        } else {
            updateDoc(doc(db, "review", e.target.id), {
                content: inputs.updateComment,
                rate: inputs.updateRate,
                updated_at: serverTimestamp()
            }).then(() => {
                setInputs({
                    comment: "",
                    rate: 0,
                    updateComment: "",
                    updateRate: 0
                });
                setUpdateMode({
                    status:false,
                    id:null
                });
                getReviewsByShop();
            }).catch(e => console.log(e.message));
        };
    };

    const deleteReview = (e) => {
        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
            deleteDoc(doc(db, "review", e.target.id))
                .then(() => getReviewsByShop())
                .catch(e => console.log(e.message));
        } else return;
    };

    const calcurateRate = useMemo(() => {
        let sumRate = 0;
        reviews.forEach(review => sumRate += review.rate);
        setMeanRate(Math.round(sumRate) / reviews.length);
    }, [reviews])

    const getReviewsByShop = useCallback(() => {
        getDocs(query(collection(db, "review"), where("shop", "==", selectedShop.place_name)))
            .then(snapShot => {
                const reviewData = snapShot.docs.map(doc => ({
                    id: doc.id,
                    writer: doc.data().writer,
                    content: doc.data().content,
                    rate: doc.data().rate,
                    created: doc.data().created_at,
                    time: convertDate(((doc.data().updated_at).seconds) * 1000),
                    isUpdated: (doc.data().updated_at.seconds === doc.data().created_at.seconds) ? false : true
                }));
                setReviews(reviewData.sort((a, b) => a.created - b.created));
            }).then(() => calcurateRate)
            .catch(e => console.log(e.message));
    }, [selectedShop.place_name, calcurateRate]);

    useEffect(() => {
        console.log("Modal effected");
        getReviewsByShop();
    }, [getReviewsByShop])

    return(
        <div className = "modal-shop-area">
            <div className="modal-shop-box">
                <div className='modal-img-area'>
                    <img className="modal-shop-img" alt="가게 이미지"/>
                </div>
                <div className="modal-shop-header">
                    <div className='modal-shop-itemName'>{selectedShop.place_name}</div>
                    <div className='modal-shop-itemScore'><FontAwesomeIcon className="shop-rate" icon={faStar}/> {isNaN(meanRate) ? 0 : meanRate}/5</div>
                </div>
                <div className="modal-shop-content">
                    <p className='modal-desc'>상세정보</p>
                    <div className="modal-detail-area">
                        <div className='shop-detail-card'>
                            <div className='shop-icon-area'><FontAwesomeIcon className='shop-icon' icon={faRoute}/></div>
                            <p className='shop-detail-info'>거리</p>
                            <p className='shop-detail-value'>내 위치로부터 <span style={{color:'blue'}}>{selectedShop.distance}</span>m</p>
                            <a className='shop-option pointer' href={selectedShop.place_url}
                                target="_blank" rel="noreferrer" >자세한 정보보기</a>
                        </div>
                        <div className='shop-detail-card'>
                            <div className='shop-icon-area'><FontAwesomeIcon className='shop-icon' icon={faLocationDot}/></div>
                            <p className='shop-detail-info'>주소</p>
                            <p className='shop-detail-value'>{changeAddress ? selectedShop.address_name : selectedShop.road_address_name}</p>
                            <p className='shop-option pointer' onClick={() => setChangeAddress(!changeAddress)}>
                                {changeAddress ? "도로명 보기" : "지번 보기"}
                            </p>
                        </div>
                        <div className='shop-detail-card'>
                            <div className='shop-icon-area'><FontAwesomeIcon className='shop-icon' icon={faPhone}/></div>
                            <p className='shop-detail-info'>연락처</p>
                            <p className='shop-detail-value'>{selectedShop.phone}</p>
                        </div>
                    </div>
                    <p className='modal-desc'>댓글 <span style={{color:'blue', fontWeight:800}}>{reviews.length}</span>개</p>
                    <div className='maodal-review-area'>
                        <div className={reviews.length === 0 ? "modal-review-inNeed" : "hide"}>작성된 리뷰가 없습니다.</div>
                        <div className={reviews.length === 0 ? "hide" : "modal-review-box"}>
                            {reviews.map(review => (
                                <div key={review.id} >
                                    <div className={updateMode.status && updateMode.id === review.id ? "hide" : "review-row"}>
                                        <div className='review-info-area'>
                                            <div className='review-id-rating'>
                                                <p className="review-writer">{review.writer}</p>
                                                <div className="rating-area">
                                                    <Rating className="star" size={15}
                                                        initialValue={review.rate}
                                                        allowFraction={true}
                                                        readonly={true}/>
                                                    &nbsp;{review.rate + "점"}
                                                </div>
                                                <p className={review.isUpdated ? "review-updated" : "hide"}>(수정됨)</p>
                                            </div>
                                            <div className='review-time-updated'>
                                                <p className="review-time">{review.time}</p>
                                            </div>
                                        </div>
                                        <div className='review-content-btn'>
                                            <div className='review-content-area'
                                                style={userId !== review.writer ? {width: "100%"} : {} }>
                                                <p className="review-content">{review.content}</p>
                                            </div>
                                            <p className={review.writer === userId ? "review-option pointer" : "hide"}
                                                onClick={() => setUpdateMode({
                                                    status:true,
                                                    id:review.id
                                                })}>수정</p>
                                            <p className={review.writer === userId ? "review-option pointer" : "hide"}
                                                id={review.id} onClick={(e) => deleteReview(e)}>삭제</p>
                                        </div>
                                    </div>
                                    {/* 리뷰 수정하기 */}
                                    <div className={ updateMode.status && updateMode.id === review.id ? "review-update-row" : "hide" } >
                                        <div className='input-id-rating'>
                                            <p className="review-writer">{review.writer}</p>
                                            <div className="rating-area">
                                                <Rating className="star" size={15}
                                                    initialValue={inputs.updateRate}
                                                    allowFraction={true}
                                                    onClick={(rate) => setInputs({...inputs, updateRate: rate})} />
                                                &nbsp;{ (inputs.updateRate ?? "0") + "점"}
                                            </div>
                                        </div>
                                        <div className='review-content-btn'>
                                            <div className='review-update-input'>
                                                <input className="review-update"
                                                    type="text"
                                                    name="updateComment"
                                                    value={inputs.updateComment}
                                                    placeholder={review.content}
                                                    onChange={onChange} />
                                            </div>
                                            <p className="review-option pointer" id={review.id}
                                                onClick={(e) => updateReview(e)}>작성</p>
                                            <p className="review-option pointer"
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
                                onSubmit={postReview} >
                                <div className='input-id-rating'>
                                    <p className="modal-shop-userName">{userId}</p>
                                    <div className="rating-area">
                                        <Rating className="star" size={15}
                                            initialValue={inputs.rate}
                                            allowFraction={true}
                                            onClick={(rate) => setInputs({...inputs, rate: rate})} />
                                        &nbsp;{(inputs.rate ?? 0) + "점"}
                                    </div>
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
            <div className="xButton" onClick={() => { setSelectedShop(null); }}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    );
}

export default Modal;