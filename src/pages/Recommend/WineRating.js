import React, { useState } from 'react';
import { Rating } from "react-simple-star-rating";

const WineRating = () => {
    const [wineRating, setWineRating] = useState([
        {
            sugarContent: 0,
            acidity: 0,
            body: 0,
            tannin: 0,
        }
    ]);
    return(
        <>
            <Rating
            className='wine-rating'
            readonly={true}
            size={22}/>
        </>
    )
}

export default WineRating;