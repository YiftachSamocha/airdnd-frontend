import starIcon from '../../assets/imgs/icons/star.svg'; // Adjust the path based on your project structure

export function StayMainInfo({ stay }) {
    console.log(stay)

    const avgRating = stay.reviews.reduce((sum, review) => sum + review.rate, 0) / stay.reviews.length;

    return <section className="main-info">
        <div className="initial-info">

            <h2>
                {stay.type !== 'room' && 'Entire'}
                <span className="type">{stay.type} </span>
                in {stay.location.city}, {stay.location.country}
            </h2>

            <div className="capacity">
                <span>{stay.capacity} guests</span>•
                <span>{stay.rooms.bedrooms} bedrooms</span>•
                <span>{stay.rooms.beds} beds</span>•
                <span>{stay.rooms.bathrooms} bathrooms</span>
            </div>

            <div className="rating">
                <img src={starIcon} alt="Star Icon" className="star-icon" />
                <span>{avgRating.toFixed(1)}</span>•
                <span className="reviews-number">{stay.reviews.length} reviews</span>
            </div>
        </div>

        <div className="host-info">
            <img src={stay.host.imgUrl} alt={`${stay.host.fullname}'s profile`} className="host-img" />
            <p>Hosted by {stay.host.fullname}</p>
        </div>
        <div className="highlights">
            {stay.hightlights.map((highlight, index) => (
                <div key={index} className="highlight">
                    <h3>{highlight.main}</h3>
                    <p>{highlight.sub}</p>
                </div>
            ))}
        </div>
        <div>
            <h2>About this place</h2>
            <p>{stay.description}</p>
        </div>
    </section>
}