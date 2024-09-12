import { useSelector } from "react-redux";
import { loadUsers } from "../../store/actions/user.actions";
import { useEffect } from "react";
import starIcon from '../../assets/imgs/icons/star.svg';
import cleanliness from '../../assets/imgs/rating/cleanliness.svg';
import value from '../../assets/imgs/rating/value.svg';
import location from '../../assets/imgs/rating/location.svg';
import accuracy from '../../assets/imgs/rating/accuracy.svg';
import checkIn from '../../assets/imgs/rating/checkIn.svg';
import communication from '../../assets/imgs/rating/communication.svg';
import { ReviewPreview } from './ReviewPreview.jsx'
import { calculateCategoryAverages } from "../../services/util.service.js";



export function StayReview({ stay }) {
    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0
    console.log(stay.reviews[0].ratingCategories)

    // console.log('Type of stay.reviews:', typeof stay.reviews)
    // console.log('Is Array:', Array.isArray(stay.reviews))
    const reviewsToShow = stay.reviews.slice(0, 6)

    function RatingCategories({ categories }) {
        const categoryIcons = {
            cleanliness,
            accuracy,
            checkIn,
            communication,
            location,
            value,
        }
    }

    const averages = calculateCategoryAverages(stay.reviews)
    console.log(averages);





    if (!stay.reviews) return <div>Loading...</div>


    // console.log(stay.reviews.by._id);
    return (
        <section className="reviews-stay">
            <div className="rating">
                <img src={starIcon} alt="Star Icon" className="star-icon" />
                <span>{avgRating.toFixed(1)}</span><span className="dot-big">•</span>
                <span className="reviews-number">{totalReviews} reviews</span>
            </div>
            <div className="rating-categories">
                {/* <ul>
                    {Object.entries(categories).map(([category, rating]) => (
                        <li key={category} className={`rating-category ${category}`}>
                            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            <h4>{rating.toFixed(1)}</h4>
                            <img
                                src={categoryIcons[category]}
                                alt={`${category} icon`}
                                className={`icon ${category}`}
                            />
                        </li>
                    ))}
                </ul> */}
            </div>
         
            {/* <div className="rating-categories">
                <h3>Cleanliness</h3>
                <h4>{averages.cleanliness}</h4>
                <img src={cleanliness} alt="Cleanliness-icon" className="cleanliness icon" />
                <h3>Accuracy</h3>
                <h4>{averages.accuracy}</h4>
                <img src={accuracy} alt="Accuracy-icon" className="accuracy icon" />
                <h3>Check-in</h3>
                <h4>{averages.checkIn}</h4>
                <img src={checkIn} alt="Check-in-icon" className="checkIn icon" />
                <h3>Communication</h3>
                <h4>{averages.communication}</h4>
                <img src={communication} alt="Communication-icon" className="communication icon" />
                <h3>Location</h3>
                <h4>{averages.location}</h4>
                <img src={location} alt="Location-icon" className="location icon" />
                <h3>Value</h3>
                <h4>{averages.value}</h4>
                <img src={value} alt="Value-icon" className="value icon" />
            </div> */}
            <section>
                <ul className="reviews-list">
                    {reviewsToShow.map(review => {
                        return (
                            <li key={review._id}>
                                <ReviewPreview review={review} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </section>
    )
}




