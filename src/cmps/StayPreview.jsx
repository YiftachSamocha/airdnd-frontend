import { calculateAverageRating, formatRating, formatNumberWithCommas, calculateDistance, getDateRange } from '../services/util.service.js'
import starIcon from '../assets/imgs/icons/star.svg';

export function StayPreview({ stay }) {

    const averageRating = calculateAverageRating(stay.reviews)
    const formattedRating = formatRating(averageRating)

    const userLat = 31.7683
    const userLng = 35.2137

    const targetLat = stay.location.lat
    const targetLng = stay.location.lng

    const distance = calculateDistance(userLat, userLng, targetLat, targetLng)

    const roundedDistance = distance > 0 ? formatNumberWithCommas(Math.round(distance)) : '0'
    const price = formatNumberWithCommas(stay.price.night)
    const freeDate = getDateRange(stay.reservedDates) 

    return <article className="stay-preview">
        <img src={stay.imgs[0]} alt="" />
        <div>
            <h3>{stay.location.city}, {stay.location.country}</h3>
            <div className="rating">
                {formattedRating && (<>
                    <img src={starIcon} alt="Star Icon" className="star-icon" />
                    <span> {formattedRating}</span> </>
                )} </div>
        </div>
        <h3 className="light"> {roundedDistance} kilometers away</h3>
        <h3 className="light">{freeDate}</h3>
        <h3>${price} <span>night</span></h3>
    </article>
}
