import React, { useState, useEffect, useCallback } from "react";
import { Shop, KakaoMap, Modal } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./FindShop.scss";
import { db } from '../../firebase';
import { getDoc, updateDoc, doc, setDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import CryptoJS from "crypto-js";

const FindShop = () => {
    const [filterOption, setFilterOption] = useState("rank");
    const [selectedShop, setSelectedShop] = useState(null);
    const [currentItems, setCurentItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [keyword, setKeyword] = useState("와인");
    const [keyRef, setKeyRef] = useState(null);
    const [userId, setUserId] = useState(null);

    const getUserId = () => {
        const userToken = window.sessionStorage.getItem("TIPSY");
        if (userToken !== null) {
            const bytes = CryptoJS.AES.decrypt(userToken, process.env.REACT_APP_SECRET_KEY);
            setUserId(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).id);
        } else return;
    };

    const getKeyRef = useCallback(() => {
        setKeyRef(doc(db, "appData", "reviewPK"));
    }, []);

    const filters = {
        alchohols: ["와인", "위스키", "칵테일"],
        cities: ["서울", "부산", "인천", "수원", "대전", "대구", "광주"]
    }

    const tmpData = {
        img: "이미지",
        name: "가게이름",
        description: "가게 특징/한줄평",
        city: "지역",
        reviews: 5.0,
        tags: ["와인", "칵테일", "위스키"]
    }

    useEffect(() => {
        console.log("FindShop Effected");
        getKeyRef();
        getUserId();
        setShops([tmpData, tmpData, tmpData, tmpData, tmpData, tmpData]);
    }, [getKeyRef])

    return(
        <div className="findshop-area">            
            {selectedShop && <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "rgb(255, 255, 255, 0.7)"
            }}/>}
            <div className="findshop-map-area">
                <div className="findshop-map">
                    <KakaoMap keyword={keyword}/>
                </div>
                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/> 주종</p>
                    <div className="findshop-filter-tags">
                        {filters.alchohols.map(a => 
                            <ul key={a.toString()} className="findshop-filter-tag pointer" onClick={()=>setKeyword(a + "바")}>{a}</ul>
                        )}
                    </div>
                </div>
                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/> 지역</p>
                    <div className="findshop-filter-tags">
                        {filters.cities.map(c => 
                            <ul key={c.toString()} className="findshop-filter-tag pointer">{c}</ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="findshop-detail-area">
                {selectedShop && <Modal 
                    userId={userId}
                    keyRef={keyRef}
                    selectedShop={selectedShop}
                    setSelectedShop={setSelectedShop}/>}
                <div className="findshop-search-area">
                    <div className="findshop-search-option">
                        <select name="search" id="search">
                            <option value="city">지역</option>
                        </select>
                    </div>
                    <div className="findshop-search-input">
                        <FontAwesomeIcon className="findshop-icon" icon={faMagnifyingGlass}/>
                        <input className="findshop-input-box"
                            type="text"
                            placeholder="검색"/>
                    </div>
                </div> 
                <div className="findshop-shop-filter">
                    <span className={filterOption === "rank" ? "pointer font-selected" : "pointer"}>추천순</span>
                    <span> | </span>
                    <span className={filterOption === "distance" ? "pointer font-selected" : "pointer"}>거리순</span>
                </div>
                <div className="findshop-shop-area">
                    <Shop tmpData={tmpData} setSelectedShop={setSelectedShop}></Shop>
                </div>
            </div>
        </div>
    )
};

export default FindShop;