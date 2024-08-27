import React from "react";
import Slider from "react-slick";
// import { PrevArrow, NextArrow } from 'react-slick/lib/slide';
// import Dots from 'react-slick/lib/dots';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../assets/imgs/icons/arrow-right.svg"
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"


export function StaySlider({ images }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    }    

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div className="img-body" key={index}>
                        <img src={img} alt={`slide-${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}


const PrevArrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ 
            ...style, 
            display: 'block', 
            background:`url(${arrowLeft}) no-repeat center center`,
            // background
            width: '35px',
            height: '35px',
            backgroundSize: '15px', // גודל התמונה של החץ
        }}
        onClick={onClick}
    />
);

const NextArrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ 
            ...style, 
            display: 'block', 
            // background:`url(${arrowRight}) no-repeat center center`,
            width: '35px',
            height: '35px',
            // color: 'black',
            opacity:1,
            // backgroundColor:'black',
            // backgroundSize:'2px',
            backgroundSize: '5px', // גודל התמונה של החץ
        }}
        onClick={onClick}
    />
);



