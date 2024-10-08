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

    const reviewsToShow = stay.reviews.slice(0, 6)
    const categories = {
        cleanliness,
        accuracy,
        checkIn,
        communication,
        location,
        value,
    }
    const averages = calculateCategoryAverages(stay.reviews)

    const total = Object.values(averages).reduce((acc, average) => acc + average, 0);
    const averageRating = total / Object.values(averages).length
    const maxRating = 5

    const percentage = (averageRating / maxRating) * 100;

    if (!stay.reviews || stay.reviews.length === 0) {
        return <div>No reviews available</div>
    }


    return (
        <section className="reviews-stay">
            <div className="rating">
                <img src={starIcon} alt="Star Icon" className="star-icon" />
                <span>{avgRating.toFixed(1)}</span><span className="dot-big">•</span>
                <span className="reviews-number">{totalReviews} reviews</span>
            </div>
            <div className="reviews-rating">
                <div className="overall-rating">
                    <h3>Overall rating</h3>
                    {[...Array(5)].map((_, index) => {
                        const barIndex = 5 - index
                        const isFull = avgRating < barIndex;
                        const isPartial = avgRating === barIndex + 0.5
                        const fillWidth = isFull ? 100 : (isPartial ? 50 : 0)
                        const barColor = barIndex <= 4 ? 'black' : '#ddd'
                        return (
                            <div className="rating-bar-container" key={index}>
                                {/* <div className="number-container"> */}
                                <span className="rating-number">{5 - index}</span>
                                {/* </div> */}
                                <div className="rating-bar">
                                    <span
                                        className="rating-fill"
                                        style={{
                                            width: `${fillWidth}%`,
                                            backgroundColor: barColor
                                        }}
                                    ></span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="rating-categories">
                    {Object.entries(categories).map(([category, rating]) => (
                        <div key={category} className={`rating-category ${category}`}>
                            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            <h4>{averages[category].toFixed(1)}</h4>
                            <img
                                src={categories[category]}
                                alt={`${category} icon`}
                                className={`icon ${category}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
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




