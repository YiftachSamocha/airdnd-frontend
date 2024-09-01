import React from "react";
import Slider from "react-slick";
// import { PrevArrow, NextArrow } from 'react-slick/lib/slide';
// import Dots from 'react-slick/lib/dots';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../assets/imgs/icons/arrow-right.svg"
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"
import heart from "../assets/imgs/icons/heart.svg"


export function StaySlider({ images }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
    
    const handleHeartClick = () => {
        alert("כפתור הלב נלחץ!");
    }
    
    return (
        <div className="slider-container">
             {/* <img src={heart} alt={`btn-heart`} className="btn-heart"/> */}
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div className="img-body"
                        key={index}>
                        <img src={img} alt={`slide-${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

// return (
//     <div className="slider-container">
//         <Slider {...settings}>
//             {images.map((img, index) => (
//                 <div className="img-container" key={index}>
//                     <img src={img} alt={`image-${index}`} className="slider-image"/>
//                     {/* {index === 0 && (
//                         <button className="btn-heart" onClick={handleHeartClick}>
//                             <img src={heart} alt={`btn-heart`} />
//                         </button>
//                     )} */}
//                 </div>
//             ))}
//         </Slider>
//     </div>
// )
// }


const PrevArrow = ({ className, style, onClick }) => (
    <div
        className={`custom-arrow ${className}`}
        style={{
            ...style,
            background: `url(${arrowLeft}) no-repeat center center`,
            backgroundSize: 'contain',
            backgroundSize: '13px',
            backgroundColor: 'white',
            width: '30px', height: '30px'
        }}
        onClick={onClick}
    >
    </div>
)

const NextArrow = ({ className, style, onClick }) => (
    <div
        className={`custom-arrow ${className}`}
        style={{
            ...style,
            background: `url(${arrowRight}) no-repeat center center`,
            backgroundSize: 'contain',
            backgroundColor: 'white',
            backgroundSize: '15px',
            width: '30px', height: '30px',
            transition: 'all 0.5s ease',
            '&:hover': {
                transform: 'translateY(-3px)',
            }
        }}
        onClick={onClick}
    >
    </div>
)




