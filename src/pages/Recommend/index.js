import React, {useCallback, useEffect, useState} from 'react'
import "./Recommend.scss";
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Recommend = () => {
    function SearchInput(){
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
        
        return(
            <input value={searchText} 
            type="text" 
            className="search-bar" 
            placeholder="검색어 입력 후 ENTER"
            onChange={onChangeInput}
            onKeyUp={OnKeyUp}></input>
            )   
        };
        
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
        
    const Modal = styled.div`
        position: fixed;
        left: 50%;
        transform: translate(-50%, 50%);        
        border-radius: 8px;
        color: var(--text);
        overflow: auto;
        background-color: var(--primary);
        border: 3px solid var(--secondary);
        padding: 16px;
        box-shadow: 8px 8px 12px -1px rgb(0 0 0 / 0.3);

        width: 600px;
        `;

    const ModalImg = styled.div`
        width: 100%;
    `;
        
    const DetailRow = styled.div`
        & > * {
            margin-right: 6px;
        };
    `;

    const ImageModal = ({currentImageDetail}) => {
        const {largeImage} = currentImageDetail;
        return(
            <Modal>
                <ModalImg src={largeImage}/>
                <p>태그, 태그, 태그</p>
                <DetailRow>
                    <p>123명이 좋아합니다.</p>
                </DetailRow>
                <p>12345 조회</p>
            </Modal>
        );
    };
    

    const recommendItem = [
        {id: 1, title: "헌드레드 에이커", img:"img/와인1.png", tags: ["#달콤한 맛", "#약한 도수", "#값이 싼", "#가벼운"]},
        {id: 2, title: "리카솔리", img:"img/와인2.png", tags: ["태그1", "태그2", "태그3", "태그4"]},
        {id: 3, title: "볼게리 로쏘", img:"img/와인3.png", tags: ["태그5", "태그6", "태그7", "태그8"]},
        {id: 4, title: "라포스톨", img:"img/와인4.png", tags: ["태그9", "태그10", "태그11", "태그12"]},
        {id: 5, title: "샤또팔레 카디날", img:"img/와인5.png", tags: ["태그13", "태그14", "태그15", "태그16"]}
    ];
    
    
    return(
        <div className="recommend-area">
            <div className="recommend-content">
                <div className="popular-box">
                    <h2>최근 급상승 인기 상품을 소개해드립니다.</h2>
                    <h1>와인 인기 조회 상품</h1>
                    <div className="popular-items">
                        {recommendItem.map(item =>(
                            <a key={item.id} href="/" className="popular-item">
                                <span className="num">{item.id.toString()}</span>
                                <div className="img-box"><img className="img" alt="와인이미지" src={item.img}></img></div>
                                <p className="item-name">{item.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="recommend-box">
                    <div className="bar">
                        <div className="total-num">전체 {recommendItem.length}개</div>
                        <div className="search-area">
                            {SearchInput()}
                        </div>
                        {/* <div className="filter-area"></div> */}
                    </div>
                    <div>
                        <ul className="recommend-items">
                            {currentImageDetail && (<ImageModal largeImage={recommendItem.img} currentImageDetail={currentImageDetail}/>)}
                            {recommendItem.map(item => (
                                <li key={item.title} className="recommend-item">
                                    <div className="left" >
                                        <img className="recommend-img" alt="와인이미지" src={item.img} onClick ={()=> setCurrentImageDetail(item.img)}></img>
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
            </div>
        </div>
    );
}

export default Recommend;