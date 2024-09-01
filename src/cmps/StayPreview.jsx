import { calculateAverageRating, formatRating, formatNumberWithCommas, calculateDistance, getDateRange } from '../services/util.service.js'
import starIcon from '../assets/imgs/icons/star.svg';
import { StaySlider } from './StaySlider.jsx';

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
    // const freeDate = getDateRange(stay.reservedDates)


    return (
        <article className="stay-preview">
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
                {/* <h4 className="light">{freeDate}</h4> */}
                <h4>${price} <span>night</span></h4>
            </div>
        </article>
    )
}
