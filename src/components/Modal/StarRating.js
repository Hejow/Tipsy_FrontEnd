import React, { useState } from 'react';
import { Rating } from "react-simple-star-rating";

const StarRating = () => {
    const [rating, setRating] = useState(0);
    
    const handleRating = (rate) => {
        setRating(rate)
    }

    return(
        <div className="star-area">
            <Rating onClick={handleRating}
            initialValue={rating}
            className="star"
            size={20}/>
            {rating}
        </div>
    )
}

export default StarRating;