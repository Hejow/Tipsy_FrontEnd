import React from 'react';

const RecommendArea = (props) => {
    return (
    <div className="recommend-box">
        <div>
            <ul className="recommend-items">
                {props.currentItems && props.currentItems.map(item => (
                    <li key={item.id} className="recommend-item">
                        <img className="recommend-img" alt="와인이미지" src={item.img} onClick ={()=> {
                            props.setCurrentImageDetail(item.img)
                            props.setModalContents(item)
                            }}></img>
                        <div className="recommend-itemExplain">
                            <div className="explain-box">
                                <p className="recommend-item-name">{item.id}</p>
                                <p className="recommend-item-contry">국가/생산지역:<span>{item.from}</span></p>
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