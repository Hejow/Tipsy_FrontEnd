import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({itemsPerPage, items, setDisplayItems}) => {
        const [pageCount, setPageCount] = useState(0) // 검색결과에 따라 다름
        const [itemOffset, setItemOffset] = useState(0) // 데이터를 가져왔는데 어디서부터 어디까지 자를건지

        useEffect(()=>{
                const endOffset = itemOffset + itemsPerPage;
                setDisplayItems(items.slice(itemOffset, endOffset))
                setPageCount(Math.ceil((items.length / itemsPerPage)))
        },[itemOffset, itemsPerPage, setDisplayItems, items])

        return(
                <ReactPaginate className="rePagination"
                // breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                pageRangeDisplayed={itemsPerPage}
                renderOnZeroPageCount={null}
                onPageChange={(e) => setItemOffset(e.selected * itemsPerPage % items.length)}
                pageCount={pageCount}
                />
        )   
} 


export default Pagination;