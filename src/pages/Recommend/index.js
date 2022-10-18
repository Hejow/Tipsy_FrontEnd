import React, {useState, useRef, useCallback, useEffect} from 'react'
import "./Recommend.scss";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {PopularArea, BarArea, RecommendArea, NavBar, RePagination, CommentInput, Comment} from './';
import PopularArea from './PopularArea';
import BarArea from './BarArea';
import RecommendArea from './RecommendArea';
import NavBar from './NavBar';
import RePagination from './RePagination';
import CommentInput from './CommentInput';
import Comment from './Comment';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, collectionGroup, query, where, collection } from "firebase/firestore";

const recommendItem = [
    {id: 1, title: "헌드레드 에이커", img:"img/와인1.png", tags: ["#달콤한 맛", "#약한 도수", "#값이 싼", "#가벼운"]},
    {id: 2, title: "리카솔리", img:"img/와인2.png", tags: ["태그1", "태그2", "태그3", "태그4"]},
    {id: 3, title: "볼게리 로쏘", img:"img/와인3.png", tags: ["태그5", "태그6", "태그7", "태그8"]},
    {id: 4, title: "라포스톨", img:"img/와인4.png", tags: ["태그9", "태그10", "태그11", "태그12"]},
    {id: 5, title: "샤또팔레 카디날", img:"img/와인5.png", tags: ["태그13", "태그14", "태그15", "태그16"]},
    {id: 6, title: "어준혁", img:"img/와인1.png", tags: ["태그17", "태그18", "태그19", "태그20"]},
    {id: 7, title: "어준카", img:"img/와인1.png", tags: ["태그21", "태그22", "태그23", "태그24"]},
    {id: 8, title: "어준오", img:"img/와인1.png", tags: ["태그25", "태그26", "태그27", "태그28"]},
    {id: 9, title: "어준미", img:"img/와인1.png", tags: ["태그29", "태그30", "태그31", "태그32"]},
    {id: 10, title: "어준지", img:"img/와인1.png", tags: ["태그33", "태그34", "태그35", "태그36"]},
];

const Recommend = () => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    const [currentItems, setCurentItems] = useState([]) // 전체 데이터를 잘라서 currentItems에 넣음
    // DB에서 가져온 전체 추천 데이터
    const [recommends, setRecommends] = useState([]); 
    // 모달이 열릴 때마다 DB에서 가져온 댓글 데이터
    const [comments, setComments] = useState([]);
    // 모달이 열릴 때 keyRef 설정
    const [keyRef, setKeyRef] = useState(null);
    // keyRef가 설정되면 PK 설정
    const [commentPK, setCommentPK] = useState(0)
    const nextId = useRef(1);

    const onInsert = useCallback((name, content)=>{
        const comment = {
            id: nextId.current,
            name,
            content,
        };
        setComments(comments => comments.concat(comment));
        nextId.current += 1;
    }, [])

    // docRef 가져오기
    const getKeyRef = () => { setKeyRef(doc(db, "appData", "commentPK")); };

    // docRef로 PK 가져오기
    const getPK = (ref) => (
        getDoc(ref)
            .then(PK => setCommentPK(PK))
            .catch(e => console.log(e.message))
    );

    // page load시 firebase에서 cocktailData를 가져온다
    useEffect(() => {
        getDocs(collectionGroup(db, "cocktailData")).then(snapShot => {
            const alcoholData = snapShot.docChanges().map(change => ({
                    name: change.doc.id,
                    img: change.doc.data().img,
                    tags: change.doc.data().tags,
                    clicked: change.doc.data().clicked
                }
            ));
            setRecommends(alcoholData);
        }).catch(e => console.log(e.message));
    }, [])

    // 모달 클릭 시 firebase에서 comments를 가져온다 (임시)
    useState(() => {
        getDocs(query(collection(db, "comment"), where("alcohol", "==", "마티니")))
        .then(snapShot => {
            const commentData = snapShot.docs.map(doc => ({
                writer: doc.data().writer,
                content: doc.data().content,
                time: doc.data().updated_at
            }));
            setComments(commentData);
        }).catch(e => console.log(e.message));
    }, [])

    const ImageModal = ({currentImageDetail}) => {
        const handleClick = () => { setCurrentImageDetail(null); }

        return(
            <div className = "modal">
                <img className="modalImg" src={currentImageDetail} alt="자세히보기창"/>
                <div className="modalContents">
                    <div className="modal-header">
                        <div className='modal-itemName'>상품명</div>
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
                <div className="xButton" onClick={handleClick}>
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
                {currentImageDetail && (<ImageModal currentImageDetail={currentImageDetail}/>)}
                <PopularArea recommendItem={recommendItem}/>
                <BarArea recommendItem={recommendItem}/>
                <RecommendArea currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}  
                    currentItems={currentItems} 
                    recommendItem={recommendItem}/>
                <RePagination recommendItem={recommendItem} currentItems={currentItems} setCurentItems={setCurentItems}/>
            </div>
            <div className='recommend-right'>
            </div>
        </div>
    );
}

export default Recommend;