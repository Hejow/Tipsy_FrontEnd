import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const ImageSlider = (props) => {
    const setting = {
        infinity: true,
        speed: 50,
        slidesToshow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoPlayspeed: 200,
        variableWidth: true,
        arrow: false,
    };
    


    return(
        <div>
            <Slider className="popular-items" {...setting}>
                {props.item.map(item =>(
                    <div key={item.id} className="popular-item">
                        <div className="popularItemHead">
                            <span className="num">{item.id.toString()}</span>
                            <p className="item-name">{item.title}</p>
                        </div>
                        <div href="/" className="img-box"><img className="img" alt="와인이미지" src={item.img}></img></div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ImageSlider;

