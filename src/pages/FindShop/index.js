import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./FindShop.scss";


const FindShop = () => {
    const [filterOption, setFilterOption] = useState("ranking");
    const alchohols = ["와인", "위스키", "칵테일"];
    const cities = ["서울특별시", "부산", "인천광역시", "수원", "대전", "대구", "광주"];
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        });
    };

    return(
        <div className="findshop-area">
            <div className="findshop-map-area">
                <div className="findshop-map">
                    여기에 카카오 맵~
                </div>
                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/> 주종</p>
                    <div className="findshop-filter-tags">
                        {alchohols.map(a => 
                            <ul key={a.toString()} className="findshop-filter-tag pointer">{a}</ul>
                        )}
                    </div>
                </div>
                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/> 지역</p>
                    <div className="findshop-filter-tags">
                        {cities.map(c => 
                            <ul key={c.toString()} className="findshop-filter-tag pointer">{c}</ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="findshop-detail-area">
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
                            placeholder="검색"
                            />
                    </div>
                </div> 
                <div className="findshop-shop-filter">
                    <span className={filterOption === "ranking" ? "pointer font-selected" : "pointer"}>추천순</span>
                    <span> | </span>
                    <span className={filterOption === "distance" ? "pointer font-selected" : "pointer"}>거리순</span>
                </div>
            </div>
        </div>
    )
};

export default FindShop;