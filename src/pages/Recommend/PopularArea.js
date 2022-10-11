import React from "react";
import Slider from "./ImageSlider";
import SearchInput from './SearchInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PopularArea = ({recommendItem}) => {
    return(
        <div className="popular-box">
            <div className="search-area">
                <FontAwesomeIcon className="search-button" icon={faMagnifyingGlass}/>
                <SearchInput/>
            </div>
            <h2>Top 10</h2>
            <Slider item={recommendItem}/>            
        </div>
    );
}

export default PopularArea;