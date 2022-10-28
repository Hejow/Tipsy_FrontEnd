import React, {useState, useEffect} from 'react'
import "./Recommend.scss";
import { faXmark, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopularArea from './PopularArea';
import RecommendArea from './RecommendArea';
import NavBar from './NavBar';
import Pagination from '../../components/Pagination';
import { db } from '../../firebase';
import { getDocs, doc, getDoc, collectionGroup, query, where, collection } from "firebase/firestore";

const Recommend = () => {
    const [selectedAlcohol, setSelectedAlcohol] = useState(null); // 선택된 주종 이름 설정
    const [selectedDetail, setSelectedDetail] = useState(null); // 선택된 주종에 따른 디테일 정보
    const [recommends, setRecommends] = useState([]); // DB에서 가져온 전체 추천 데이터 
    const [comments, setComments] = useState([]); // 모달이 열릴 때마다 DB에서 가져온 댓글 데이터 
    const [keyRef, setKeyRef] = useState(null);
    const [commentPK, setCommentPK] = useState(0) // 기본키(PK) - 추가, 수정, 삭제
    const [input, setInput] = useState("");

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

    // docRef(키 주소) 가져오기
    const getKeyRef = () => { setKeyRef(doc(db, "appData", "commentPK")); };

    // docRef로 기본키(PK) 가져오기 (댓글 추가)
    const getPK = (ref) => (
        getDoc(ref)
            .then(PK => setCommentPK(PK))
            .catch(e => console.log(e.message))
    );

    // type(String : "cocktail", "wiskey", "wine")에 해당되는 주류 데이터 가져오기
    const getAlcoholsByType = (type) => {
        const alcoholType = type + "Data";
        getDocs(collectionGroup(db, alcoholType)).then(snapShot => {
            const alcoholList = snapShot.docChanges().map(change => ({
                    name: change.doc.id,
                    img:  "https://firebasestorage.googleapis.com/v0/b/mytype-8123d.appspot.com/o/" + change.doc.data().img + "?alt=media",
                    tags: change.doc.data().tags,
                    clicked: change.doc.data().clicked
                }
            ));
            setRecommends(alcoholList);
        }).catch(e => console.log(e.message));
    };

    // 주종과 이름으로 디테일 정보 가져오기
    const getSelectedDetailByName = (type, alcohol) => {
        const alcoholType = type + "Data";
        
        getDoc(doc(db, alcoholType, alcohol)).then(doc => {
            setSelectedDetail(doc.data())
        }).catch(e => console.log(e.message))
    };

    // 모달 클릭 시 DB에서 comments 가져오기
    const getCommentsByAlcohol = (alcohol) => {
        getDocs(query(collection(db, "comment"), where("alcohol", "==", alcohol)))
        .then(snapShot => {
            const commentData = snapShot.docs.map(doc => ({
                writer: doc.data().writer,
                content: doc.data().content,
                time: doc.data().updated_at
            }));
            setComments(commentData);
        }).catch(e => console.log(e.message));
    }

    useEffect(() => {
        getAlcoholsByType("cocktail");
        getKeyRef();
    }, [])

    const ImageModal = ({selectedAlcohol}) => {
        return(
            <div className = "modal">
                <img className="modalImg" src="" alt="자세히보기창"/>
                <div className="modalContents">
                    <div className="modal-header">
                        <div className='modal-itemName'>상품명</div>
                        <div className='modal-itemScore'>평점</div>
                    </div>
                    <div className="modal-middle">
                        상품설명
                    </div>
                    <div className="modal-bottom">
                        <form className="CommentInsert" >
                            <p className="inputNames">아이디</p>
                            <input className='inputContents' 
                                type="text"
                                name="comment"
                                placeholder="댓글을 남겨보세요."
                                value={input}
                                onChange={e => setInput(e.target.value)} />
                            <button type='submit'>
                                <FontAwesomeIcon icon={faArrowTurnDown} />
                            </button>
                        </form>
                        <div className='comment'>
                            {comments.map(comment => (
                                <>
                                    <div className='commentBox'>
                                        <div className='commentName'>{comment.name}</div>
                                        <div className='commentContent'>{comment.content}</div>
                                    </div>
                                    <div className='btnBox'>
                                        <button>수정하기</button>
                                        <button>삭제하기</button>
                                    </div>
                                </>
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

    return(
        <div className="recommend-area">
            {selectedAlcohol && <div style={{
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
                {selectedAlcohol && 
                    (<ImageModal 
                        selectedAlcohol={selectedAlcohol}/>)}
                <PopularArea recommends={recommends}/>
                <div className="bar">
                    <div className="total-num">전체 {recommends.length}개</div>
                </div>
                <RecommendArea 
                    selectedAlcohol={selectedAlcohol}
                    setSelectedAlcohol={setSelectedAlcohol}  
                    recommends={recommends}/>
                <Pagination recommends={recommends}/>
            </div>
            <div className='recommend-right'>
            </div>
        </div>
    );
}

export default Recommend;