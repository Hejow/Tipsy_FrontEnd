import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({itemsPerPage, items, setCurrentItems}) => {
        const [pageCount, setPageCount] = useState(0) // 검색결과에 따라 다름
        const [itemOffset, setItemOffset] = useState(0) // 데이터를 가져왔는데 어디서부터 어디까지 자를건지
        
        useEffect(()=>{
                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(items.slice(itemOffset, endOffset))
                setPageCount(Math.ceil((items.length / itemsPerPage)))
        },[itemOffset, itemsPerPage, setCurrentItems, items])

        const handlePageClick = (e)=>{
          setItemOffset(e.selected * itemsPerPage % items.length)
        }
        
        return(
                <ReactPaginate className="pagination"
                nextLabel=">"
                previousLabel="<"
                // pageRangeDisplayed={itemsPerPage}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                />
        )   
} 


export default Pagination;