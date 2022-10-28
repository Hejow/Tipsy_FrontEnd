import React from 'react';
import './Shop.scss';

// 별점 처리 -> 리뷰에서 별 개수로 평점내기
const Shop = (props) => {
    return (
        <div className='shop-container pointer' onClick={() => props.setCurrentShop(true)}>
            <div className='shop-img-area'>
                {props.tmp.img}
            </div>
            <div className='shop-detail-area'>
                <div className='shop-title-area'>
                    <p className='shop-name'>{props.tmp.name}</p>
                    <p className='shop-city'>{props.tmp.city}</p>
                </div>
                <p className='shop-description'>{props.tmp.description}</p>
                <div className='shop-review-area'>
                    <p className='shop-review'>☆☆☆☆☆ {props.tmp.reviews}</p>
                    <span className='shop-review-count'>00개</span>
                </div>
                <div className='shop-tag-area'>
                    {props.tmp.tags.map(tag => (
                        <span key={tag.toString()} className="shop-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )   
}


export default Shop;