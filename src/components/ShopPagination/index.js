import React, { useState, useEffect } from 'react';

const ShopPagination = ({shopData, setShopHasPage, setCurrentPage}) => {
    const [shopPageCount, setShopPageCount] = useState(0); // 검색결과에 따라 page 생성
    const [shopDataArr, setShopDataArr] = useState([]); // 페이지 번호를 위한 배열
    const dataArr = Array.from({length: shopData.dataCount}, (_, i) => i + 1); // 검색결과 수에 따른 배열 만들기
    // const arr1 = ["<", ">"]
    
    useEffect(()=>{
        setShopPageCount(Math.ceil((dataArr.length / 4)));
        setShopDataArr(Array.from({length: shopPageCount}, (_, i) => i + 1))
    },[setShopPageCount, dataArr.length, shopPageCount, setShopDataArr])
    
    // arr1.splice(1, 0, ...shopDataArr)
    // console.log(arr1)
    // console.log(shopData.data)
    
    return(
            <ul className="findshop-pagination">
                {shopDataArr.map((shops, index) => (
                    <li key={index} onClick={()=> 
                        {setCurrentPage(index+1)
                        setShopHasPage(true)}}>{shops}</li>
                ))}
            </ul>
            )
}

export default ShopPagination;