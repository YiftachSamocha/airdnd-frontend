import React, { useState } from "react";
import Slider from "react-slick";
// import { PrevArrow, NextArrow } from 'react-slick/lib/slide';
// import Dots from 'react-slick/lib/dots';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../assets/imgs/icons/arrow-right.svg"
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"


export function StaySlider({ images }) {
    const [showArrows, setShowArrows] = useState(false);
    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // arrows: false, // Set to false to use custom arrows
        beforeChange: (current, next) => {
            setIsAtStart(next === 0);
            setIsAtEnd(next === settings.slidesToShow - 1);
        },
        afterChange: (index) => {
            setIsAtStart(index === 0);
            setIsAtEnd(index === images.length - 1);
        }
    }



    return (
        <div className="slider-container">
            {/* onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}> */}
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div className="img-body"
                        key={index}>
                        <img src={img} alt={`slide-${index}`} />
                    </div>
                ))}
            </Slider >
            {/* {showArrows && (
                <>
                    <PrevArrow />
                    <NextArrow />
                </>
            )} */}
        </div>
    )
}


const PrevArrow = ({ className, style, onClick }) => (
    <div
        className={`custom-arrow ${className}`}
        style={{
            ...style,
            background: `url(${arrowLeft}) no-repeat center center`,
            backgroundSize: 'contain',
            backgroundSize: '13px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            width: '30px', height: '30px',
            '&:hover': {
                width: '40px', height: '40px',
                backgroundColor: 'white',
            }
            // opacity: 'isAtStart' ? 0 : 1,
            // transition: 'opacity 0.3s ease'
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backgroundSize: '15px',
            width: '30px', height: '30px',
            '&:hover': {
                width: '40px', height: '40px',
                backgroundColor: 'white',
            }
            // opacity: 'isAtEnd' ? 0 : 1,
            // transition: 'opacity 0.3s ease'
            // transition: 'all 0.5s ease',
            // '&:hover': {
            //     width: '40px', height: '40px',
            // }
        }}
        onClick={onClick}
    >
    </div>
)




