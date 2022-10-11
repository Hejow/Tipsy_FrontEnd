import React from "react";



const BarArea = ({recommendItem}) => {
    return (
        <div className="bar">
            <div className="total-num">전체 {recommendItem.length}개</div>

            {/* <div className="filter-area"></div> */}
        </div>
    )
}

export default BarArea;