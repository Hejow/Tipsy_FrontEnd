import React, {useState, useEffect, useCallback} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Slider from "./ImageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
    const [searchText, setSearchText] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    // const location = useLocation();
    // const search = newURLSearchParams(location.search).get("q");
    // useQuery(["allResult", search], ());
    useEffect(()=>{
        setSearchText(searchParams.get("q")?? "")},[searchParams])
        
    const onChangeInput = useCallback((e) => {
        setSearchText(e.target.value)
    },[])
    
    const OnKeyUp = useCallback((e) =>{
        if(e.key === 'Enter' && e.target.value.trim().length > 0){
            setSearchParams({q: e.target.value})
        }
    },[setSearchParams])
    
    return (
        <input value={searchText} 
        type="text" 
        className="search-bar" 
        placeholder="검색"
        onChange={onChangeInput}
        onKeyUp={OnKeyUp}></input>
    );
}

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