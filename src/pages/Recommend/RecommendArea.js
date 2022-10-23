import React from 'react';

const RecommendArea = (props) => {

    return (
    <div className="recommend-box">
        <div>
            <ul className="recommend-items">
                {props.currentItems && props.currentItems.map(item => (
                    <li key={item.name} className="recommend-item">
                        <img className="recommend-img" 
                            alt="주종이미지" 
                            src={item.img} 
                            onClick ={()=> props.setSelectedAlcohol(item.name)}/>
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

export default RecommendArea;