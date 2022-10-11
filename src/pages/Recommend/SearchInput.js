import React, {useState, useEffect, useCallback} from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
    const [searchText, setSearchText] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    
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

export default SearchInput;