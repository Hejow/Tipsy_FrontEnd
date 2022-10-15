import React, {useState, useRef, useEffect, useCallback } from 'react'
import "./Recommend.scss";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopularArea from './PopularArea';
import RecommendArea from './RecommendArea';
import NavBar from './NavBar';
import RePagination from './RePagination';
import CommentInput from './CommentInput';
import { updateDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Recommend = () => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    const [currentItems, setCurentItems] = useState([]) // 전체 데이터를 잘라서 currentItems에 넣음
    const [modalContents, setModalContents] = useState([]);
    const [comments, setComments] = useState([]); // 댓글 상태관리
    const [recommendItem, setRecommendItem] = useState([]);
    
    const wineDataCollectionRef = collection(db, "wineData");
    
    useEffect(()=>{
        const getWineData = async () => {
            const dataSnap = await getDocs(wineDataCollectionRef);
            setRecommendItem(dataSnap.docs.map((doc)=>({...doc.data(), id: doc.id})))
        }
        getWineData();
    },[])

    console.log(recommendItem);
    
    const nextId = useRef(1);

    const BarArea = () => {
        return (
            <div className="bar">
                <div className="total-num">전체 {recommendItem.length}개</div>
            </div>
        )
    }

    const Comment = (props) => {
        return (
            <div className='commentBox'>
                <div className='commentName'>{props.name}</div>
                <div className='commentContent'>{props.content}</div>
            </div>
        )
    }


    const onInsert = useCallback((name, content)=>{
        const comment = {
            id: nextId.current,
            name,
            content,
        };
        setComments(comments => comments.concat(comment));
        nextId.current += 1;
    }, [])

    const ImageModal = () => {
        const handleXbuttonClick = () => {
            setCurrentImageDetail(null);
        }
        return(
            <div className = "modal">
                <img className="modalImg" src={modalContents.img} alt="자세히보기창"/>
                <div className="modalContents">
                    <div className="modal-header">
                        <div className='modal-itemName'>{modalContents.id}</div>
                        <div className='modal-itemScore'>평점</div>
                    </div>
                    <div className="modal-middle">
                        상품설명
                    </div>
                    <div className="modal-bottom">
                        <CommentInput onInsert={onInsert}/>
                        <div className='comment'>
                            {comments.map(comment=>(
                                <Comment
                                key={comment.id}
                                id={comment.id}
                                name={comment.name}
                                content={comment.content}
                                />
                                )
                                )}
                        </div>
                    </div>
                </div>
                <div className="xButton" onClick={handleXbuttonClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
        );
    };

    return(
        <div className="recommend-area">
            {currentImageDetail && <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "rgb(255, 255, 255, 0.7)"
            }}/>}
            <div className='recommend-left'>
                <NavBar/>
            </div>
            <div className="recommend-content">
                {currentImageDetail && (<ImageModal recommendItem={recommendItem}/>)}
                <PopularArea recommendItem={recommendItem}/>
                <BarArea recommendItem={recommendItem}/>
                <RecommendArea currentImageDetail={currentImageDetail} setCurrentImageDetail={setCurrentImageDetail}  currentItems={currentItems} recommendItem={recommendItem} setModalContents={setModalContents}/>
                <RePagination recommendItem={recommendItem} currentItems={currentItems} setCurentItems={setCurentItems}/>
            </div>
            <div className='recommend-right'>
            </div>
        </div>
    );
}

export default Recommend;