import { calculateAverageRating, formatRating, formatNumberWithCommas, calculateDistance } from '../services/util.service.js'

export function StayPreview({ stay }) {

    const averageRating = calculateAverageRating(stay.reviews)
    const formattedRating = formatRating(averageRating)

    const userLat = 32.07
    const userLng = 34.78

    const targetLat = stay.location.lat
    const targetLng = stay.location.lng

    const distance = calculateDistance(userLat, userLng, targetLat, targetLng)

    const roundedDistance = distance > 0 ? formatNumberWithCommas(Math.round(distance)) : '0'




    return <article className="stay-preview">
        <img src={stay.imgs[0]} alt="" />
        <div>
            <h3>{stay.location.city}, {stay.location.country}</h3>
            {formattedRating ? (
                <h3>&#9733; {formattedRating}</h3>
            ) : (
                '')}
        </div>
        <h3 className="light"> {roundedDistance} kilometers away</h3>
        <h3>${stay.price.night} night</h3>
    </article>


    {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-star" /> */ }
}
