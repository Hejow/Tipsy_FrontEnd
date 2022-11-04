import React, {useState, useEffect, useCallback} from 'react'
import "./Recommend.scss";
import Modal from "./Modal";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import PopularArea from "./PopularArea"
import RecommendArea from './RecommendArea';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { db } from '../../firebase';
import { getDocs, doc, collectionGroup } from "firebase/firestore";
import CryptoJS from "crypto-js";

const Recommend = () => {
    const [alcohol, setAlcohol] = useState("cocktail");
    const [defaultRecommends, setDefaultRecommends] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [selectedAlcohol, setSelectedAlcohol] = useState(null);
    const [currentItems, setCurentItems] = useState([]);
    const [keyRef, setKeyRef] = useState(null);
    const [userId, setUserId] = useState(null);
    const [input, setInput] = useState("");

    const onKeyUp = (e) => {
        if(e.key === 'Enter') {
            if (e.target.value.trim().length > 0) searchAlcohols();
            else setRecommends(defaultRecommends);
        }        
    };

    const searchAlcohols = () => {
        const filterdAlcoholList = recommends.filter(item => item.name.includes(input));
        setRecommends(filterdAlcoholList);
    }

    const getUserId = () => {
        const userToken = window.sessionStorage.getItem("TIPSY");
        if (userToken !== null) {
            const bytes = CryptoJS.AES.decrypt(userToken, process.env.REACT_APP_SECRET_KEY);
            setUserId(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).id);
        } else return;
    };

    const getKeyRef = useCallback(() => {
        setKeyRef(doc(db, "appData", "commentPK"));
    }, []);

    const getAlcoholsByType = useCallback(() => {
        const alcoholType = alcohol + "Data";
        getDocs(collectionGroup(db, alcoholType)).then(snapShot => {
            const alcoholList = snapShot.docChanges().map(change => ({
                    name: change.doc.id,
                    img:  "https://firebasestorage.googleapis.com/v0/b/mytype-8123d.appspot.com/o/" + change.doc.data().img + "?alt=media",
                    tags: change.doc.data().tags,
                    clicked: change.doc.data().clicked
                }
            ));
            setRecommends(alcoholList);
            setDefaultRecommends(alcoholList);
        }).catch(e => console.log(e.message));
    }, [alcohol]);

    useEffect(() => {
        console.log("Recommend effected");
        getAlcoholsByType();
        getKeyRef();
        getUserId();
    }, [getAlcoholsByType, getKeyRef])

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
                <NavBar setAlcohol={setAlcohol}/>
            </div>
            <div className="recommend-content">
                {selectedAlcohol && 
                    (<Modal 
                        userId={userId}
                        alcohol={alcohol}
                        keyRef={keyRef}
                        selectedAlcohol={selectedAlcohol}
                        setSelectedAlcohol={setSelectedAlcohol}
                        />)}
                <div className="search-area">
                    <FontAwesomeIcon 
                        className="search-button"
                        onClick={searchAlcohols}
                        icon={faMagnifyingGlass} />
                    <input className="search-bar" 
                        type="text" 
                        value={input} 
                        placeholder="검색"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={onKeyUp}/>
                </div>
                <PopularArea recommends={recommends}/>
                <div className="bar">
                    <div className="total-num">전체 {recommends.length}개</div>
                </div>
                <RecommendArea 
                    setSelectedAlcohol={setSelectedAlcohol}  
                    currentItems={currentItems} />
                <Pagination 
                    itemsPerPage={6}
                    items={recommends}
                    setCurentItems={setCurentItems}
                    />
            </div>
            <div className='recommend-right'></div>
        </div>
    );
}

export default Recommend;