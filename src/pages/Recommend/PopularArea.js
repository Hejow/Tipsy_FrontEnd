import React, {useState, useEffect, useCallback} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const PopularArea = ({recommends}) => {
    const setting = {
        infinity: true,
        speed: 50,
        slidesToshow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoPlayspeed: 200,
        variableWidth: true,
        arrow: false,
    };

    let rank = 1;
    const topRecommends = recommends.sort((a,b) => a["clicked"] - b["clicked"]).slice(0, 10).map(item => ({
        rank: rank++,
        ...item,
    }));

    return(
        <div className="popular-box">
            <div className="search-area">
                <FontAwesomeIcon className="search-button" icon={faMagnifyingGlass}/>
                <SearchInput/>
            </div>
            <h2>Top 10</h2>
            <Slider className="popular-items" {...setting}>
                {topRecommends.map(item => (
                    <div key={item.name} className="popular-item">
                        <div className="popularItemHead">
                            <span className="num">{item.rank}</span>
                            <p className="item-name">{item.name}</p>
                        </div>
                        <div className="img-box">
                            <img className="img" alt="와인이미지" src={item.img}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PopularArea;