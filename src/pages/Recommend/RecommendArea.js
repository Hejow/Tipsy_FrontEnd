import React from 'react';

const RecommendArea = ({recommends, setSelectedAlcohol}) => {

    return (
    <div className="recommend-box">
        <div>
            <ul className="recommend-items">
                {recommends && recommends.map(item => (
                    <li key={item.name} className="recommend-item">
                        <img className="recommend-img" 
                            alt="주종이미지" 
                            src={item.img} 
                            onClick ={()=> setSelectedAlcohol(item.name)}/>
                        <div className="recommend-itemExplain">
                            <div className="explain-box">
                                <p className="recommend-item-name">{item.name}</p>
                                <p className="recommend-item-contry">국가/생산지역: 미국</p>
                                <ul className="item-tag">
                                    {item.tags.map(tag => (
                                        <li key={tag}>{tag}</li>
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
