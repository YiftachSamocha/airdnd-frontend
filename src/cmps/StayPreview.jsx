import { calculateAverageRating, formatRating, formatNumberWithCommas, calculateDistance, getDateRange, findFirstAvailableNights, formatDateRange } from '../services/util.service.js'
import starIcon from '../assets/imgs/icons/star.svg';
import { StaySlider } from './StaySlider.jsx';
import heart from "../assets/imgs/icons/heart1.svg"
import heartRed from "../assets/imgs/icons/heart.svg"
import { useState } from 'react';

export function StayPreview({ stay }) {
    const [likedImages, setLikedImages] = useState({});

    const averageRating = calculateAverageRating(stay.reviews)
    const formattedRating = formatRating(averageRating)

    const userLat = 31.7683
    const userLng = 35.2137

    const targetLat = stay.location.lat
    const targetLng = stay.location.lng

    const distance = calculateDistance(userLat, userLng, targetLat, targetLng)
    const roundedDistance = distance > 0 ? formatNumberWithCommas(Math.round(distance)) : '0'
    const price = formatNumberWithCommas(stay.price.night)
    const availableDates = findFirstAvailableNights(stay.reservedDates, 5)
    const freeDate = formatDateRange(availableDates)

    function handleHeartClick(ev, stay) {
        ev.stopPropagation()
        ev.preventDefault()
        setLikedImages(prevLikedImages => ({
            ...prevLikedImages,
            [stay.id]: !prevLikedImages[stay.id]        }))
    }


    return (
        <article className="stay-preview">
            <button className="btn-heart"
                onClick={(ev) => handleHeartClick(ev, stay)}
                >
                    {likedImages[stay.id] ?  <span 
            style={{ 
                fontSize: '20px', 
                textShadow: '0  0 3px  white',
                position: 'relative',
                top: '-4px',  
                left: '4px'   
            }}>❤️
          </span> 
                    : <img src={heart} alt="heart" style={{ width: '24px', height: '24px' }} />}
            </button>
            <div>
                <StaySlider images={stay.imgs} />
            </div>
            <div className="preview-details">
                <div>
                    <h4>{stay.location.city}, {stay.location.country}</h4>
                    <div className="rating">
                        {formattedRating && (<>
                            <img src={starIcon} alt="Star Icon" className="star-icon" />
                            <span> {formattedRating}</span> </>
                        )} </div>
                </div>
                <h4 className="light"> {roundedDistance} kilometers away</h4>
                <h4 className="light">{freeDate}</h4>
                <h4>${price} <span>night</span></h4>
            </div>
        </article>
    )
}
