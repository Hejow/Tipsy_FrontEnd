import React from "react";
import SearchInput from './SearchInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const BarArea = ({recommendItem}) => {
    return (
        <div className="bar">
            <div className="total-num">전체 {recommendItem.length}개</div>
            <div className="search-area">
                <SearchInput/>
                <FontAwesomeIcon className="search-button" icon={faMagnifyingGlass}/>
            </div>
            {/* <div className="filter-area"></div> */}
        </div>
    )
}

export default BarArea;