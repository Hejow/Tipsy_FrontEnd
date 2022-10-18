import React from 'react';
import { getDownloadURL, ref } from "firebase/storage";

const RecommendArea = (props) => {

    return (
    <div className="recommend-box">
        <div>
            <ul className="recommend-items">
                {props.currentItems && props.currentItems.map(item => (
                    <li key={item.title} className="recommend-item">
                        { // item의 이미지 경로로 storage에서 이미지 url을 가져와서 img 태그 생성
                        /* {getDownloadURL(item.img).then(url => {
                            <img className="recommend-img" src={url} alt={item.name}
                                onClick ={()=> props.setCurrentImageDetail(item.img)}/>
                        }).catch(e => console.log(e.message))} */}
                        <img className="recommend-img" 
                            alt="와인이미지" 
                            src={item.img} 
                            onClick ={()=> props.setCurrentImageDetail(item.img)}></img>
                        <div className="recommend-itemExplain">
                            <div className="explain-box">
                                <p className="recommend-item-name">{item.title}</p>
                                <p className="recommend-item-contry">국가/생산지역: 미국</p>
                                <ul className="item-tag">
                                    {item.tags.map(tag => (
                                        <li key={tag}><a href='/'>{tag}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}

export default RecommendArea;