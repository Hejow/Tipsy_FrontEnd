import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({itemsPerPage, items}) => {
        const [pageCount, setPageCount] = useState(0) // 검색결과에 따라 다름
        const [itemOffset, setItemOffset] = useState(0) // 데이터를 가져왔는데 어디서부터 어디까지 자를건지
        const [currentItems, setCurrentItems] = useState([]) // 전체 데이터를 잘라서 currentItems에 넣음
        
        useEffect(()=>{
                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(items.slice(itemOffset, endOffset))
                setPageCount(Math.ceil((items.length / itemsPerPage)))
        },[itemOffset, itemsPerPage, currentItems, items])

        const handlePageClick = (e)=>{
          setItemOffset(e.selected * itemsPerPage % items.length)
        }
        
        return(
                <ReactPaginate className="rePagination"
                // breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                pageRangeDisplayed={itemsPerPage}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                />
        )   
} 


export default Pagination;