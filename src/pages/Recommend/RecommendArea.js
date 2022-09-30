import React from 'react';

const RecommendArea = (props) => {

    return (
    <div className="recommend-box">
        <div>
            <ul className="recommend-items">
                {props.currentItems && props.currentItems.map(item => (
                    <li key={item.title} className="recommend-item">
                        <div className="left" >
                            <img className="recommend-img" alt="와인이미지" src={item.img} onClick ={()=> props.setCurrentImageDetail(item.img)}></img>
                        </div>
                        <div className="right">
                            <div className="explain-box">
                                <p className="recommend-item-name">{item.title}</p>
                                <p className="recommend-item-contry">국가/생산지역: 미국</p>
                                <p className="recommend-item-company">수입사: 신세계엘엔비</p>
                            </div>
                            <ul className="item-tag">
                                {item.tags.map(tag => (
                                    <li key={tag}><a href='/'>{tag}</a></li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}

export default RecommendArea;