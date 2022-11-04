import React from 'react';
import './Shop.scss';

// 별점 처리 -> 리뷰에서 별 개수로 평점내기
const Shop = ({tmpData, setSelectedShop}) => {
    return (
        <div className='shop-container pointer' onClick={() => setSelectedShop(tmpData.name)}>
            <div className='shop-img-area'>
                {tmpData.img}
            </div>
            <div className='shop-detail-area'>
                <div className='shop-title-area'>
                    <p className='shop-name'>{tmpData.name}</p>
                    <p className='shop-city'>{tmpData.city}</p>
                </div>
                <p className='shop-description'>{tmpData.description}</p>
                <div className='shop-review-area'>
                    <p className='shop-review'>☆☆☆☆☆ {tmpData.reviews}</p>
                    <span className='shop-review-count'>00개</span>
                </div>
                <div className='shop-tag-area'>
                    {tmpData.tags.map(tag => (
                        <span key={tag.toString()} className="shop-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )   
}


export default Shop;