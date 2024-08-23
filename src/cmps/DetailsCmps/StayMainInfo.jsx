import starIcon from '../../assets/imgs/icons/star.svg'; // Adjust the path based on your project structure
import { ShowMoreCmp } from '../ShowMoreCmp.jsx';

export function StayMainInfo({ stay }) {
    console.log(stay)
    console.log('stay highlights', stay.hightlights
    )

    // Handle case where reviews might be empty or undefined
    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0



    return (
        <section className="main-info">
            <div className="initial-info">
                <h2>
                    {stay.type !== 'room' && 'Entire'} <span className="type">{stay.type}</span> in {stay.location.city}, {stay.location.country}
                </h2>

                <div className="capacity">
                    <span>{stay.sleep.maxCapacity} guests</span>•
                    <span>{stay.sleep.bedrooms} bedrooms</span>•
                    <span>{stay.sleep.beds} beds</span>•
                    <span>{stay.sleep.bathrooms} bathrooms</span>
                </div>

                <div className="rating">
                    <img src={starIcon} alt="Star Icon" className="star-icon" />
                    <span>{avgRating.toFixed(1)}</span>•
                    <span className="reviews-number">{totalReviews} reviews</span>
                </div>
            </div>

            <div className="host-info">
                {stay.host && (
                    <>
                        <img src={stay.host.imgUrl} alt={`${stay.host.fullname}'s profile`} className="host-img" />
                        <p>Hosted by {stay.host.fullname}</p>
                    </>
                )}
            </div>

            <div className="highlights">
                {stay.highlights && stay.highlights.map((highlight, index) => (
                    <div key={index} className="highlight">
                        <img src={highlight.imgUrl} alt={highlight.main} className="highlight-img" />
                        <div className="highlight-txt">
                            <h3>{highlight.main}</h3>
                            <p>{highlight.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="description">
                <ShowMoreCmp
                    content={stay.description}
                    limit={200}
                    type="description"
                />
            </div>
        </section>
    )
}


