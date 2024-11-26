import { calculateAverageRating, formatNumberWithCommas, calculateDistance, getDateRange, findFirstAvailableNights, formatDateRange } from '../services/util.service.js'
import starIcon from '../assets/imgs/icons/star.svg';
import { StaySlider } from './StaySlider.jsx';
import heart from "../assets/imgs/icons/heart1.svg"
import heartRed from "../assets/imgs/icons/heart.svg"
import { useState } from 'react';
import logo from '../assets/imgs/small-icon.png';


export function StayPreview({ stay, isFilterWhen }) {
    const [likedImages, setLikedImages] = useState({})

    const avgRating = calculateAverageRating(stay.reviews)

    const userLat = 31.7683
    const userLng = 35.2137

    const targetLat = stay.location.lat
    const targetLng = stay.location.lng

    const distance = calculateDistance(userLat, userLng, targetLat, targetLng)
    const roundedDistance = distance > 0 ? formatNumberWithCommas(Math.round(distance)) : '0'
    const price = formatNumberWithCommas(stay.price.night)

    const availableDates = findFirstAvailableNights(stay.reservedDates, 5)
    const freeDate = availableDates ? formatDateRange(availableDates) : ''

    function handleHeartClick(ev, stay) {
        ev.stopPropagation()
        ev.preventDefault()
        setLikedImages(prevLikedImages => ({
            ...prevLikedImages,
            [stay.id]: !prevLikedImages[stay.id]
        }))
    }

    if (!stay) {
        return (
            <div className="spinner-container">
                <img className="spinner" src={logo} alt="logo" />
            </div>
        )
    }

    return (
        <article className="stay-preview">
            <button className="btn-heart"
                onClick={(ev) => handleHeartClick(ev, stay)}
            >
                <svg style={{ fill: likedImages[stay.id] ? '#ff385c' : 'rgba(0, 0, 0, 0.5)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false">
                    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" stroke="aliceblue" strokeWidth="1.5" />
                </svg>
            </button>
            <div>
                <StaySlider images={stay.imgs} />
            </div>
            <div className="preview-details">
                <div>
                    <h4>{stay.location.city}, {stay.location.country}</h4>
                    <div className="rating">
                        {avgRating && (<>
                            <img src={starIcon} alt="Star Icon" className="star-icon" />
                            <span>{avgRating}</span> </>
                        )} </div>
                </div>
                <h4 className="light"> {roundedDistance} kilometers away</h4>
                {isFilterWhen ? <h4 className="light hidden">{freeDate}</h4> : <h4 className="light">{freeDate}</h4>}
                <h4>${price} <span>night</span></h4>
            </div>
        </article>
    )
}
