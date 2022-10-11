import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const RePagination = ({recommendItem, setCurentItems}) => {
    const itemsPerPage = 6; // 한 페이지당 몇 개의 아이템을 보여줄지
    const [pageCount, setPageCount] = useState(0) // 검색결과에 따라 다름
    const [itemOffset, setItemOffset] = useState(0) // 데이터를 가져왔는데 어디서부터 어디까지 자를건지
    
    useEffect(()=>{
      const endOffset = itemOffset + itemsPerPage;
      // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurentItems(recommendItem.slice(itemOffset, endOffset))
      setPageCount(Math.ceil((recommendItem.length ?? 0 / itemsPerPage)))
    },[itemOffset, itemsPerPage, setCurentItems, recommendItem])
  
    const handlePageClick = (e)=>{
      setItemOffset(e.selected * itemsPerPage % recommendItem.length)
    }
  
    return(
          <>
            <ReactPaginate className="rePagination"
              // breakLabel="..."
              nextLabel=">"
              previousLabel="<"
              pageRangeDisplayed={10}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              pageCount={pageCount}
            />
          </>
    )
}

export default RePagination;